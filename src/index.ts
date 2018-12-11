import { Galaxy } from './Galaxy';

//Get the DOM elements we need to reference
const starContainer = document.getElementById('star-container'); //Star container
const generate = document.getElementById('generate'); //The generate button

//TypeScript can be annoying
if (starContainer) {
  //Create the Galaxy
  const galaxy = new Galaxy(100);

  //Again, TypeScript can be annoying
  if (generate) {
    //On click the generate button
    generate.onclick = e => {
      //Prevent default, and draw the Galaxy
      e.preventDefault;
      galaxy.draw(starContainer);
    };
  }
}
