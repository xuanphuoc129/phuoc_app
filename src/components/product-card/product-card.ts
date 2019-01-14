import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Products } from '../../providers/class/Products';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';

/**
 * Generated class for the ProductCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'product-card',
  templateUrl: 'product-card.html'
})
export class ProductCardComponent {


  @Input("product") mProduct: Products = new Products();
  @Input("quantity") mNumber: number = 0;
  @Output("onSelectedProduct") mEventEmitter = new EventEmitter();

  
  constructor(public mAppModule: AppControllerProvider) {
  }

  ngAfterViewInit(){
    this.mAppModule.getEventController().subscribe("cancel", (product: Products)=>{
      if(product.getProduct_id() == this.mProduct.getProduct_id()){
        this.onClickAdd();
      }
    });
  }

  onClickAdd(){
    this.mNumber++;
    this.sendOutEvent();
  }

  onClickRemove(){
    if(this.mNumber == 0) return;
    this.mNumber--;
    this.sendOutEvent();
  }

  sendOutEvent(){
    this.mEventEmitter.emit(this.mNumber);
  }

  onClickNumber(){

  }

}
