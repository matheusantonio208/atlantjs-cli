export function createCoreFiles(name, moduleNameUpper?, moduleNameLower?) {
  return [
    {
      template: 'core/.husky/pre-commit',
      target: `${name}/.husky/pre-commit`,
    },
    {
      template: 'core/.vscode/settings.json',
      target: `${name}/.vscode/settings.json`,
    },
    {
      template: 'core/.editorconfig',
      target: `${name}/.editorconfig`,
    },
    {
      template: 'core/.env.example.ejs',
      target: `${name}/.env.example`,
      props: { name },
    },
    {
      template: 'core/.eslintignore',
      target: `${name}/.eslintignore`,
    },
    {
      template:
        'back-end/api/src/modules/Xxxx/__tests__/xxxx.controller.test.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/__tests__/${moduleNameLower}.controller.test.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
    {
      template:
        'back-end/api/src/modules/Xxxx/__tests__/xxxx.repository.test.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/__tests__/${moduleNameLower}.repository.test.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
    {
      template:
        'back-end/api/src/modules/Xxxx/__tests__/xxxx.routes.test.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/__tests__/${moduleNameLower}.routes.test.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
    {
      template:
        'back-end/api/src/modules/Xxxx/__tests__/xxxx.service.test.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/__tests__/${moduleNameLower}.service.test.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
    {
      template: 'back-end/api/src/modules/Xxxx/dto/index.dto.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/dto/index.dto.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
    {
      template: 'back-end/api/src/modules/Xxxx/dto/xxxx-created.dto.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/dto/${moduleNameLower}-created.dto.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
    {
      template: 'back-end/api/src/modules/Xxxx/dto/xxxx-creating.dto.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/dto/${moduleNameLower}-creating.dto.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
    {
      template: 'back-end/api/src/modules/Xxxx/dto/xxxx-to-create.dto.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/dto/${moduleNameLower}-to-create.dto.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
    {
      template: 'back-end/api/src/modules/Xxxx/dto/xxxx-to-update.dto.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/dto/${moduleNameLower}-to-update.dto.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
    {
      template: 'back-end/api/src/modules/Xxxx/xxxx.controller.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/${moduleNameLower}.controller.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
    {
      template: 'back-end/api/src/modules/Xxxx/xxxx.repository.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/${moduleNameLower}.repository.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
    {
      template: 'back-end/api/src/modules/Xxxx/xxxx.routes.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/${moduleNameLower}.routes.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
    {
      template: 'back-end/api/src/modules/Xxxx/xxxx.service.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/${moduleNameLower}.service.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
    {
      template: 'back-end/api/src/modules/routes.ts.ejs',
      target: `${name}/src/modules/routes.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
    {
      template: 'back-end/api/src/schemas/Xxxx.ts.ejs',
      target: `${name}/src/schemas/${moduleNameUpper}.ts`,
      props: { moduleNameUpper, moduleNameLower },
    },
  ]
}
