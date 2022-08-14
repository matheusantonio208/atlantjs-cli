import { createEntity, verifyConflicts } from '../extends/services/file-service'
import { prompt } from 'enquirer'
module.exports = {
  name: 't',
  description: 'Create the initial files of the application',

  run: async (toolbox) => {
    const {
      parameters,
      print: { error },
    } = toolbox

    const name = parameters.first

    // if (!name) return error('Falta informar o nome do módulo')

    // await createEntity(name)

    let inConflict = await verifyConflicts(name)

    const response = await prompt({
      type: 'confirm',
      name: 'inConflict',
      message: 'Corrected conflicts?',
    })

    //   let inConflict

    //   if (inConflict) {

    //     inConflict = !response
    //   }
  },
}
