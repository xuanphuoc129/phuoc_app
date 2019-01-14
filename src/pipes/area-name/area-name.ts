import { Pipe, PipeTransform } from '@angular/core';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';

/**
 * Generated class for the AreaNamePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'areaName',
})
export class AreaNamePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(area_id) {
    let areas = RestaurantManager.getInstance().getAreas();
    if(areas.length == 0){
      return "";
    }

    for (const area of areas) {
        if(area.getArea_id() == area_id){
          return area.getName();
        }
    }

    return "";
  }
}
