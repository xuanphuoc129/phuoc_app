import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { ProductInOrder } from '../../providers/class/ProductInOrder';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';

/**
 * Generated class for the ChefServePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chef-serve',
  templateUrl: 'chef-serve.html',
})
export class ChefServePage {
  segments: Array<{ id: number, name: string }> = [];
  segmentID: number = 1;

  mProductsCooking: Array<ProductInOrder> = [];
  mProductsNeedCook: Array<ProductInOrder> = [];

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  doRefresh(refresher) {
    this.onLoadData();      
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  onLoadData(){
    RestaurantSFSConnector.getInstance().getListProductInOrderCooking(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
    RestaurantSFSConnector.getInstance().getListProductInOrderNeed(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
  }


  ionViewDidLoad() {
    if(!this.mAppModule.isLogin){
      this.mAppModule.goToLoadingPage();
      return;
    }

    this.segments = [
      { id: 1, name: "Chưa chế biến" },
      { id: 2, name: "Đang chế biến" }
    ];
    this.mAppModule._loadAppConfig().then(() => {
      RestaurantSFSConnector.getInstance().addListener("ChefServePage", response => {
        this.onExtension(response);
      })
      this.onLoadData();      
    })
  }

  ionViewWillUnload() {
    RestaurantSFSConnector.getInstance().removeListener("ChefServePage");
  }

  onClickSegment(item) {
    this.segmentID = item.id;
  }


  onExtension(response) {
    this.mAppModule.hideLoading();

    let cmd = response.cmd;
    let params = response.params;

    if (RestaurantClient.getInstance().doCheckStatusParams(params)) {
      let database = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd, params);
      if (cmd == RestaurantCMD.GET_PRODUCT_IN_ORDER_COOKING) {
        this.onResponseGetProductCooking(database);
      } else if (cmd == RestaurantCMD.GET_PRODUCT_IN_ORDER_YET) {
        this.onResponseGetProductNeedCook(database);
      } else if (cmd == RestaurantCMD.UPDATE_FOOD_COOKING) {
        this.onUpdateProductInOrderSuccess(params);
      } else if (cmd == RestaurantCMD.UPDATE_FOOD_COOK_DONE) {
        this.onUpdateProductInOrderSuccess(params);
      }
      else if (cmd == RestaurantCMD.ON_NEW_FOOD_ORDER){
        this.mAppModule.showToast("New food update");
        this.onLoadData();
      }
    } else {
      this.mAppModule.showParamsMessage(params);
    }
  }

  onUpdateProductInOrderSuccess(database) {
    this.mAppModule.showToast("Thao tác thành công");
    this.onLoadData();
  }

  onResponseGetProductNeedCook(database) {
    this.mProductsNeedCook = RestaurantClient.getInstance().onParseProductInOrder(database.array);
    this.mProductsNeedCook.forEach(element => {
      let p = RestaurantManager.getInstance().getProductInfo(element.getProduct_id());
      element.setName(p.getName());
    });
  }

  onResponseGetProductCooking(database) {
    this.mProductsCooking = RestaurantClient.getInstance().onParseProductInOrder(database.array);
    this.mProductsCooking.forEach(element => {
      let p = RestaurantManager.getInstance().getProductInfo(element.getProduct_id());
      element.setName(p.getName());
    });
  }

  onClickItem(item: ProductInOrder) {
    let alert = this.mAppModule.getAlertController().create();
    alert.setTitle("Nhập số lượng");
    alert.addInput({
      placeholder: "Nhập số lượng muốn chế biến",
      name: "quantity",
      value: item.getNeedCookNumber() + ""
    });
    alert.addButton({
      text: "Ok",
      handler: data => {
        let quantity = parseInt(data.quantity);
        if (quantity > item.getNeedCookNumber()) {
          this.mAppModule.showToast("Số lượng chế biến vượt quá giới hạn");
        } else {
          let cooking = item.getCooking_number();
          item.setCooking_number(cooking + quantity);
          this.mAppModule.showLoading();
          RestaurantSFSConnector.getInstance().updateFoodCooking(item);
        }
      }
    });
    alert.present();
  }

  onClickItemReturn(item: ProductInOrder){
    let alert = this.mAppModule.getAlertController().create();
    alert.setTitle("Nhập số lượng");
    alert.addInput({
      placeholder: "Nhập số lượng muốn trả",
      name: "quantity",
      value: item.getCooking_number() + ""
    });
    alert.addButton({
      text: "Ok",
      handler: data => {
        let quantity = parseInt(data.quantity);
        if (quantity > item.getCooking_number()) {
          this.mAppModule.showToast("Số lượng trả vượt quá giới hạn");
        } else {
          let cooking = item.getCooking_number();
          item.setCooking_number(cooking - quantity);
          let done = item.getCook_done();
          item.setCook_done(quantity + done);
          this.mAppModule.showLoading();
          RestaurantSFSConnector.getInstance().updateFoodCookDone(item);
        }
      }
    });
    alert.present();
  }
}
