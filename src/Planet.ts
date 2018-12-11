/**
 * Planet Class
 * This class is responsible for representing an individual Planet
 * Planets make up Stars
 */
export class Planet {
  public name: string; //The name of the planet
  private locationIndex: number; //The location from the Star (0 = closer)

  //Constructor
  constructor(name: string, index: number) {
    //Set name and index
    this.name = name;
    this.locationIndex = index;
  }

  //draw(HTMLElement): void => draws the planet on the screen
  public draw() {}
}
