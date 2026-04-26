export function trackVisit(site, category) {
  fetch("https://isirluke1.pythonanywhere.com/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      site: "My Portfolio",
      category: "Personal"
    })
  })
    .then(res => res.json())
    .then(data => console.log("Tracking success:", data))
    .catch(err => console.log("Tracking failed:", err));
}