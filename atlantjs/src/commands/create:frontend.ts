import { info } from 'console'
import { lowerFirstLetter, upperFirstLetter } from '../utils/index'

const { system } = require('gluegun')

module.exports = {
  name: 'create:frontend',
  description: 'Create the initial files of the application',
  run: async (toolbox) => {
    const {
      parameters,
      template,
      print: { success, error },
    } = toolbox

    const name = parameters.first

    const module = parameters.second

    const moduleNameUpper = upperFirstLetter(module)
    const moduleNameLower = lowerFirstLetter(module)

    if (!name) {
      error('App name must be specified')
      return
    }
    if (!module) {
      error('App module must be specified')
      return
    }

    await template.generate({
      template: 'core/.husky/pre-commit',
      target: `${name}/.husky/pre-commit`,
    })

    await template.generate({
      template: 'core/.vscode/launch.json',
      target: `${name}/.vscode/launch.json`,
    })

    await template.generate({
      template: 'core/.vscode/settings.json',
      target: `${name}/.vscode/settings.json`,
    })

    await template.generate({
      template: 'core/.editorconfig',
      target: `${name}/.editorconfig`,
    })

    await template.generate({
      template: 'core/.env.example.ejs',
      target: `${name}/.env.example`,
      props: { name },
    })

    await template.generate({
      template: 'core/.eslintignore',
      target: `${name}/.eslintignore`,
    })

    await template.generate({
      template: 'core/.eslintrc.json',
      target: `${name}/.eslintrc.json`,
    })

    await template.generate({
      template: 'core/.gitignore',
      target: `${name}/.gitignore`,
    })

    await template.generate({
      template: 'core/.prettierrc',
      target: `${name}/.prettierrc`,
    })

    await template.generate({
      template: 'core/babel.config.js',
      target: `${name}/babel.config.js`,
    })

    await template.generate({
      template: 'core/package.json.ejs',
      target: `${name}/package.json`,
      props: { name },
    })

    await template.generate({
      template: 'core/README.md.ejs',
      target: `${name}/README.md`,
      props: { name },
    })

    await template.generate({
      template: 'core/tsconfig.json',
      target: `${name}/tsconfig.json`,
    })

    await template.generate({
      template: 'back-end/api/config/debug/youch-config.js',
      target: `${name}/config/debug/youch-config.js`,
    })

    await template.generate({
      template: 'back-end/api/config/server/api-config.js',
      target: `${name}/config/server/api-config.js`,
    })

    await template.generate({
      template: 'back-end/api/config/server/server-connect.js',
      target: `${name}/config/server/server-connect.js`,
    })

    await template.generate({
      template: 'back-end/api/config/env-loader.js',
      target: `${name}/config/env-loader.js`,
    })

    await template.generate({
      template:
        'back-end/api/src/modules/Xxxx/__tests__/xxxx.controller.test.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/__tests__/${moduleNameLower}.controller.test.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    await template.generate({
      template:
        'back-end/api/src/modules/Xxxx/__tests__/xxxx.repository.test.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/__tests__/${moduleNameLower}.repository.test.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    await template.generate({
      template:
        'back-end/api/src/modules/Xxxx/__tests__/xxxx.routes.test.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/__tests__/${moduleNameLower}.routes.test.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    await template.generate({
      template:
        'back-end/api/src/modules/Xxxx/__tests__/xxxx.service.test.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/__tests__/${moduleNameLower}.service.test.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    await template.generate({
      template: 'back-end/api/src/modules/Xxxx/dto/index.dto.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/dto/index.dto.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    await template.generate({
      template: 'back-end/api/src/modules/Xxxx/dto/xxxx-created.dto.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/dto/${moduleNameLower}-created.dto.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    await template.generate({
      template: 'back-end/api/src/modules/Xxxx/dto/xxxx-creating.dto.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/dto/${moduleNameLower}-creating.dto.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    await template.generate({
      template: 'back-end/api/src/modules/Xxxx/dto/xxxx-to-create.dto.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/dto/${moduleNameLower}-to-create.dto.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    await template.generate({
      template: 'back-end/api/src/modules/Xxxx/dto/xxxx-to-update.dto.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/dto/${moduleNameLower}-to-update.dto.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    await template.generate({
      template: 'back-end/api/src/modules/Xxxx/xxxx.controller.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/${moduleNameLower}.controller.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    await template.generate({
      template: 'back-end/api/src/modules/Xxxx/xxxx.repository.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/${moduleNameLower}.repository.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    await template.generate({
      template: 'back-end/api/src/modules/Xxxx/xxxx.routes.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/${moduleNameLower}.routes.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    await template.generate({
      template: 'back-end/api/src/modules/Xxxx/xxxx.service.ts.ejs',
      target: `${name}/src/modules/${moduleNameUpper}/${moduleNameLower}.service.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    await template.generate({
      template: 'back-end/api/src/modules/routes.ts.ejs',
      target: `${name}/src/modules/routes.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    await template.generate({
      template: 'back-end/api/src/schemas/Xxxx.ts.ejs',
      target: `${name}/src/schemas/${moduleNameUpper}.ts`,
      props: { moduleNameUpper, moduleNameLower },
    })

    info(`Run yarn install`)
    await system.run(`cd ${name} && yarn`)

    info(`Start git`)
    await system.run(`
      cd ${name} &&
      git init && 
      git add . && 
      git commit -m "feat: add core layer" &&
      git branch -M main
    `)

    // if (urlRepo) {
    //   await system.run(`
    //     cd ${name} &&
    //     git remote add origin ${urlRepo} &&
    //     git push -u origin main
    //   `)
    // }

    await system.run(`
      cd ${name} &&
      code .
    `)

    success(`Generated ${name} app.`)
  },
}
