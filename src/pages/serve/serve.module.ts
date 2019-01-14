import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServePage } from './serve';

@NgModule({
  declarations: [
    ServePage,
  ],
  imports: [
    IonicPageModule.forChild(ServePage),
  ],
})
export class ServePageModule {}
