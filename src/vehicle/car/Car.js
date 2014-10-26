import {Vehicle} from '../Vehicle';

export class Car extends Vehicle {

  constructor(capacity) {
    super('Car', capacity);
    this.speed = 0;
  }

  gear(level) {
  }

  accel(level) {
  }

  break(level) {
  }
}
