const fs = require("fs");

const content = fs.readFileSync("service-worker.js", "utf8");
const targetFile = "public/sw.js";

fs.appendFileSync(targetFile, content, (err) => {
  if (err) {
    throw err;
  }
  console.log("Content appended successfully!");
});
