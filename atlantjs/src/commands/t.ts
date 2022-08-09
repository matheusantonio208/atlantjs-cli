import { startRepositoryCommand } from '../extends/commands/git-commands'
import {
  buildAppWithHerokuCommand,
  createBoardTrelloCommand,
  createNotionWikiCommand,
} from '../extends/commands/implementations-commands'
import { printInfoCommands } from '../extends/commands/terminal-commands'

import { Environments } from '../extends/types'
import { Integrations } from '../extends/types'

module.exports = {
  name: 't',
  description: 'Create the initial files of the application',

  run: async (toolbox) => {
    const { parameters } = toolbox

    const { options } = parameters

    let integrations = []
    let responses = []

    Object.keys(options).map((command) => {
      integrations.push(command)
    })

    integrations.map((command) => {
      switch (command) {
        case Integrations.GIT_REPO:
          responses.push(startRepositoryCommand(options.repo))
          break
        case Integrations.TRELLO:
          responses.push(createBoardTrelloCommand('credential'))
          break
        case Integrations.NOTION:
          responses.push(createNotionWikiCommand('credential'))
          break
        case Integrations.HEROKU:
          responses.push(buildAppWithHerokuCommand('credential', 'gitRepoUrl'))
          break
        default:
      }
    })

    // const responses = [
    //   {
    //     infoText: `\r\n\r\nteste\r\n\r\n`,
    //   },
    // ]

    // printInfoCommands(responses, Environments.BACKEND)
  },
}
