import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Orders } from '../../providers/class/Orders';
import { NavController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';

/**
 * Generated class for the OrderCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'order-card',
  templateUrl: 'order-card.html'
})
export class OrderCardComponent {

  @Input("order") mOrder: Orders = new Orders();
  // @Output("onSelectMore") mEventEmiter = new EventEmitter();

  // @Output("onAddFood") mEventEmitter1 = new EventEmitter();
  // @Output("onServe") mEventEmitter2 = new EventEmitter();
  // @Output("onAddFood") mEventEmitter3 = new EventEmitter();
  // @Output("onAddFood") mEventEmitter4 = new EventEmitter();

  constructor(public mAppModule: AppControllerProvider, public navCtrl: NavController) {
   
  }

  onClickAddFood(){
    this.mAppModule.showModal("SelectFoodToOrderPage",{id: this.mOrder.getOrder_id(), type: 1});
  }

  onClickServe(){

  }

  onClickCash(){

  }

  onClickClipboard(){
    this.mAppModule.showModal("CheckOrderPage",{id: this.mOrder.getOrder_id()});
  }

  onClickMore(){

    this.navCtrl.push("OrderInfoPage",{id: this.mOrder.getOrder_id()});
  }

}
