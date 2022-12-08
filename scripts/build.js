import esbuild from "esbuild";
import jsdoc2md from "jsdoc-to-markdown";
import { writeFileSync } from "fs";

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
