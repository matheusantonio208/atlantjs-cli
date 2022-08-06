import * as ora from 'ora'
export async function loading(text, promise) {
  await ora.promise(promise, {
    color: 'cyan',
    text: text,
  })
}
