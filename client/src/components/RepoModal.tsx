import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, Github, ExternalLink, Sparkles, CheckCircle2,
  AlertCircle, Copy, Check, Loader2, ChevronDown, ChevronUp,
  FileText, Tag, Globe, FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GitHubRepo, RepoAnalysis } from "./GitHubDashboard";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface GeneratedFile {
  type: string;
  path: string;
  content: string;
  exists: boolean;
  previous: string | null;
}

interface RepoModalProps {
  repo: GitHubRepo;
  analysis: RepoAnalysis | null;
  adminSecret: string | null;
  onClose: () => void;
}

const MISSING_LABELS: Record<string, { label: string; icon: React.ReactNode; tip: string }> = {
  description: { label: 'Repository description', icon: <FileText size={14} />, tip: 'Add a short description on GitHub' },
  readme:       { label: 'README.md',              icon: <FileCheck size={14} />, tip: 'Document your project' },
  topics:       { label: 'Topics / tags',          icon: <Tag size={14} />,       tip: 'Add topics for discoverability' },
  license:      { label: 'LICENSE file',           icon: <FileText size={14} />, tip: 'Add a license' },
  homepage:     { label: 'Homepage URL',           icon: <Globe size={14} />,     tip: 'Link to your live deployment' },
};

export function RepoModal({ repo, analysis, adminSecret, onClose }: RepoModalProps) {
  const [copied, setCopied] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<GeneratedFile | null>(null);
  const [pushing, setPushing] = useState(false);
  const [pushed, setPushed] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const missingEntries = analysis
    ? Object.entries(analysis.missing).filter(([, v]) => v)
    : [];

  async function handleGenerate(type: string) {
    setGenerating(true);
    setGenerated(null);
    setGenerateError(null);
    setPushed(false);
    try {
      const res = await fetch(`${API_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Secret': adminSecret || '',
        },
        body: JSON.stringify({ repo: repo.name, type }),
      });
      const data = await res.json() as GeneratedFile & { error?: string };
      if (!res.ok) throw new Error(data.error || 'Failed to generate');
      setGenerated(data);
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setGenerating(false);
    }
  }

  async function handlePush() {
    if (!generated) return;
    setPushing(true);
    try {
      const res = await fetch(`${API_URL}/api/push`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Secret': adminSecret || '',
        },
        body: JSON.stringify({
          repo: repo.name,
          path: generated.path,
          content: generated.content,
        }),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error || 'Push failed');
      setPushed(true);
      setGenerated(null);
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : 'Push failed');
    } finally {
      setPushing(false);
    }
  }

  async function copyContent(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="glass-card rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="sticky top-0 glass-card rounded-t-2xl border-b border-white/5 px-6 py-4 flex items-start justify-between z-10">
            <div>
              <h2 className="font-mono font-bold text-white text-lg">{repo.name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <a href={repo.url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <Github size={12} /> GitHub
                </a>
                {repo.homepageUrl && (
                  <a href={repo.homepageUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <ExternalLink size={12} /> Live site
                  </a>
                )}
                {analysis && (
                  <span className="text-xs font-mono text-primary/70">
                    Score: {analysis.score}/10
                  </span>
                )}
              </div>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors p-1">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Languages */}
            {repo.languages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {repo.languages.map((lang) => (
                  <span key={lang.name} className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color || '#8b8b8b' }} />
                    {lang.name}
                  </span>
                ))}
              </div>
            )}

            {/* AI Summary */}
            {analysis && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-primary" />
                  <span className="text-xs font-mono text-primary uppercase tracking-widest">AI Summary</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {analysis.summary}
                </p>
              </div>
            )}

            {/* Suggestions */}
            {analysis?.suggestions && analysis.suggestions.length > 0 && (
              <div>
                <button
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="flex items-center gap-2 mb-3 w-full text-left"
                >
                  <Sparkles size={14} className="text-yellow-400/80" />
                  <span className="text-xs font-mono text-yellow-400/80 uppercase tracking-widest flex-1">
                    Improvement Suggestions
                  </span>
                  {showSuggestions ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                </button>
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      {analysis.suggestions.map((s, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="font-mono text-primary/60 text-xs mt-0.5 flex-shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {s}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Missing files checklist */}
            {missingEntries.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={14} className="text-yellow-400/80" />
                  <span className="text-xs font-mono text-yellow-400/80 uppercase tracking-widest">
                    Missing ({missingEntries.length})
                  </span>
                </div>
                <div className="space-y-2">
                  {missingEntries.map(([key]) => {
                    const meta = MISSING_LABELS[key];
                    const canGenerate = adminSecret && key === 'readme';
                    return (
                      <div key={key} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                          {meta?.icon}
                          <span className="text-xs">{meta?.label || key}</span>
                          {meta?.tip && (
                            <span className="text-[11px] text-muted-foreground/40 truncate hidden md:block">
                              — {meta.tip}
                            </span>
                          )}
                        </div>
                        {canGenerate && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-primary/20 text-primary hover:bg-primary/10 flex-shrink-0 h-7"
                            onClick={() => handleGenerate('readme')}
                            disabled={generating}
                          >
                            {generating ? <Loader2 size={12} className="animate-spin" /> : 'Generate'}
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All good message */}
            {analysis && missingEntries.length === 0 && (
              <div className="flex items-center gap-2 text-sm text-green-400/70 p-3 rounded-xl bg-green-400/5 border border-green-400/10">
                <CheckCircle2 size={14} />
                <span>Repo looks complete — nothing missing.</span>
              </div>
            )}

            {/* Generated file preview */}
            {generated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-primary uppercase tracking-widest">
                    Preview — {generated.path}
                    {generated.exists && (
                      <span className="ml-2 text-yellow-400/60">(replaces existing)</span>
                    )}
                  </span>
                  <button
                    onClick={() => copyContent(generated.content)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-white transition-colors"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="text-xs text-muted-foreground bg-black/40 rounded-xl p-4 overflow-x-auto max-h-64 border border-white/5 leading-relaxed whitespace-pre-wrap">
                  {generated.content}
                </pre>
                <div className="flex gap-3">
                  <Button
                    onClick={handlePush}
                    disabled={pushing}
                    className="flex-1 font-mono text-xs"
                  >
                    {pushing ? (
                      <><Loader2 size={12} className="animate-spin mr-2" /> Pushing…</>
                    ) : (
                      'Approve & Push to GitHub'
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setGenerated(null)}
                    className="border-white/10 text-muted-foreground hover:text-white text-xs"
                  >
                    Discard
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Push success */}
            {pushed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-sm text-green-400 p-3 rounded-xl bg-green-400/5 border border-green-400/10"
              >
                <CheckCircle2 size={14} />
                Pushed successfully to GitHub.
              </motion.div>
            )}

            {/* Error */}
            {generateError && (
              <div className="flex items-center gap-2 text-sm text-red-400 p-3 rounded-xl bg-red-400/5 border border-red-400/10">
                <AlertCircle size={14} />
                {generateError}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
