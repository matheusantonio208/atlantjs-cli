export enum FileName {
  API_CONFIG = 'api-config',
  // PACKAGE = 'package',
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
  }

  return file
}
