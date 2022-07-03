import { info } from 'console'

const { system } = require('gluegun')

module.exports = {
  name: 'create',
  description: 'Create the initial files of the application',
  run: async (toolbox) => {
    const {
      parameters,
      template,
      print: { success, error },
    } = toolbox

    const name = parameters.first

    const urlRepo = parameters.second

    if (!name) {
      error('App name must be specified')
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

    if (urlRepo) {
      await system.run(`
        cd ${name} &&
        git remote add origin ${urlRepo} &&
        git push -u origin main
      `)
    }

    success(`Generated ${name} app.`)
  },
}
