import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantLoadingPage } from './restaurant-loading';

@NgModule({
  declarations: [
    RestaurantLoadingPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantLoadingPage),
  ],
})
export class RestaurantLoadingPageModule {}
