/**
 * Galaxy Class
 * This class is responsible for representing a Galaxy
 */
import { Star } from './Star';

export class Galaxy {
  private stars: Star[] = []; //The array of stars in this Galaxy
  private _numStars: number; //The number of stars in this Galaxy
  public isDrawn: boolean = false; //If this Galaxy is drawn or not

  //numStart(): number => returns the number of stars in this Galaxy
  get numStars() {
    return this._numStars;
  }

  //Constructor
  constructor(numStars: number) {
    //Set the number of desired stars
    this._numStars = numStars;

    //For every desired star, create a new star
    for (let i = 0; i < this._numStars; i++) {
      this.stars[i] = new Star(('star ' + i) as string, Math.random() * 100 + 25);
    }
  }

  //draw(HTMLElement): void => this function draws the stars in thie given element
  public draw(el: HTMLElement) {
    //If already drawn
    if (this.isDrawn) {
      //Generate a new array of stars
      for (let i = 0; i < this._numStars; i++) {
        this.stars[i] = new Star(('star ' + i) as string, Math.random() * 100 + 25);
      }

      //Destroy existing stars
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }

    //Redraw every star
    this.stars.forEach(star => {
      star.draw(this.stars);
    });

    //Draw connecting lines
    /*
    for (let i = 0; i < this._numStars; i++) {
      for (let k = 0; k < this._numStars; k++) {
        //If we aren't on the same star
        if (i != k) {
          const dX = Math.abs(this.stars[i].x - this.stars[k].x);
          const dY = Math.abs(this.stars[i].y - this.stars[k].y);
          const hyp = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
          if (hyp <= 100) {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', `${dX}`);
            svg.setAttribute('height', `${dY}`);
            svg.setAttribute('style', `top: ${this.stars[k].y + 25}px; left: ${this.stars[k].x + 25}px`);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', '0');
            line.setAttribute('y1', '0');
            line.setAttribute('x2', `${dX}`);
            line.setAttribute('y2', `${dY}`);

            svg.append(line);

            el.append(svg);
          }
        }
      }

    }*/

    //Set isDrawn to true, since we just drew stars
    this.isDrawn = true;
  }
}
