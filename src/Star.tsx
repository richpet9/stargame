/**
 * Star Class
 * This class is responsible for representing an individual Star System
 */
export class Star {
  public name: string; //The name of this Star
  private _x: number; //The x location of this Star
  private _y: number; //The y location of this Star
  //TODO: Add an array of planets! (and a planeet class)

  //x(): number => returns the x location
  get x() {
    return this._x;
  }

  //y(): number => returns the y location
  get y() {
    return this._y;
  }

  //Constructor
  constructor(newName: string) {
    //Set the name
    this.name = newName;
    //Set the location randomly (for now)
    this._x = Math.floor(Math.random() * window.outerWidth);
    this._y = Math.floor(Math.random() * window.outerHeight);
  }

  //showStar(HTMLElement): void => opens this Star system view and draws planets
  public showStarSystem(el: HTMLElement) {
    console.log('Clicked ' + this.name);
    //All this stuff should be moved to Planet class
    //Create the element
    const planetEl = document.createElement('div');

    //Set attributes
    planetEl.className = 'planet';
    planetEl.id = 'planet';
    planetEl.innerHTML = 'planet from ' + this.name;

    //Query the planet container
    const container = document.getElementById('planet-container');

    //TypeScript is annoying
    if (container) {
      //Empty the container
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      //Append the planet element
      container.appendChild(planetEl);
    }
  }

  //draw(HTMLElement): void => draws the Star in the given Galaxy element container
  public draw(el: HTMLElement) {
    //Create the element for this Star
    let starEl = document.createElement('div');

    //Set it's attributes
    starEl.className = 'star';
    starEl.id = this.name.replace(' ', '-');
    starEl.innerHTML = 'collision';

    //Set location
    starEl.style.left = this._x + 'px';
    starEl.style.top = this._y + 'px';

    //Append this Star to the container
    el.appendChild(starEl);

    //On click the Star, show the Star System
    starEl.onclick = e => {
      this.showStarSystem(el);
    };
  }
}
