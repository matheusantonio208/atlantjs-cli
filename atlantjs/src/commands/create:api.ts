import { info } from 'console'

const { system } = require('gluegun')

module.exports = {
  name: 'create:api',
  description: 'Create the initial files of the application',
  run: async (toolbox) => {
    const {
      parameters,
      template,
      print: { success, error },
    } = toolbox

    const name = parameters.first

    if (!name) {
      error('App name must be specified')
      return
    }

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

    info(`Run yarn install`)
    await system.run(`cd ${name} && yarn`)

    success(`Generated api.`)
  },
}
