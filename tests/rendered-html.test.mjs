import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);

async function renderedPage(path) {
  return readFile(new URL(path, outputRoot), "utf8");
}

test("homepage renders current proof, reviews, and opportunity messaging", async () => {
  const html = await renderedPage("index.html");

  assert.match(html, /11\+ years across hospitality/);
  assert.match(html, /349/);
  assert.match(html, /Selected Google reviews/);
  assert.match(html, /Planning an event or building a team\?/);
  assert.match(html, /mailto:lancemtwolfe@gmail\.com/);
  assert.match(html, /Contact Lance/);
  assert.match(html, /Explore Career/);
  assert.match(html, /Open to nationwide opportunities/);
  assert.doesNotMatch(html, /View Lance’s career/);
});

test("career page renders positioning, resumes, and current proof total", async () => {
  const html = await renderedPage("career/index.html");

  assert.match(html, /Best-fit work/);
  assert.match(html, /Talent buying &amp; marketing/);
  assert.match(html, /Staffing \/ Staffing Management/);
  assert.match(html, /Staffing \/ Staffing Management.{0,60}count\\":23/);
  assert.match(html, /349/);
  assert.match(html, /Connect on LinkedIn/);
  assert.match(html, /See staffing management credits/);
  assert.match(html, /role=Staffing%20%2F%20Staffing%20Management/);
});

test("timeline renders completed events without scheduled labels", async () => {
  const html = await renderedPage("career/timeline/index.html");

  assert.match(html, /Aftershock/);
  assert.match(html, /Seven Stars/);
  assert.doesNotMatch(html, /\(Scheduled\)/);
  assert.match(html, /Employer/);
  assert.match(html, /Role/);
  assert.match(html, /timeline-filter-year/);
  assert.match(html, /timeline-filter-role/);
  assert.match(html, /timeline-filter-employer/);
  assert.match(html, /timeline-filter-state/);
  assert.ok(html.length < 900_000, `timeline HTML is unexpectedly large: ${html.length} characters`);
});

test("Chronicles index exposes publication dates", async () => {
  const html = await renderedPage("chronicles/index.html");

  assert.match(html, /Published/);
  assert.match(html, /From Consumer to Producer/);
});
