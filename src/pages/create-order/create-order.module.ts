import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateOrderPage } from './create-order';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CreateOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateOrderPage),
    PipesModule,
    ComponentsModule
  ],
})
export class CreateOrderPageModule {}
