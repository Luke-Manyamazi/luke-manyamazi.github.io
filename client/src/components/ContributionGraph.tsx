import { motion } from "framer-motion";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionMonth {
  name: string;
  firstDay: string;
  totalWeeks: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionGraphProps {
  weeks: ContributionWeek[];
  months: ContributionMonth[];
  totalContributions: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalRepos: number;
}

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

function getCellClass(count: number): string {
  if (count === 0) return 'bg-white/[0.04] hover:bg-white/10';
  if (count <= 3) return 'bg-primary/25 hover:bg-primary/40';
  if (count <= 6) return 'bg-primary/50 hover:bg-primary/65';
  if (count <= 9) return 'bg-primary/75 hover:bg-primary/90';
  return 'bg-primary hover:bg-primary/80';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ContributionGraph({
  weeks,
  months,
  totalContributions,
  totalCommits,
  totalPRs,
  totalIssues,
  totalRepos,
}: ContributionGraphProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 md:p-8"
    >
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Contributions', value: totalContributions.toLocaleString() },
          { label: 'Commits', value: totalCommits.toLocaleString() },
          { label: 'Pull Requests', value: totalPRs.toLocaleString() },
          { label: 'Public Repos', value: totalRepos.toLocaleString() },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <div className="text-2xl font-bold text-white font-mono">{value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Graph */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Month labels */}
          <div className="flex mb-1 ml-8">
            {months.map((month) => (
              <div
                key={month.firstDay}
                className="text-xs text-muted-foreground font-mono"
                style={{ width: `${month.totalWeeks * 14}px` }}
              >
                {month.name}
              </div>
            ))}
          </div>

          <div className="flex gap-0">
            {/* Day-of-week labels */}
            <div className="flex flex-col gap-[3px] mr-2 pt-0.5">
              {DAY_LABELS.map((label, i) => (
                <div key={i} className="text-[10px] text-muted-foreground/60 font-mono h-[11px] flex items-center">
                  {label}
                </div>
              ))}
            </div>

            {/* Contribution cells */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day, di) => (
                    <div
                      key={di}
                      title={`${formatDate(day.date)}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`}
                      className={`w-[11px] h-[11px] rounded-sm transition-colors cursor-default ${getCellClass(day.contributionCount)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1.5 mt-3 justify-end">
            <span className="text-[11px] text-muted-foreground/60">Less</span>
            {[0, 3, 6, 9, 12].map((count) => (
              <div
                key={count}
                className={`w-[11px] h-[11px] rounded-sm ${getCellClass(count)}`}
              />
            ))}
            <span className="text-[11px] text-muted-foreground/60">More</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
