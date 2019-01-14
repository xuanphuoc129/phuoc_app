import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderInfoPage } from './order-info';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    OrderInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderInfoPage),
    PipesModule
  ],
})
export class OrderInfoPageModule {}
