export const log = {
  titleBox: `     Let's go to coder!`,
  docBackend: `Open documentation end-points with:\n❯    ^gyarn docs^ access in ^bhttp://localhost:8080/docs^`,
  docFrontend: `Open documentation components with:\n❯    ^gyarn docs^ access in ^bhttp://localhost:8080/docs^`,
  script: {
    dev: '\n\nStart development with:\n❯    ^gyarn dev^ access in ',
    debug: '\n\nStart debug with:\n❯    ^gyarn dev:debug\n\n^',
  },

  linkIndicator: 'Infos about your project',
  expo: {
    info: 'Access Expo in:\n❯    ^bhttp://expo.com/^\n\n',
  },
  admob: {
    info: 'Access AdMob Dashboard in:\n❯    ^bhttp://expo.com/^\n\n',
  },
  googleAnalitics: {
    info: 'Access Analytics Dashboard in:\n❯    ^bhttp://expo.com/^\n\n',
  },
  git: {
    start: 'Initializing Git...',
    success: 'Git success initialized!',
    fail: 'Failure to start the git:',
    info: '^gyarn docs^ access in ^bhttp://localhost:8080/docs^',
  },
  commit: {
    start: 'Creating Commit...',
    success: 'Commit created successfully!',
    fail: `Failure when creating commit`,
    info: '^gyarn docs^ access in ^bhttp://localhost:8080/docs^',
  },
  repository: {
    start: 'Initializing Repository...',
    success: 'Repository Successful initialized!',
    fail: 'Failure to start the Repository',
    info: 'Access Repository in:\n❯    ^bhttp://github.com/^\n\n',
  },
  project: {
    start: 'Opening the project...',
    success: 'Success when opening your project!',
    fail: 'Failure to open the Project',
    info: '^gyarn docs^ access in ^bhttp://localhost:8080/docs^',
  },
  dependencies: {
    start: 'Installing dependencies...',
    success: 'Dependencies installed successfully!',
    fail: 'Failure to install the dependencies',
    info: '',
  },
  module: {
    start: 'Creating $moduleName files...',
    success: 'Files $moduleName created successfully!',
    fail: 'Fail to create files of $moduleName',
    info: '',
  },
  layers: {
    start: 'Creating $layerName files...',
    success: `Files $layerName created successfully!`,
    fail: 'Fail to create files of $layerName',
    info: '',
  },
  figma: {
    info: 'Access design system in:\n❯    ^bhttp://figma.com/^\n\n',
  },
  trello: {
    info: 'Trello board access in:\n❯    ^b${trelloResponse}^\n\n',
  },
  wiki: {
    info: 'Access Wiki ${chalk.bold.italic.gray(notionResponse)} in:\n❯    ^bhttp://notion.so/^\n\n',
  },
}
