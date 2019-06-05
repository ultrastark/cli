#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const shell = require('shelljs')

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

const createFile = (path, item) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        reject(item)
      } else {
        created(item)
        resolve()
      }
    })
  })
}

const createFolder = (path, item, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        reject(item)
      } else {
        created(item)
        resolve()
      }
    })
  })
}

const createItems = () => {
  Promise.all([
    createFile('src/app/configs', '/configs'),
    createFolder(
      'src/app/configs/global.config.ts',
      'global.config.ts',
      "export const VERSION = require('../../../package.json').version\r\nexport const BASEURL = 'https://api-baseurl.ch/'",
    ),
  ])
    .then(() => {
      success()
    })
    .catch((err) => {
      notCreated(err)
      error()
    })
}

const notCreated = (target) => {
  console.log(chalk.red.bold(`${target} not created`))
}

const created = (target) => {
  console.log(`${target} created`)
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

const help = () => {
  console.log('init: format angular project')
}

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
