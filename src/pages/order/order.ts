import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Orders } from '../../providers/class/Orders';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {


  mOrders: Array<Orders> = [];
  mNumberDidEnter: number = 0;

  filter_text: string = "Đang phục vụ";
  mFilterId: number = 1;

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.mNumberDidEnter++;
    if (this.mNumberDidEnter > 1) {
      RestaurantSFSConnector.getInstance().getListOrder(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
    }
  }

  ionViewDidLoad() {
    if (!this.mAppModule.isLogin) {
      this.navCtrl.setRoot("LoadingPage");
    }

    this.mAppModule._loadAppConfig().then(() => {
      RestaurantSFSConnector.getInstance().addListener("OrderPage", response => {
        this.onExtension(response);
      })
    })

    RestaurantSFSConnector.getInstance().getListOrder(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
  }

  ionViewWillUnload() {
    RestaurantSFSConnector.getInstance().removeListener("OrderPage");
  }

  onExtension(response) {
    this.mAppModule.hideLoading();

    let cmd = response.cmd;
    let params = response.params;

    if (RestaurantClient.getInstance().doCheckStatusParams(params)) {
      let database = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd, params);
      if (cmd == RestaurantCMD.GET_LIST_ORDER_TODAY) {
        this.onResponseGetListOrder(database);
      }
    } else {
      this.mAppModule.showParamsMessage(params);
    }
  }

  onResponseGetListOrder(params) {
    let array = params.array;
    let orders : Array<Orders> = RestaurantClient.getInstance().onParseListOrder(array);
    this.mOrders = orders.filter(o=>{
      return o.getStatus() < 3;
    })
    let tables = RestaurantManager.getInstance().getTables();
    this.mOrders.forEach(element => {
      let index = tables.findIndex(table => {
        return table.getTable_id() == element.getTable_id();
      })

      if (index > -1) {
        element.getTables().fromObject(tables[index]);
      }
    });
  }

  onClickAdd() {
    this.navCtrl.push("CreateOrderPage");
  }

  onClickOrderList(){
    
  }

}
