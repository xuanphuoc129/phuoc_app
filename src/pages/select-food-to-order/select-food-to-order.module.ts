import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectFoodToOrderPage } from './select-food-to-order';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SelectFoodToOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectFoodToOrderPage),
    ComponentsModule
  ],
})
export class SelectFoodToOrderPageModule {}
