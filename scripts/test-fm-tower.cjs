const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  const errs = [];
  p.on("console", (m) => { if (m.type() === "error") errs.push("CONSOLE: " + m.text()); });
  p.on("pageerror", (e) => errs.push("PAGE: " + e.message));
  await p.goto("https://sdsweethome.com/projects/fm-tower", { waitUntil: "networkidle", timeout: 60000 }).catch((e) => errs.push("GOTO: " + e.message));
  await p.waitForTimeout(2000);
  const len = await p.$eval("#root", (el) => el.innerHTML.length).catch(() => 0);
  console.log("FM Tower #root length:", len);
  console.log("Errors (" + errs.length + "):");
  errs.slice(0, 10).forEach((e) => console.log(e));
  await b.close();
})();
