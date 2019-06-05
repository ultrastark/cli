# US CLI

# Installation

## Install Globablly

```
npm install -g @ultrastark/cli
```

# Usage

```
us help
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
-  tsconfig.json
   -  "baseUrl": "./" -> "baseUrl: "./src"
