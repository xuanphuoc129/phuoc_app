import { Pipe, PipeTransform } from '@angular/core';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';

/**
 * Generated class for the FloorNamePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'floorName',
})
export class FloorNamePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(floor_id) {
    let floors = RestaurantManager.getInstance().getFloors();
    if(floors.length == 0){
      return "";
    }

    for (const floor of floors) {
        if(floor.getFloor_id() == floor_id){
          return floor.getName();
        }
    }

    return "";
  }
}
