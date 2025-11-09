import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync, rmSync } from 'fs'
import { people } from './people-data.js'
import { createList } from './components/people-list.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Function to generate speaker pages
function generatePersonPages() {
  // delete all existing people pages
  rmSync(join(__dirname, '..', 'people'), { recursive: true })
  const templatePath = join(__dirname, 'detail-template.html')
  const template = readFileSync(templatePath, 'utf8')

  people.forEach(person => {
    let personSlug = person.id

    let content = template
      .replace(/{name}/g, person.name)
      .replace(/{name-replace-spaces-with-dash}/g, personSlug)
      .replace(/{image}/g, `${person.media}`)
      .replace(/{title}/g, person.title)
      .replace(/{bio}/g, person.bio)

    const outputPath = join(__dirname, '..', 'people', personSlug, 'index.html')
    mkdirSync(join(__dirname, '..', 'people', personSlug), { recursive: true })
    writeFileSync(outputPath, content)
    console.log(`Generated person: /${personSlug}/index.html`)
  })
}

function generateIndexPage() {
  const templatePath = join(__dirname, 'index-template.html')
  const template = readFileSync(templatePath, 'utf8')
  const content = template
    .replace(/{people-list}/g, createList())
  const outputPath = join(__dirname, '..', 'index.html')
  writeFileSync(outputPath, content)
}


// Run the generator
generatePersonPages()
generateIndexPage()
