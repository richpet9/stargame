import { Galaxy } from './Galaxy';

const starContainer = document.getElementById('star-container');
const generate = document.getElementById('generate');

if (starContainer) {
  const galaxy = new Galaxy(10);

  if (generate) {
    generate.onclick = e => {
      e.preventDefault;
      galaxy.draw(starContainer);
    };
  }
}
