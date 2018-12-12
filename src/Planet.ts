import { PLANET_COLORS } from './constants';
/**
 * Planet Class
 * This class is responsible for representing an individual Planet
 * Planets make up Stars
 */
export class Planet {
  public name: string; //The name of the planet
  private locationIndex: number; //The location from the Star (0 = closer)
  private size: number; //The size (in pixels) of the planet (30 - 76px)
  private color: string; //The color of the planet

  //Constructor
  constructor(name: string, index: number) {
    //Set name and index
    this.name = name;
    this.locationIndex = index;
    this.size = Math.random() * 76 + 30;
    this.color = this.randPlanetColor();
  }

  //draw(HTMLElement): void => draws the planet on the screen
  public draw() {
    //Create the planet element
    const planetEl = document.createElement('div');

    //Update attributes
    planetEl.className = 'planet';
    planetEl.id = this.name.replace(' ', '-');

    //Set planet position based off index
    planetEl.style.background = this.color;
    planetEl.style.width = this.size + 'px';
    planetEl.style.height = this.size + 'px';
    planetEl.style.top = 'calc(50% - ' + this.size / 2 + 'px)';

    //Query container
    const planetContainer = document.getElementById('planet-' + this.locationIndex + '-container');

    //I love TypeScript!
    if (planetContainer) {
      //Add the planet
      planetContainer.appendChild(planetEl);
    }

    //DEBUG: When we click a planet, get some info
    planetEl.onclick = e => {
      console.log(this.name, this.color, 'index: ' + this.locationIndex, 'size: ' + this.size);
    };
  }

  //randPlanetColor(): string => returns a random hexadecimal color from set possibilities
  public randPlanetColor(): string {
    return PLANET_COLORS[Math.floor(Math.random() * (PLANET_COLORS.length - 1))];
  }
}
