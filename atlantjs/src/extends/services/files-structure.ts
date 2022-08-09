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
            contentSectionStart: '//! constructor-start',
            contentSectionEnd: '//! constructor-end',
          },
        },
        {
          name: 'imports',
          range: {
            contentSectionStart: '//! import-start',
            contentSectionEnd: '//! import-end',
          },
        }
      )
      break
    }
    case FileName.PACKAGE: {
      file.push(
        {
          name: 'dependencies',
          range: {
            contentSectionStart: '//! dependencies-start',
            contentSectionEnd: '//! dependencies-end',
          },
        },
        {
          name: 'devDependencies',
          range: {
            contentSectionStart: '//! devDependencies-start',
            contentSectionEnd: '//! devDependencies-end',
          },
        }
      )
      break
    }
  }

  return file
}
