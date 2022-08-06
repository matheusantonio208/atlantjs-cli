import { loading } from '../utils/pretty-terminal'
import { system } from 'gluegun'

export async function installPackages(name) {
  await loading('Install packages', await system.run(`cd ${name} && yarn`))
}

export async function startGit(name, repoUrl) {
  await loading(
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
    await loading(
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
