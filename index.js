import { createRequire } from "node:module";
export function doJopiN() {
    const myRequire = createRequire(import.meta.url);
    if (process.env.JOPI_LOG === "1") {
        let resolvedDir = myRequire.resolve("@jopi-loader/tools");
        console.log("JopiN - @jopi-loader/tools found at" + resolvedDir);
    }
    const lib = myRequire("@jopi-loader/tools");
    lib.jopiLauncherTool("node").then();
}
//# sourceMappingURL=index.js.map