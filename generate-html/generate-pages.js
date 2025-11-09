import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync, rmSync } from 'fs'
import { people } from './people-data.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const createList = () => {
  let listItems = createPeople();

  return `
  <ul class="people-list">
  ${listItems}
  </ul>
`;
}

const createPeople = () => {
  let peopleItems = '';

  people.forEach(person => {
    let personSlug = person.id
    const randomRotation = Math.random() * 10 - 5;
    peopleItems += `
    <li class="person-item" style="--random-rotation: ${randomRotation}deg;">
      <div class="person-item__image" style="--vt: ${personSlug};">
        <img src="${person.media}" alt="${person.name}" loading="eager" class="person-image" width="1600" height="2400">
      </div>
      <a href="./people/${personSlug}">
        <div class="person-info" style="--vt: ${personSlug}-info;">
          <h3 class="person-name large-body">
          ${person.name}
          </h3>
          <p class="person-title default-body">${person.title}</p>
        </div>
      </a>
    </li>
    `;
  });

  return peopleItems;
}



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
