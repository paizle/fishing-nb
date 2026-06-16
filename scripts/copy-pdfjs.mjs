import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'node_modules/pdfjs-dist/legacy/build')
const dest = join(root, 'public/pdfjs')

mkdirSync(dest, { recursive: true })
copyFileSync(join(src, 'pdf.mjs'), join(dest, 'pdf.mjs'))
copyFileSync(join(src, 'pdf.worker.mjs'), join(dest, 'pdf.worker.mjs'))
