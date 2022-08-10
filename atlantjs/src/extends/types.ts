export enum Integrations {
  TRELLO = 'trello',
  WIKI = 'wiki',
  BUILD = 'build',
  REPO = 'repo',
  FIGMA = 'figma',
  AD_MOB = 'admob',
  GOOGLE_ANALYTICS = 'google-analytics',
  EXPO = 'expo',
}

export enum Environments {
  BACKEND,
  FRONTEND,
  MOBILE,
}

export interface Response {
  infoText: string
}
