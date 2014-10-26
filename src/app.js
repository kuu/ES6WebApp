import {Car} from 'vehicle/car/Car';

export function initApp() {
  var smallCar = new Car(4);
  var largeCar = new Car(8);
  smallCar.ride(null);
  console.log(smallCar.crews);
}
