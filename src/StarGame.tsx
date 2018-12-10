/**
 * This whole class is currently unused and was just
 * experimentation, but I'm afraid to remove it because
 * it has some good stuff.
 */
import { Galaxy } from './Galaxy';

export class StarGame {
  public screen: string = 'galaxy';
  private galaxy: Galaxy;
  private display: HTMLElement;

  constructor(targetEl: HTMLElement) {
    this.galaxy = new Galaxy(10);
    this.display = targetEl;
    console.log(targetEl);
    console.log(this.display);
  }

  public setScreen(newScreen: string) {
    this.screen = newScreen;
  }

  public update() {
    console.log('update');
    console.log(this.display);
    console.log(this.galaxy);
    switch (this.screen) {
      case 'galaxy':
        this.galaxy.draw(this.display);
        break;
    }
  }
}
