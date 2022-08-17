export enum FileName {
  API_CONFIG = 'api-config',
  PACKAGE = 'package',
  DTO = 'dto',
  SCHEMA = 'schema',
  SWAGGER = 'swagger'
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
          lineToStart: {
            start: '//! constructor-start',
            end: '//! constructor-end',
          },
        },
        {
          name: 'imports',
          tags: {
            start: '//! import-start',
            end: '//! import-end',
          },
        }
      )
      break
    }
    case FileName.PACKAGE: {
      file.push(
        {
          name: 'dependencies',
          tags: {
            start: '"dependencies": {',
            end: '}',
          },
        },
        {
          name: 'scripts',
          tags: {
            start: '"scripts": {',
            end: '}',
          },
        },
        {
          name: 'devDependencies',
          tags: {
            start: '"devDependencies": {',
            end: '}',
          },
        }
      )
      break
    }
    case FileName.DTO: {
      file.push({
        name: 'properties',
        tags: {
          start: '//! properties-start',
          end: '//! properties-end'
        }
      },
      {
        name: 'constructor',
        tags: {
          start: '//! constructor-start',
          end: '//! constructor-end'
        }
      })
      break
    }
    case FileName.SCHEMA: {
      file.push({
        name: 'properties',
        tags: {
          start: '//! properties-start',
          end: '//! properties-end'
        }
      })
    }
    case FileName.SWAGGER: {
      file.push(
        {
          name: 'paths',
          tags: {
            start: '"paths": {',
            end: '}',
          },
        },
        {
          name: 'schemas',
          tags: {
            start: ' "schemas": {',
            end: '}',
          },
        }
      )
      break
    }
  }

  return file
}
