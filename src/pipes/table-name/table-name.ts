import { Pipe, PipeTransform } from '@angular/core';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';

/**
 * Generated class for the TableNamePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'tableName',
})
export class TableNamePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(table_id) {
    let tables = RestaurantManager.getInstance().getTables();
    if(tables.length == 0){
      return "";
    }

    for (const table of tables) {
        if(table.getTable_id() == table_id){
          return table.getName();
        }
    }

    return "";
  }
}
