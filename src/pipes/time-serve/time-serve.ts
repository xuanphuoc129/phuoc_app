import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../../providers/core/app/utils';

/**
 * Generated class for the TimeServePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'timeServe',
})
export class TimeServePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(time_created) {
    let date = new Date(time_created);
    return Utils.getTimeNotification(date);
  }
}
