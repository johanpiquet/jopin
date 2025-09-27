# Jopi Loader

## What is it?

It's a loader, which has two goals:
* Allowing custom imports for node.js and bun.js.
* Enable a watcher doing automatic restart on file change and automatic browser refresh.

## What are custom imports?

With node.js, you can't import a CSS file. Doing this `import "./my-css.scss` throw an error.
It's a matter if you want to do React SSR (Server Side Rendering).

The goal of jopi-loader, is to enable this type of import.
It's doing it by mimicking `Vite.js`, which allows importing CSS / image / ...

* Importing simple css/scss: `import "./my-css.scss`.
* Importing css/scss modules `import style from "style.module.scss`.

* Importing images/text/... :
  * `import serverFilePath from "./my-image.png`.
  * `import asDataUrl from "./my-image.png?inline`.
  * `import asRawText from "./my-text.txt?raw`.

* Import with alias: `import myComp form "@/lib/myComp";`

## How to use this tool?

The tool `jopin` is used as a replacement for the `node` tool.  
Where you type: `node ./myScript.js`, you will do `npx jopin ./myScript.js`.

Internally, it will enable some node.js flags and plugins, which require a special configuration.

## Typescript config

If you are using TypeScript, you need an extra entry in your `tsconfig.json` file.
This file allows TypeScript to know how to handle these special imports.

```json
{
  "compilerOptions": {
    "types": ["@jopi-loader/types"]
  }
}
```

If you want to use alias (ex: `import myComp form "@/lib/myComp";`) then you need to declare your alias here

**Exemple for ShadCN**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/shadcn/*"],
      "@/lib/*": ["./src/shadcn/lib/*"],
      "@/components/*": ["./src/shadcn/components/*"]
    }
  }
}
```

## Developer mode

You can enable the developer mode with the command line flag `--jopi-dev`.
When enabled, it will :
* Watch directories for changes and compile.
* Automatically refresh the browser on source change.
* Start the script jopiWatch when launching.

> Browser refresh only works with web-page using Jopi Rewrite.

### Recompiling sources

If you are using node.js and TypeScript, you need to recompile sources when a change occurs.
For that, the tool `jopin` searches and execute a script named `jopiWatch` in your `package.json`
(+ `jopiWatch_node` for node.js specific, and `jopiWatch_bun`) which is executed when the application is started,
and killed when the application stops.

**Sample package.json**

```json
{
  "scripts": {
    "jopiWatch_node": "tsc --watch"
  }
}
```

> This functionality only works in development mode when using the command line flag `--jopi-dev'.

### Browser refresh

With dev mode enabled, your browser page automatically refreshes when the server restart.
It doesn't refresh immediately, but when the server is ready internally, doing that the
refresh doesn't occur too soon.

> With Node.js, this process is slow because Node.js requires TypeScript to JavaScript compilation.
> If you want a very fast refresh cycle to test design, you woul prefer using Bun.js with
> which all is near instantly.

### Forcing websocket port

Browser refresh uses a websocket to work. Port is found by testing free port, from 5100 to 5400.  
When using Docker, you can been interested to force this port, to be able to bind it to the remote host.

For that, you can use the environment variable `JOPIN_WEBSOCKET_PORT`. 
