# US CLI
**Beta version**

Change an angular project to
-  [follow this folder structure](https://docs.ultrastark.ch/docs/standards/dev/angular/folder-structure)
-  [help work with these mixins](https://github.com/ultrastark/us-mixin)

## Installation

### Install Globally

```
npm install -g @ultrastark/cli
```

## Command

```
us help
us init
us add splash-screen
```

### Adapting a new angular project to the us convention
```c
ng new PROJECT-NAME // If you didn't already did it
cd PROJECT-NAME // Be into the root of the project
us init // It will format and create the right folder structure
```

## Change done
### new folders
-  app/configs
-  scss
-  scss/base
-  app/shared
-  app/shared/layouts
-  app/shared/components
-  app/shared/fragments
-  app/shared/pipes
-  app/core
-  app/core/guards
-  app/core/directives
-  app/core/services
-  app/core/bases
-  app/core/models
-  app/assets/fonts
-  app/assets/i18n
-  app/assets/icons
-  app/assets/images

### new files
-  .prettierrc
-  app/configs/global.config.ts
-  core/models/core.enums.ts
-  core/models/core.interfaces.ts
-  core/models/core.models.ts
-  core/models/core.types.ts
-  scss/base/_colors.scss
-  scss/_shared.scss
-  scss/main.scss

### deleted files
-  styles.scss

### Changed files
- .htaccess
-  angular.json
   -  src/styles.scss -> src/css/main.scss
   -  "prefix": "app" -> "prefix": ""
   -  "" ->   "stylePreprocessorOptions": {
                "includePaths": ["src/scss"]
              },
-  tsconfig.json
   -  "baseUrl": "./" -> "baseUrl: "./src"
-  tslint.json
   -  "app" -> ["page", "component", "fragment", "layout"]
   -  "extends": "tslint:recommended" -> "extends": "tslint-config-standard-plus"
   -  "trailing-comma": false -> "trailing-comma": [true, { "multiline": "always", "singleline": "never" }]
   -  '' -> "max-line-length": [true, 100],

### Npm installed
- @types/node
- @ultrastark/us-mixin // generate class and global css variables
- tslint-config-standard-plus (dev) // tslint formater
