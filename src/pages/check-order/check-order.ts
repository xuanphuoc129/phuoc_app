import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { ProductInOrder } from '../../providers/class/ProductInOrder';

/**
 * Generated class for the CheckOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-order',
  templateUrl: 'check-order.html',
})
export class CheckOrderPage {

  order_id : number = -1;
  products: Array<ProductInOrder> = [];
  total_money: number = 0;
  
  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.data["id"]){
      this.order_id = this.navParams.get("id");
    }
  }

  ionViewDidLoad() {
    if (!this.mAppModule.isLogin) {
      this.navCtrl.setRoot("LoadingPage");
    }

    RestaurantSFSConnector.getInstance().addListener("CheckOrderPage", response => {
      this.onExtensions(response);
    })

    RestaurantSFSConnector.getInstance().getListProductInOrder(this.order_id);
  }

  ionViewWillUnload() {
    RestaurantSFSConnector.getInstance().removeListener("CheckOrderPage");
  }

  onExtensions(response) {
    this.mAppModule.hideLoading();

    let cmd = response.cmd;
    let params = response.params;

    if (RestaurantClient.getInstance().doCheckStatusParams(params)) {
      let database = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd, params);

      if (cmd == RestaurantCMD.GET_PRODUCT_IN_ORDER) {
        this.onResponseOrderInProduct(database);
      } 

    } else {
      this.mAppModule.showParamsMessage(params);
    }
  }

  onResponseOrderInProduct(database) {
    this.products = RestaurantClient.getInstance().onParseProductInOrder(database.array);
    
    this.total_money = 0;
    this.products.forEach(element => {
      this.total_money += element.getTotal_money();
    });
  }

}
