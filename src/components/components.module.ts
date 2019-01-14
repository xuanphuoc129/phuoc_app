import { NgModule } from '@angular/core';
import { OrderCardComponent } from './order-card/order-card';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card';
import { PipesModule } from '../pipes/pipes.module';
@NgModule({
	declarations: [OrderCardComponent,
    ProductCardComponent],
	imports: [
		IonicModule,
		PipesModule,
		CommonModule
	],
	exports: [OrderCardComponent,
    ProductCardComponent]
})
export class ComponentsModule {}
