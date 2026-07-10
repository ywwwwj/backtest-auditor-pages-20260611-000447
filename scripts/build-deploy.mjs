import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const deployDir = join(root, "deploy");
const staticFiles = [
  "index.html",
  "app.html",
  "audit.html",
  "benchmark-cases.js",
  "cases.html",
  "demo.html",
  "demo.js",
  "favicon.svg",
  "lead-capture.js",
  "methodology.html",
  "payment.html",
  "script.js",
  "styles.css",
];

mkdirSync(deployDir, { recursive: true });
writeFileSync(join(deployDir, ".nojekyll"), "\n");

for (const file of staticFiles) {
  const source = join(root, file);
  if (!existsSync(source)) {
    throw new Error(`Missing static source file: ${file}`);
  }
  copyFileSync(source, join(deployDir, file));
}

const build = process.platform === "win32"
  ? spawnSync(process.env.ComSpec ?? "cmd.exe", [
      "/d",
      "/s",
      "/c",
      "npm --prefix web-react run build",
    ], { cwd: root, stdio: "inherit" })
  : spawnSync("npm", ["--prefix", "web-react", "run", "build"], {
      cwd: root,
      stdio: "inherit",
    });

if (build.error) {
  throw build.error;
}

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

for (const entry of readdirSync(join(deployDir, "v2", "assets"))) {
  if (!entry.endsWith(".js") && !entry.endsWith(".css")) continue;
  const file = join(deployDir, "v2", "assets", entry);
  const normalized = readFileSync(file, "utf8").replace(/[ \t]+$/gm, "");
  writeFileSync(file, normalized);
}

console.log(`Built ${staticFiles.length} static files and the React preview into deploy/.`);
