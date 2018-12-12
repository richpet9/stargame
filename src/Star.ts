import { Planet } from './Planet';
import { BOUNDRY } from './constants';
/**
 * Star Class
 * This class is responsible for representing an individual Star System
 * Stars make up Galaxies
 */
export class Star {
  public name: string; //The name of this Star
  private _x: number; //The x location of this Star
  private _y: number; //The y location of this Star
  private size: number; //The radius of the star (25 - 100px)
  private numPlanets: number; //The number of planets
  private planets: Planet[] = []; //The array of planets orbiting this star

  //x(): number => returns the x location
  get x() {
    return this._x;
  }

  //y(): number => returns the y location
  get y() {
    return this._y;
  }

  //Constructor
  constructor(name: string, size: number) {
    //Set the name
    this.name = name;
    //Set the location randomly (for now)
    do {
      this._x = Math.random() * window.innerWidth - BOUNDRY.right;
      this._y = Math.random() * window.innerHeight - BOUNDRY.bottom;
    } while (this._x <= BOUNDRY.left || this._y <= BOUNDRY.top);
    //Set size
    this.size = size;
    //Set the planets
    this.numPlanets = Math.floor(Math.random() * 5);
    for (let i = 0; i < this.numPlanets; i++) {
      this.planets[i] = new Planet(this.name + ' ' + i, i);
    }
  }

  //showStarSystem(): void => opens this Star system view and draws planets
  public showStarSystem() {
    //First, draw the center star
    //Create the element
    const starEl = document.createElement('div');

    //Set attributes
    starEl.className = 'planet';
    starEl.id = 'center-star';
    starEl.innerHTML = this.name;

    //Set position
    starEl.style.width = this.size + 'px';
    starEl.style.height = this.size + 'px';
    starEl.style.top = 'calc(50% - ' + this.size / 2 + 'px)';

    //Query the center star container
    const container = document.getElementById('center-star-container');

    //TypeScript is annoying
    if (container) {
      //Empty the container
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      //Append the star element
      container.appendChild(starEl);

      //Before we render the planets, empty their containers
      for (let i = 0; i < 5; i++) {
        //Query container
        const planetContainer = document.getElementById('planet-' + i + '-container');

        //I love TypeScript!
        if (planetContainer) {
          //Empty the container
          while (planetContainer.firstChild) {
            planetContainer.removeChild(planetContainer.firstChild);
          }
        }
      }

      //Then render the planets
      this.planets.forEach(planet => {
        planet.draw();
      });

      //Now make the exit button
      const exitStarSystemEl = document.createElement('div');
      exitStarSystemEl.innerHTML = 'X';
      exitStarSystemEl.className = 'exit-button';

      //Finally, get the star system container
      const systemContainer = container.parentElement;

      //TypeScript being fun
      if (systemContainer) {
        //Show the star system screen
        systemContainer.style.display = 'flex';

        //Add the exit button
        systemContainer.appendChild(exitStarSystemEl);

        //When we click exit, set the display back to none
        exitStarSystemEl.onclick = e => {
          e.preventDefault;
          systemContainer.style.display = 'none';
        };
      }

      //DEBUG: When we click the star get some info
      starEl.onclick = e => {
        console.log(this.name, 'size: ' + this.size, 'x: ' + this._x, 'y: ' + this._y, this.planets);
      };
    }
  }

  //draw(Star[]): void => draws the Star in the given Galaxy element container
  public draw(stars: Star[]): void {
    //First, check each star for a collision
    for (let i = 0; i < stars.length; i++) {
      //If not on the same star
      if (this.name != stars[i].name) {
        //Check if it collides
        if (this.checkCollision(stars[i])) {
          //If it does,
          //Set a new location
          do {
            this._x = Math.random() * window.innerWidth - BOUNDRY.right;
            this._y = Math.random() * window.innerHeight - BOUNDRY.bottom;
          } while (this._x <= BOUNDRY.left || this._y <= BOUNDRY.top);

          //Redraw
          return this.draw(stars);
        }
      }
    }

    //Create the element for this Star
    const starContainer = document.createElement('div');
    const starEl = document.createElement('div');
    const starLabel = document.createElement('div');

    //Set it's attributes
    starEl.className = 'star';
    starEl.id = this.name.replace(' ', '-');

    //Set label element
    starLabel.className = 'star-label';
    starLabel.innerHTML = this.name + '<br />planets: ' + this.numPlanets;

    //TODO: REALLY DO CHANGE THIS
    starContainer.className = 'starContainer';

    //Set location and size
    starEl.style.left = this._x + 'px';
    starEl.style.top = this._y + 'px';

    //Add the elements to the container
    starContainer.appendChild(starEl);
    starContainer.appendChild(starLabel);

    //Query the container
    const container = document.getElementById('galaxy-container');

    //TypeScript being annoying
    if (container) {
      //Append this Star to the container
      container.appendChild(starContainer);
    }

    //On click the Star, show the Star System
    starEl.onclick = e => {
      this.showStarSystem();
    };
  }

  //checkCollision(Star): boolean => checks if a star is colliding,
  //returns true and sets new location if so
  private checkCollision(star: Star): boolean {
    //Get the difference in locations
    const dX = Math.abs(this._x - star.x);
    const dY = Math.abs(this._y - star.y);

    //Check if they are too close
    //TODO: for now, we know the collision is hardcoded in CSS as 36px
    if (dX <= 36 && dY <= 36) {
      //Return true, collision detected
      return true;
    } else {
      //No collision detected
      return false;
    }
  }
}
