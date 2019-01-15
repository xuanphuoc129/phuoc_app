import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServePage } from './serve';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ServePage,
  ],
  imports: [
    IonicPageModule.forChild(ServePage),
    PipesModule
  ],
})
export class ServePageModule {}
