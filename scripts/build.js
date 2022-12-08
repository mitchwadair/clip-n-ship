import esbuild from "esbuild";
import jsdoc2md from "jsdoc-to-markdown";
import { writeFileSync } from "fs";
import { execSync } from "node:child_process";

const args = process.argv.splice(2);
if (args.length !== 1) {
    console.error("Usage: ./build.sh v0.0.0");
    process.exit(1);
}

esbuild
    .build({
        entryPoints: ["src/clipnship.js"],
        minify: true,
        bundle: true,
        sourcemap: true,
        entryNames: "clipnship.min",
        globalName: "ClipConverter",
        outdir: "dist",
    })
    .catch(() => process.exit(1));

jsdoc2md.render({ files: "src/clipnship.js" }).then((doc) => {
    writeFileSync("doc/api.md", doc);
});

execSync("git add .");
execSync(`git commit -m "${args[0]}"`);
