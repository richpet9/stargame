import { Star } from './Star';

export class Galaxy {
  public stars: Star[] = [];
  private _numStars: number;
  public isDrawn: boolean = false;

  get numStars() {
    return this._numStars;
  }

  constructor(numStars: number) {
    this._numStars = numStars;

    for (let i = 0; i < this._numStars; i++) {
      this.stars[i] = new Star(('star ' + i) as string);
    }
  }

  public draw(el: HTMLElement) {
    if (this.isDrawn) {
      //Generate a new array of stars
      for (let i = 0; i < this._numStars; i++) {
        this.stars[i] = new Star(('star ' + i) as string);
      }

      //Destroy existing stars
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }

    //Redraw every star
    this.stars.forEach(star => {
      star.draw(el);
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

    this.isDrawn = true;
  }
}
