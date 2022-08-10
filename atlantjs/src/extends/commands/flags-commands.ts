import { terminal } from 'terminal-kit'
import { Response } from '../types'

export async function createBoardTrelloCommand(credential): Promise<Response> {
  terminal.green('\n\nBoard Trello Created!\n')
  return { infoText: 'Teste' }
}

export async function createNotionWikiCommand(credential): Promise<Response> {
  terminal.green('\nWiki Created!\n\n')
  return { infoText: 'Teste' }
}

export async function buildAppCommand(
  credential,
  gitRepoUrl
): Promise<Response> {
  terminal.green('Build your application ok!\n\n')
  return { infoText: 'Teste' }
}
