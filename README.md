# US CLI
**Alpha version**

Change an angular project to
-  [follow this folder structure](https://github.com/rbalet/us-folder-structure)
- [help work with these mixins](https://github.com/ultrastark/us-mixin)

# Installation

## Install Globablly

```
npm install -g @ultrastark/cli
```

# Usage

```
us help
us init
us add splash-screen
```

## Adapting a new angular project to the us convention
```
ng new PROJECT-NAME
cd PROJECT-NAME
us init
```

# Change done
## new folders
-  app/configs
-  scss
-  scss/base
-  app/shared

## new files
-  global.config.ts
-  scss/base/_colors.scss
-  scss/_shared.scss
-  scss/main.scss

## deleted files
-  styles.scss

## Changed files
-  angular.json
   -  src/styles.scss -> src/css/main.scss
   -  "prefix": "app" -> "prefix": ""
   -  "" ->   "stylePreprocessorOptions": {
                "includePaths": ["src/scss"]
              },
-  tsconfig.json
   -  "baseUrl": "./" -> "baseUrl: "./src"
-  tsconfig.app.json
   -  "types": [] -> "types": ["node"]
-  tslint.json
   -  "app" -> ["page", "component", "fragment", "layout"]

## Npm installed
- @types/node
- @ultrastark/us-mixin