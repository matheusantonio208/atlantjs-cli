import { terminal } from 'terminal-kit'

export async function createBoardTrelloCommand(credential) {
  terminal.green('Board Trello Created')
}

export async function createNotionWikiCommand(credential) {
  terminal.green('Wiki Created')
}

export async function buildAppWithHerokuCommand(credential, gitRepoUrl) {
  terminal.green('Build your application ok')
}
