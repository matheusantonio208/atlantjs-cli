import { loading } from '../utils/pretty-terminal'
import { system } from 'gluegun'

export async function installPackages(name) {
  setTimeout(async () => {
    await loading('Install packages', system.run(`cd ${name} && yarn`))
  }, 1000)
}

export async function startGit(name, repoUrl) {
  loading(
    'Initializing Git',
    await system.run(`
  cd ${name} &&
  git init &&
  git add . &&
  git commit -m "feat: add back-end layer layer" &&
  git branch -M main
`)
  )

  if (repoUrl) {
    loading(
      'Initializing Repository',
      await system.run(`
    cd ${name} &&
    git remote add origin ${repoUrl} &&
    git push -u origin main
  `)
    )
  }
}

export async function openProject(name) {
  await system.run(`
    cd ${name} &&
    code .
  `)
}
