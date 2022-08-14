export enum FileName {
  API_CONFIG = 'api-config',
  PACKAGE = 'package',
  DTO = 'dto',
  SCHEMA = 'schema'
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
          tags: {
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
            start: '//! dependencies-start',
            end: '//! dependencies-end',
          },
        },
        {
          name: 'scripts',
          tags: {
            start: '//! scripts-start',
            end: '//! scripts-end',
          },
        },
        {
          name: 'devDependencies',
          tags: {
            start: '//! devDependencies-start',
            end: '//! devDependencies-end',
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
  }

  return file
}
