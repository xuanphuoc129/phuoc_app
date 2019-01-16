import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Orders } from '../../providers/class/Orders';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';
import { OrderManager } from '../../providers/app-controller/OrderManager';

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
  mAllOrders: Array<Orders> = [];


  mNumberDidEnter: number = 0;

  filter_text: string = "Đang phục vụ";
  mFilterId: number = 1;

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    this.mFilterId = 1;
  }

  doRefresh(refresher) {
    RestaurantSFSConnector.getInstance().getListOrder(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
    setTimeout(() => {
      refresher.complete();
    }, 2000);
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

  onLoadOrdersByFilter() {
    console.log("All orders", this.mAllOrders);
    
    this.mOrders = this.mAllOrders.filter(o => {
      return o.getStatus() == this.mFilterId;
    })

    console.log("orders", this.mOrders);

  }

  onResponseGetListOrder(params) {
    let array = params.array;
    this.mAllOrders = RestaurantClient.getInstance().onParseListOrder(array);
    OrderManager.getInstance().onResponseAllOrders(this.mAllOrders);

    let tables = RestaurantManager.getInstance().getTables();
    this.mAllOrders.forEach(element => {
      let index = tables.findIndex(table => {
        return table.getTable_id() == element.getTable_id();
      })

      if (index > -1) {
        element.getTables().fromObject(tables[index]);
      }
    });

    this.onLoadOrdersByFilter();
  }

  onClickAdd() {
    this.navCtrl.push("CreateOrderPage");
  }

  onClickOrderList() {
    let alert = this.mAppModule.getAlertController().create();
    alert.setTitle("Trạng thái order");

    alert.addInput({
      type: "radio",
      label: "Đang phục vụ",
      value: "1",
      checked: this.mFilterId == 1 ? true : false,
      handler: () => {
        this.mFilterId = 1;
        this.filter_text = "Đang phục vụ";
        this.onLoadOrdersByFilter();
        alert.dismiss();
      }
    })
    alert.addInput({
      type: "radio",
      label: "Đã thanh toán",
      value: "2",
      checked: this.mFilterId == 2 ? true : false,
      handler: () => {
        this.mFilterId = 2;
        this.filter_text = "Đã thanh toán";
        this.onLoadOrdersByFilter();
        alert.dismiss();
      }
    })
    alert.addInput({
      type: "radio",
      label: "Đã huỷ",
      value: "3",
      checked: this.mFilterId == 3 ? true : false,
      handler: () => {
        this.mFilterId = 3;
        this.filter_text = "Đã huỷ";
        this.onLoadOrdersByFilter();
        alert.dismiss();
      }
    })

    alert.present();
  }

}
