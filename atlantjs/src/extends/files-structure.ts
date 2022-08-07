export enum FileName {
  API_CONFIG = 'api-config',
  PACKAGE = 'package',
  // SERVICE = 'service',
  // ENV_EXAMPLE = 'env-example',
  // DOCKER_FILE = 'docker-file',
  // DOCKER_COMPOSE = 'docker-compose',
  // ROUTES = 'routes',
}

export function filesStructure(fileName: string) {
  let file = []

  switch (fileName) {
    case FileName.API_CONFIG: {
      file.push(
        {
          name: 'constructor',
          range: {
            contentSectionStart: 'constructor() {',
            contentSectionEnd: '// DatabaseDB.start();',
          },
        },
        {
          name: 'imports',
          range: {
            contentSectionStart: 'import',
            contentSectionEnd: 'class ApiConfig {',
          },
        }
      )
      break
    }
    case FileName.PACKAGE: {
      file.push(
        {
          name: 'scripts',
          range: {
            contentSectionStart: '"scripts": {',
            contentSectionEnd: '"coverage": "jest --coverage"',
          },
        },
        {
          name: 'dependencies',
          range: {
            contentSectionStart: '"dependencies": {',
            contentSectionEnd: '"ts-node": "10.8.1"',
          },
        },
        {
          name: 'devDependencies',
          range: {
            contentSectionStart: '"devDependencies": {',
            contentSectionEnd: '"typescript": "^4.2.3"',
          },
        }
      )
      break
    }
  }

  return file
}
