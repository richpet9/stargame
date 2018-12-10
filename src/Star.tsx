export class Star {
  public name: string;
  private _x: number;
  private _y: number;

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  constructor(newName: string) {
    this.name = newName;
    this._x = Math.floor(Math.random() * window.outerWidth);
    this._y = Math.floor(Math.random() * window.outerHeight);
  }

  public showStar(el: HTMLElement) {
    console.log('Clicked ' + this.name);
    const planetEl = document.createElement('div');

    planetEl.className = 'planet';
    planetEl.id = 'planet';
    planetEl.innerHTML = 'planet from ' + this.name;

    const container = document.getElementById('planet-container');
    if (container) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(planetEl);
    }
  }

  public draw(el: HTMLElement) {
    let starEl = document.createElement('div');

    starEl.className = 'star';
    starEl.id = this.name.replace(' ', '-');
    starEl.innerHTML = 'collision';
    starEl.style.left = this._x + 'px';
    starEl.style.top = this._y + 'px';

    el.appendChild(starEl);

    starEl.onclick = e => {
      this.showStar(el);
    };
  }
}
