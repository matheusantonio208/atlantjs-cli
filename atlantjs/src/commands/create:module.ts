import { info } from 'console'
import { upperFirstLetter, lowerFirstLetter } from '../utils/utils'

const { system } = require('gluegun')

module.exports = {
  name: 'create:module',
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

    success(`Generated module.`)
  },
}
