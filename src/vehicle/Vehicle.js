export class Vehicle {

  constructor(type, capacity) {
    this.type  = type;
    this.capacity = capacity;
    this.crews = [];
  }

  ride(crew) {
    var crews = this.crews;

    if (crews.length >= this.capacity) {
      throw new Error('overcrowded');
    }
    crews.push(crew);
    return crews.length;
  }

  stepDown(crew) {
    var crews = this.crews, index;

    if ((index = crews.indexOf(crew)) === -1) {
      return false;
    }

    crews.splice(index, 1);
    return true;
  }
}
