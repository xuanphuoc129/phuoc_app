import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChefServePage } from './chef-serve';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ChefServePage,
  ],
  imports: [
    IonicPageModule.forChild(ChefServePage),
    PipesModule
  ],
})
export class ChefServePageModule {}
