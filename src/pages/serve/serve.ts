import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { ProductInOrder } from '../../providers/class/ProductInOrder';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';

/**
 * Generated class for the ServePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serve',
  templateUrl: 'serve.html',
})
export class ServePage {

  segments: Array<{ id: number, name: string }> = [];
  segmentID: number = 1;

  mProducts: Array<ProductInOrder> = [];

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  doRefresh(refresher) {
    RestaurantSFSConnector.getInstance().getListProductInOrderCookingDone(this.mAppModule.getRestaurantOfUser().getRestaurant_id());

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }


  ionViewDidLoad() {
    this.segments = [
      {id: 1, name: "Món ăn"},
      {id: 2, name: "Bàn"}
    ];
    this.mAppModule._loadAppConfig().then(() => {
      RestaurantSFSConnector.getInstance().addListener("ServePage", response => {
        this.onExtension(response);
      })
    })

    RestaurantSFSConnector.getInstance().getListProductInOrderCookingDone(this.mAppModule.getRestaurantOfUser().getRestaurant_id());

  }

  onExtension(response) {
    this.mAppModule.hideLoading();

    let cmd = response.cmd;
    let params = response.params;

    if (RestaurantClient.getInstance().doCheckStatusParams(params)) {
      let database = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd, params);
      if (cmd == RestaurantCMD.GET_PRODUCT_IN_ORDER_COOKING_DONE) {
        this.onResponseGetProductCookingDone(database);
      }else if(cmd == RestaurantCMD.UPDATE_PRODUCT_IN_ORDER){
        this.onResponseUpdateProductInOrder(database);
      }
    } else {
      this.mAppModule.showParamsMessage(params);
    }
  }

  onResponseUpdateProductInOrder(database){
    this.mAppModule.showToast("Thao tác thành công");

    let info = database.info;
    let p = new ProductInOrder();
    p.fromSFSObject(info);
    let index = this.mProducts.findIndex(prod=>{
      return prod.getProduct_id() == p.getProduct_id() && prod.getOrder_id() == p.getOrder_id();
    });

    if(index > -1){
      this.mProducts.splice(index,1);
    }
  }

  onResponseGetProductCookingDone(database){
    let array = database.array;
    this.mProducts = RestaurantClient.getInstance().onParseProductInOrder(array);

    this.mProducts.forEach(element => {
      let p = RestaurantManager.getInstance().getProductInfo(element.getProduct_id());
      element.setName(p.getName());
    });
  }


  ionViewWillUnload() {
    RestaurantSFSConnector.getInstance().removeListener("ServePage");
  }

  onClickSegment(item){
    this.segmentID = item.id;
  }

  onClickServe(item: ProductInOrder){
    this.mAppModule.showLoading();
    let amount = item.getCook_done();
    amount+=item.getCook_done();
    if(amount > item.getQuantity()){
      amount = item.getQuantity();
    }
    item.setAmount(amount);
    item.setCook_done(0);
    RestaurantSFSConnector.getInstance().updateProductInOrder(item);
  }

}
