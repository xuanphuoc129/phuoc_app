import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChefTabsPage } from './chef-tabs';

@NgModule({
  declarations: [
    ChefTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChefTabsPage),
  ],
})
export class ChefTabsPageModule {}
