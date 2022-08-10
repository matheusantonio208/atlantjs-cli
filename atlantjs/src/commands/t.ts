import { startRepositoryCommand } from '../extends/commands/git-commands'
import {
  buildAppCommand,
  createBoardTrelloCommand,
  createNotionWikiCommand,
} from '../extends/commands/implementations-commands'
import { printInfoCommands } from '../extends/commands/terminal-commands'

import { Environments, Response } from '../extends/types'
import { Integrations } from '../extends/types'

module.exports = {
  name: 't',
  description: 'Create the initial files of the application',

  run: async (toolbox) => {
    const { parameters } = toolbox

    const { options } = parameters

    let integrations = []

    Object.keys(options).map((command) => {
      integrations.push(command)
    })

    const response = await Promise.all(
      integrations.map(async (command) => {
        let responses: Array<Response> = []
        switch (command) {
          case Integrations.REPO:
            responses.push(await startRepositoryCommand(options.repo))
            break
          case Integrations.TRELLO:
            responses.push(await createBoardTrelloCommand('credential'))
            break
          case Integrations.WIKI:
            responses.push(await createNotionWikiCommand('credential'))
            break
          case Integrations.BUILD:
            responses.push(await buildAppCommand('credential', 'gitRepoUrl'))
            break
          default:
        }

        return responses
      })
    )
    printInfoCommands(
      response.map((a) => a[0]),
      Environments.BACKEND
    )
  },
}
