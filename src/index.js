#!/usr/bin/env node

const chalk = require('chalk')
const fs = require('fs')
const replace = require('replace-in-file')
var npm = require('npm')

// const askQuestions = () => {
//   const questions = [
//     {
//       name: 'FILENAME',
//       type: 'input',
//       message: 'are you sure?',
//     },
//   ]
//   return inquirer.prompt(questions)
// }

// const createFile = (filename, extension) => {
//   const filePath = `${process.cwd()}/${filename}.${extension}`
//   shell.touch(filePath)
//   return filePath
// }

const newFolders = [
  {
    path: 'app/configs',
  },
  {
    path: 'app/shared',
  },
  {
    path: 'app/shared/layouts',
  },
  {
    path: 'app/shared/components',
  },
  {
    path: 'app/shared/fragments',
  },
  {
    path: 'app/shared/pipes',
  },
  {
    path: 'app/core',
  },
  {
    path: 'app/core/guards',
  },
  {
    path: 'app/core/directives',
  },
  {
    path: 'app/core/services',
  },
  {
    path: 'app/core/bases',
  },
  {
    path: 'app/core/models',
  },
  {
    path: 'scss',
  },
  {
    path: 'scss/base',
  },
]

const newFiles = [
  {
    path: '../.prettierrc',
    content:
      '{\r\n"printWidth": 100,\r\n"singleQuote": true,\r\n"trailingComma": "all",\r\n"semi": false,\r\n"arrowParens": "always"\r\n}',
  },
  {
    path: '../tslint.json',
    content:
      '{\r\n"extends": ["tslint-config-standard-plus"],\r\n"rules": {\r\n"trailing-comma": [true, { "multiline": "always", "singleline": "never" }],\r\n"space-before-function-paren": [true, "never"],\r\n"max-line-length": [true, 100],\r\n"directive-selector": [\r\ntrue,\r\n"attribute",\r\n["page", "component", "fragment", "layout"],\r\n"camelCase"\r\n],\r\n"component-selector": [\r\ntrue,\r\n"element",\r\n["page", "component", "fragment", "layout"],\r\n"kebab-case"\r\n]\r\n}\r\n}',
  },
  {
    path: 'app/configs/global.config.ts',
    content:
      "import { version } from '../../../package.json'\r\nexport const VERSION = version\r\nexport const BASEURL = 'https://api-baseurl.ch/'",
  },
  {
    path: 'app/core/models/core.enums.ts',
    content: 'export enum RoutesEnum {}',
  },
  {
    path: 'app/core/models/core.interfaces.ts',
    content: '// export interface SideNavigation {}',
  },
  {
    path: 'app/coremodels/core.models.ts',
    content: '// export class Session { constructor(){} }',
  },
  {
    path: 'scss/base/_colors.scss',
    content:
      '$us-color-settings: (\r\n  primary: (\r\n    base: #3880ff,\r\n  ),\r\n  secondary: (\r\n    base: #0cd1e8,\r\n  ),\r\n  tertiary: (\r\n    base: #7044ff,\r\n  ),\r\n  light: (\r\n    base: #f4f5f8,\r\n  ),\r\n  medium: (\r\n    base: #989aa2,\r\n  ),\r\n  dark: (\r\n    base: #222428,\r\n  ),\r\n);\r\n\r\n$color-darken: 12%;\r\n$color-lighten: 12%;\r\n$color-opacity: 0.3;',
  },
  {
    path: 'scss/_shared.scss',
    content:
      "// Base\r\n@import 'base/colors';\r\n\r\n// Us-mixin\r\n@import '~@ultrastark/us-mixin/mixin';",
  },
  {
    path: 'scss/main.scss',
    content: "// Base\r\n@import 'shared';\r\n@import '~@ultrastark/us-mixin/utilities';",
  },
]

const unlinkedFiles = [
  {
    path: 'styles.scss',
  },
  {
    path: '../tslint.json',
  },
]

// -- Logic --
// - folder
const createFolders = (items) => {
  return new Promise((resolve, reject) => {
    items.forEach((item) => {
      createFolder(item)
    })
  })
}

const createFolder = (item) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(`src/${item.path}`, { recursive: true }, (err) => {
      if (err) {
        reject(item)
      } else {
        created(item)
        resolve()
      }
    })
  })
}

// - Create files
const createFiles = (items) => {
  return new Promise((resolve, reject) => {
    items.forEach((item) => {
      createFile(item)
    })
  })
}

const createFile = (item) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`src/${item.path}`, item.content, (err) => {
      if (err) {
        reject(item)
      } else {
        created(item)
        resolve()
      }
    })
  })
}
// - Delete files
const deleteFiles = (items) => {
  return new Promise((resolve, reject) => {
    items.forEach((item) => {
      deleteFile(item)
    })
  })
}

const deleteFile = (item) => {
  return new Promise((resolve, reject) => {
    fs.unlink(`src/${item.path}`, (err) => {
      if (err) {
        // Already deleted
        resolve()
      } else {
        deleted(item)
        resolve()
      }
    })
  })
}

// -- update
const updateTsconfig = () => {
  return new Promise((resolve) => {
    const options = {
      files: 'tsconfig.json',
      from: [/\"baseUrl\": \".\/",/, 'es2015"'],
      to: [
        '"baseUrl": "./src",',
        'es2015",\r\n' +
          '"resolveJsonModule": true,\r\n' +
          '"esModuleInterop": true,\r\n' +
          '"paths": {\r\n' +
          '"@pages/*" : ["app/pages/*"],\r\n' +
          '"@configs/*" : ["app/configs/*"],\r\n' +
          '"@bases/*" : ["app/core/bases/*"],\r\n' +
          '"@guards/*" : ["app/core/guards/*"],\r\n' +
          '"@store/*" : ["app/core/store/*"],\r\n' +
          '"@models/*" : ["app/core/models/*"],\r\n' +
          '"@services/*" : ["app/core/services/*"],\r\n' +
          '"@providers/*" : ["app/core/providers/*"],\r\n' +
          '"@components/*" : ["app/shared/components/*"],\r\n' +
          '"@fragments/*" : ["app/shared/fragments/*"],\r\n' +
          '"@layouts/*" : ["app/shared/layouts/*"],\r\n' +
          '"@pipes/*" : ["app/shared/pipes/*"],\r\n' +
          '"@app/*" : ["app/*"],\r\n' +
          '}\r\n',
      ],
    }

    replace(options, (err) => {
      if (err) {
        reject(err)
      }
      console.log(`Modified files: ${options.files} from: "baseUrl": "./", to: ${options.to}`)
      resolve()
    })
  })
}

const updateAngularJson = () => {
  return new Promise((resolve, reject) => {
    const options = {
      files: 'angular.json',
      from: [/src\/styles.scss/, /"prefix": "app"/, /"tsConfig": "tsconfig.app.json"/],
      to: [
        'src/scss/main.scss',
        '"prefix": ""',
        '"tsConfig": "tsconfig.app.json",\r\n"stylePreprocessorOptions": {\r\n"includePaths": ["src/scss"]\r\n}',
      ],
    }

    replace(options, (err) => {
      if (err) {
        reject(err)
      }
      console.log(`Modified files: ${options.files} from: "src/styles.scss", to: "${options.to}"`)
      resolve()
    })
  })
}

const updateTslint = () => {
  return new Promise((resolve, reject) => {
    const options = {
      files: 'tslint.json',
      from: /"app"/g,
      to: '["page", "component", "fragment", "layout"]',
    }

    replace(options, (err) => {
      if (err) {
        reject(err)
      }
      console.log(`Modified files: ${options.files} from: "app", to: "${options.to}"`)
      resolve()
    })
  })
}

const updateIndexHtml = () => {
  return new Promise((resolve, reject) => {
    const options = {
      files: 'src/index.html',
      from: [/<\/head>/, /<body>/],
      to: [
        '<!-- US Splash Screen css-->\r\n<link\r\nrel="preload"\r\nas="style"\r\nonload="this.rel = \'stylesheet\'\r\n"onerror="this.rel=\'stylesheet\'"\r\nhref="https://assets.ultrastark.ch/splash-screen/splash-screen.css"\r\n/>\r\n<noscript>\r\n<link rel="stylesheet" href="https://assets.ultrastark.ch/splash-screen/splash-screen.css" />\r\n</noscript>\r\n</head>',
        '<body>\r\n<!-- US Splash Screen -->\r\n<us-splash-screen id="us-splash-screen">\r\n<div class="center">\r\n<!-- Material Design Spinner -->\r\n<div class="spinner-wrapper">\r\n<div class="spinner">\r\n<div class="inner">\r\n<div class="gap"></div>\r\n<div class="left">\r\n<div class="half-circle"></div>\r\n</div>\r\n<div class="right">\r\n<div class="half-circle"></div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n<!-- / Material Design Spinner -->\r\n</div>\r\n</us-splash-screen>\r\n<!-- / US Splash Screen -->\r\n\r\n',
      ],
    }

    fs.readFile(options.files, function(err, data) {
      if (err) throw err
      if (!data.includes('us-splash-screen')) {
        replace(options, (err) => {
          if (err) {
            reject(err)
          }
          console.log(`Modified files: ${options.files} from: "", to: "${options.to}"`)
          resolve()
        })
      } else {
        reject('File already init')
      }
    })
  })
}

const updateAppComponentTs = () => {
  return new Promise((resolve, reject) => {
    const options = {
      files: 'src/app/app.component.ts',
      from: [/'@angular\/core'/, /AppComponent {/],
      to: [
        "'@angular/core'\r\nimport { UsSplashScreenService } from '@ultrastark/us-splash-screen'",
        'AppComponent {\r\nconstructor(private _usSplashScreenService: UsSplashScreenService) {}\r\n',
      ],
    }

    fs.readFile(options.files, function(err, data) {
      if (err) throw err
      if (!data.includes('UsSplashScreenService')) {
        replace(options, (err) => {
          if (err) {
            reject(err)
          }
          console.log(`Modified files: ${options.files} from: "", to: "${options.to}"`)
          resolve()
        })
      } else {
        reject('File already init')
      }
    })
  })
}

const updateAppModule = () => {
  return new Promise((resolve, reject) => {
    const options = {
      files: 'src/app/app.module.ts',
      from: [/'@angular\/core'/, /imports: \[/],
      to: [
        "'@angular/core'\r\nimport { BrowserAnimationsModule } from '@angular/platform-browser/animations'",
        'imports: [\r\nBrowserAnimationsModule,',
      ],
    }

    fs.readFile(options.files, function(err, data) {
      if (err) throw err
      if (!data.includes('BrowserAnimationsModule')) {
        replace(options, (err) => {
          if (err) {
            reject(err)
          }
          console.log(`Modified files: ${options.files} from: "", to: "${options.to}"`)
          resolve()
        })
      } else {
        reject('File already init')
      }
    })
  })
}

// -- run npm --
const runNpm = () => {
  return new Promise((resolve) => {
    var exec = require('child_process').exec
    child = exec('npm i @ultrastark/us-mixin@latest').stderr.pipe(process.stderr)
    child = exec('npm i tslint-config-standard-plus --save-dev').stderr.pipe(process.stderr)
  })
}

const npmSplashScreen = () => {
  return new Promise((resolve) => {
    npm.load(function(err) {
      // handle errors

      npm.commands.install(['@ultrastark/us-splash-screen'], function(err, data) {
        if (err) {
          reject(err)
        }
        console.log('@ultrastark/us-splash-screen and @angular/animations installed')
        resolve()
      })

      npm.on('log', function(message) {
        console.log(message)
      })
    })
  })
}

// -- Message --
const notCreated = (item) => {
  console.log(chalk.red.bold(`${item.path} not created`))
}

const deleted = (item) => {
  console.log(`${item.path} deleted`)
}

const created = (item) => {
  console.log(`${item.path} created`)
}

const success = () => {
  console.log(chalk.white.bgGreen.bold('Done!'))
}

const error = () => {
  console.log(chalk.white.bgRed.bold('Rejected!'))
}

const unknownCommand = (command) => {
  console.error(
    `The specified command ("${command}") is invalid. For a list of available options, run "us help"`,
  )
}

const unknownAddCommand = (command) => {
  console.error(
    `The "us ${command}" command requires a name argument to be specified eg. ng add [name] . For more details, use "us help".`,
  )
}

// -- Methode --
const help = () => {
  console.log(
    chalk.white.bold('us init') +
      ': format angular project\r\n' +
      chalk.white.bold('us add splash-screen') +
      ': Add splash-screen to the project',
  )
}

const addSplashScreen = () => {
  Promise.all([updateIndexHtml(), updateAppComponentTs(), npmSplashScreen(), updateAppModule()])
    .then(() => {
      success()
    })
    .catch((err) => {
      notCreated(err)
      error()
    })
}

const createItems = () => {
  Promise.all([
    deleteFiles(unlinkedFiles),
    createFolders(newFolders),
    createFiles(newFiles),
    updateTsconfig(),
    updateAngularJson(),
    updateTslint(),
    runNpm(),
  ])
    .then(() => {
      success()
    })
    .catch((err) => {
      notCreated(err)
      error()
    })
}

// -- Run --
const run = async () => {
  const args = process.argv.slice(2)
  args[0]

  switch (args[0]) {
    case 'init':
      // create the file
      const isAngularProject = './angular.json'

      if (fs.existsSync(isAngularProject)) {
        createItems()
      } else {
        console.log(chalk.red.bold('You need to be in an Angular project'))
        error()
      }
      break

    case 'add':
      switch (args[1]) {
        case ('spl', 'splash', 'splash-screen'):
          addSplashScreen()
          break

        default:
          args[1] ? unknownCommand(args[1]) : unknownAddCommand(args[0])
          break
      }
      break

    case 'help':
      help()
      break

    default:
      unknownCommand(args[0])
      break
  }
}

run()
