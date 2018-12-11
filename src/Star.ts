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
  private size: number; //The radius of the star
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
    this.planets.push(new Planet(name, 0));
  }

  //showStar(HTMLElement): void => opens this Star system view and draws planets
  public showStarSystem() {
    //First, draw the center star
    //Create the element
    const starEl = document.createElement('div');

    //Set attributes
    starEl.className = 'planet';
    starEl.id = 'planet';
    starEl.innerHTML = this.name;

    //Set position
    starEl.style.top = 'calc(50% - ' + this.size / 2 + 'px)';
    starEl.style.left = 'calc(50% - ' + this.size / 2 + 'px)';
    starEl.style.width = this.size + 'px';
    starEl.style.height = this.size + 'px';

    //Query the planet container
    const container = document.getElementById('planet-container');

    //TypeScript is annoying
    if (container) {
      //Empty the container
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      //Append the planet element
      container.appendChild(starEl);

      //Then render the planets
      this.planets.forEach(planet => {
        planet.draw();
      });

      //Now make the exit button
      const exitStarSystemEl = document.createElement('div');
      exitStarSystemEl.innerHTML = 'X';
      exitStarSystemEl.className = 'exit-button';

      //Add the exit button
      container.appendChild(exitStarSystemEl);

      //Finally, show the container
      container.style.display = 'block';

      //When we click exit, set the display back to none
      exitStarSystemEl.onclick = e => {
        e.preventDefault;
        container.style.display = 'none';
      };
    }
  }

  //draw(HTMLElement): void => draws the Star in the given Galaxy element container
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

    const container = document.getElementById('star-container');

    //Create the element for this Star
    const starContainer = document.createElement('div');
    const starEl = document.createElement('div');
    const starLabel = document.createElement('div');

    //Set it's attributes
    starEl.className = 'star';
    starEl.id = this.name.replace(' ', '-');

    //Set location and size
    starEl.style.left = this._x + 'px';
    starEl.style.top = this._y + 'px';

    //TypeScript being annoying
    if (container) {
      //Append this Star to the container
      container.appendChild(starEl);
    }

    //On click the Star, show the Star System
    starEl.onclick = e => {
      this.showStarSystem();
    };
  }

  //checkCollision(): boolean => checks if a star is colliding,
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
