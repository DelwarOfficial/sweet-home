const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push("CONSOLE ERROR: " + msg.text());
  });
  page.on("pageerror", (err) => errors.push("PAGE ERROR: " + err.message));
  page.on("requestfailed", (req) =>
    errors.push("REQ FAILED: " + req.url() + " -> " + (req.failure()?.errorText || ""))
  );

  await page.goto("https://sdsweethome.com/", { waitUntil: "networkidle", timeout: 60000 }).catch((e) => errors.push("GOTO: " + e.message));
  await page.waitForTimeout(3000);

  const rootHtml = await page.$eval("#root", (el) => el.innerHTML).catch(() => "<no #root>");
  console.log("=== ROOT innerHTML length:", rootHtml.length, "===");
  console.log(rootHtml.slice(0, 300));
  console.log("\n=== ERRORS (" + errors.length + ") ===");
  errors.slice(0, 30).forEach((e) => console.log(e));
  await browser.close();
})();
