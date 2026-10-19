import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);

async function renderedPage(path) {
  return readFile(new URL(path, outputRoot), "utf8");
}

test("homepage renders current proof, reviews, and opportunity messaging", async () => {
  const html = await renderedPage("index.html");

  assert.match(html, /Event producer with hands-on experience in bar operations, F&amp;B staffing, and premium hospitality/);
  assert.match(html, /349/);
  assert.match(html, /Selected Google reviews/);
  assert.match(html, /Let’s build the next event/);
  assert.match(html, /lancemtwolfe@gmail.com/);
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
  assert.match(html, /timeline-filter-query/);
  assert.match(html, /timeline-filter-role/);
  assert.match(html, /timeline-filter-employer/);
  assert.match(html, /timeline-filter-state/);
  assert.match(html, /Expand all/);
  assert.match(html, /Collapse all/);
  assert.match(html, /timeline-column-date/);
  assert.doesNotMatch(html, /Reset column order/);
  assert.equal(html.match(/<thead/g)?.length, 1, "timeline should render one shared table header");
  assert.ok(html.length < 900_000, `timeline HTML is unexpectedly large: ${html.length} characters`);
});

test("Chronicles index exposes publication dates", async () => {
  const html = await renderedPage("chronicles/index.html");

  assert.match(html, /Published/);
  assert.match(html, /From Consumer to Producer/);
});

test("sitemap includes every public career route", async () => {
  const sitemap = await renderedPage("sitemap.xml");

  assert.match(sitemap, /https:\/\/lancewolfe\.com\/career\/events\//);
  assert.match(sitemap, /https:\/\/lancewolfe\.com\/career\/operations\//);
  assert.match(sitemap, /https:\/\/lancewolfe\.com\/career\/staffing\//);
  assert.match(sitemap, /https:\/\/lancewolfe\.com\/career\/timeline\//);
});

// Guard the hiring routes and the distinction between leading and supporting teams.
test("career connects supported staffing proof to role-specific resumes", async () => {
  const html = await renderedPage("career/index.html");
  assert.match(html, /Independently leads 100\+ staff and supports deployments of 200–800 workers/);
  assert.match(html, /doubled from 40 to 80/);
  assert.match(html, /href="\/resumes\/staffing-resume.pdf"/);
  assert.match(html, /href="\/resumes\/bar-ops-resume.pdf"/);
  assert.match(html, /Staffing%20%2F%20Staffing%20Management/);
  assert.match(html, /aria-controls=/);
  assert.match(html, /lancemtwolfe@gmail.com<\/p>/);
});

test("homepage keeps detailed hiring content on Career", async () => {
  const html = await renderedPage("index.html");
  assert.doesNotMatch(html, /Where I can help|Staffing in practice|doubled from 40 to 80/);
  assert.match(html, /href="\/career\/"/);
  assert.match(html, /Event producer with hands-on experience in bar operations, F&amp;B staffing, and premium hospitality/);
});
