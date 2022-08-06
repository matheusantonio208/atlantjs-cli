export function coreFiles(name, moduleNameUpper?, moduleNameLower?) {
  return [
    {
      template: 'core/.husky/pre-commit',
      target: `${name}/.husky/pre-commit`,
    },
    {
      template: 'core/.editorconfig',
      target: `${name}/.editorconfig`,
    },
    {
      template: 'core/.env.example.ejs',
      target: `${name}/.env.example`,
      props: { name },
    },
    {
      template: 'core/.eslintignore',
      target: `${name}/.eslintignore`,
    },
  ]
}
