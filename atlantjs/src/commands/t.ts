import { get } from 'node-emoji'

module.exports = {
  name: 't',
  description: 'Create the initial files of the application',

  run: async (toolbox) => {
    const emojiS = get('pizza')
    console.log('🚀 ~ file: t.ts ~ line 9 ~ run: ~ emojiS', emojiS)
  },
}
