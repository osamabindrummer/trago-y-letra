import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import { readFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const directory = resolve(root, 'data/research/candidates')
const schema = JSON.parse(await readFile(resolve(root, 'data/schema/research-candidate.schema.json'), 'utf8')) as object
const ajv = new Ajv2020({ allErrors: true, strict: false })
addFormats(ajv)
const validate = ajv.compile(schema)
const files = (await readdir(directory)).filter((name) => name.endsWith('.json'))
for (const file of files) {
  const candidate = JSON.parse(await readFile(resolve(directory, file), 'utf8')) as object
  if (!validate(candidate)) {
    console.error(`${file}: ${ajv.errorsText(validate.errors)}`)
    process.exitCode = 1
  } else console.log(`Candidato válido: ${file}`)
}
if (!files.length) console.log('Sin candidatos de investigación para validar.')
