import * as ora from 'ora'
export async function loading(text, promise) {
  ora.promise(promise, {
    color: 'cyan',
    text: text,
  })
}
