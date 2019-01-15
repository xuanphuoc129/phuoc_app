import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChefMenuPage } from './chef-menu';

@NgModule({
  declarations: [
    ChefMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ChefMenuPage),
  ],
})
export class ChefMenuPageModule {}
