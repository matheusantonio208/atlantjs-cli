export enum FlagsBackend {
  TRELLO = 'trello',
  WIKI = 'wiki',
  BUILD = 'build',
  REPO = 'repo',
  FIGMA = 'figma',
  AD_MOB = 'admob',
  GOOGLE_ANALYTICS = 'google-analytics',
}

export enum FlagsFrontend {
  FIGMA = 'figma',
}

export enum FlagsMobile {
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
