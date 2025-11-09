import { people } from '../people-data.js';

export const createList = () => {
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