const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  const all = [];
  p.on("console", (m) => all.push("[" + m.type() + "] " + m.text()));
  p.on("pageerror", (e) => all.push("[pageerror] " + e.message));
  await p.goto("https://sdsweethome.com/", { waitUntil: "networkidle", timeout: 60000 }).catch((e) => all.push("[goto] " + e.message));
  await p.waitForTimeout(3000);
  const warns = all.filter((x) => /default root logger|grammarly/i.test(x));
  console.log("Messages matching 'default root logger' / grammarly:", warns.length);
  warns.forEach((w) => console.log("  " + w));
  console.log("Total console messages:", all.length);
  console.log("Errors:", all.filter((x) => x.startsWith("[error]")).length);
  await b.close();
})();
