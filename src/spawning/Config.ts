export class Config {
  public maxDrones: number;
  public droneEnergy: number;

  public constructor(maxDrones: number, droneEnergy: number) {
    this.maxDrones = maxDrones;
    this.droneEnergy = droneEnergy;
  }
}
