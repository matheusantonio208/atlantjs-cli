import * as ora from 'ora'
export async function loadingStart(text) {
  ora(text).start()
}

export function loadingStop(text) {
  ora(text).stop()
}

export function loadingSucceed(text) {
  ora(text).succeed()
}

export function loadingFail(text) {
  ora(text).fail()
}

export function loadingWarn(text) {
  ora(text).warn()
}
