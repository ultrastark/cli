#!/usr/bin/env node

const chalk = require('chalk')
const fs = require('fs')

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
    path: 'scss',
  },
]

const newFiles = [
  {
    path: 'app/configs/global.config.ts',
    content:
      "export const VERSION = require('../../../package.json').version\r\nexport const BASEURL = 'https://api-baseurl.ch/'",
  },
]

// -- Logic --
const createFolders = (items) => {
  return new Promise((resolve, reject) => {
    items.forEach((item) => {})
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

// -- Message --
const notCreated = (item) => {
  console.log(chalk.red.bold(`${item.path} not created`))
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

// -- Methode --
const help = () => {
  console.log('init: format angular project')
}

const createItems = () => {
  Promise.all([createFolder(newFolders[0]), createFile(newFiles[0])])
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

    case 'help':
      help()
      break

    default:
      unknownCommand(args[0])
      break
  }
}

run()
