import { terminal } from 'terminal-kit'
import { get as getEmoji } from 'node-emoji'
import { system } from 'gluegun'
import { Environments, Response } from '../types'
import { log } from '../utils/logs-messages'

export function printInfoCommands(
  responses: Array<Response>,
  environments: Environments
) {
  terminal.table([[log.titleBox]], {
    hasBorder: true,
    borderAttr: { color: 'blue' },
    width: 30,
  })

  switch (environments) {
    case Environments.BACKEND:
      terminal(log.docBackend)
      break
    case Environments.FRONTEND:
      terminal(log.docFrontend)
      break
    default:
  }

  terminal(`${log.script.dev}${log.script.debug}`)

  responses.map((response) => {
    terminal(response.infoText)
  })

  if (responses) {
    terminal.bold(
      `${getEmoji('arrow_up')}  ${log.linkIndicator} ${getEmoji(
        'arrow_up'
      )}\n\n`
    )
  }
}

export function printFooter() {
  terminal.bold
    .yellow(`\n${getEmoji('warning')}`)
    .bold.red(` Do not`)
    .bold.yellow(` delete comments lines in this standard `)
    .bold.italic.gray(`//! Section-Name.\n`)
    .bold.yellow(
      `It is from them that we know the structure of your code to perform merge`
    )

  terminal.bold
    .italic('\n\nRun atlantjs')
    .bold.italic.green(' --help ')
    .bold.italic('to access doc cli of')
    .bold.italic.red(' AtlantJS.dev ')
    .bold.italic('and know more commands to make your life easier\n\n')

  // terminal.bold
  //   .italic(`\n\n              Developed with`)
  //   .bold(` ${getEmoji('heart')} `)
  //   .bold.italic(` for Matheus Antonio\n\n`)
}

export async function cd(path) {
  await system.run(`cd ${path}`)
}

export async function showErrorLog(message: string) {
  terminal.red.bold(`\n${getEmoji('warning')} ${message}`)
}
