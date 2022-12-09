import esbuild from "esbuild";
import jsdoc2md from "jsdoc-to-markdown";
import crypto from "crypto";
import { writeFileSync, readFileSync } from "fs";

esbuild
    .build({
        entryPoints: ["src/clipnship.js"],
        minify: true,
        bundle: true,
        sourcemap: true,
        entryNames: "clipnship.min",
        globalName: "ClipConverter",
        outdir: "dist",
        footer: { js: "ClipConverter = ClipConverter.default" },
    })
    .catch(() => process.exit(1));

jsdoc2md.render({ files: "src/clipnship.js" }).then((doc) => {
    writeFileSync("doc/api.md", doc);
});

const data = readFileSync("dist/clipnship.min.js");
const checksum = crypto.createHash("sha512").update(data, "utf8").digest("hex");
writeFileSync("checksum", checksum);
