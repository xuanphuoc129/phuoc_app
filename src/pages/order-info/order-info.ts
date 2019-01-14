import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Orders } from '../../providers/class/Orders';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';
import { ProductInOrder } from '../../providers/class/ProductInOrder';
import { OrderManager } from '../../providers/app-controller/OrderManager';
import { ProductModels } from '../select-food-to-order/select-food-to-order';
import { Tables } from '../../providers/class/Tables';

/**
 * Generated class for the OrderInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-info',
  templateUrl: 'order-info.html',
})
export class OrderInfoPage {

  mOrder: Orders = new Orders();
  mType: number = -1;

  products: Array<ProductInOrder> = [];

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.data["id"]) {
      this.mOrder.setOrder_id(this.navParams.get("id"));
    }

  }

  ionViewDidLoad() {

    if (!this.mAppModule.isLogin) {
      this.navCtrl.setRoot("LoadingPage");
    }

    RestaurantSFSConnector.getInstance().addListener("OrderInfoPage", response => {
      this.onExtensions(response);
    })

    RestaurantSFSConnector.getInstance().getListProductInOrder(this.mOrder.getOrder_id());
    RestaurantSFSConnector.getInstance().getOrderInfo(this.mOrder.getOrder_id());

  }

  ionViewWillUnload() {
    RestaurantSFSConnector.getInstance().removeListener("OrderInfoPage");
  }

  onExtensions(response) {
    this.mAppModule.hideLoading();

    let cmd = response.cmd;
    let params = response.params;

    if (RestaurantClient.getInstance().doCheckStatusParams(params)) {
      let database = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd, params);

      if (cmd == RestaurantCMD.GET_ORDER_INFO) {
        this.onResponseGetOrderInfo(database);
      } else if (cmd == RestaurantCMD.GET_PRODUCT_IN_ORDER) {
        this.onResponseOrderInProduct(database);
      } else if (cmd == RestaurantCMD.REMOVE_ORDER) {
        this.onResponseRemoveOrder(params);
      } else if (cmd == RestaurantCMD.UPDATE_ORDER_INFO){
        this.onResponseUpdateOrderInfo();
      }

    } else {
      this.mAppModule.showParamsMessage(params);
    }
  }

  onResponseUpdateOrderInfo(){
    this.mAppModule.showToast("Thao tác thành công");
    RestaurantSFSConnector.getInstance().getOrderInfo(this.mOrder.getOrder_id());
  }

  onResponseRemoveOrder(params) {
    this.mAppModule.showToast("Thao tác thành công");
    this.navCtrl.pop();
  }

  onResponseGetOrderInfo(database) {
    this.mOrder.fromSFSObject(database.info);
    let tables = RestaurantManager.getInstance().getTables();
    let index = tables.findIndex(table => {
      return table.getTable_id() == this.mOrder.getTable_id();
    })

    if (index > -1) {
      this.mOrder.getTables().fromObject(tables[index]);
    }

  }

  onResponseOrderInProduct(database) {
    this.products = RestaurantClient.getInstance().onParseProductInOrder(database.array);
  }

  onClickDelete() {
    if(this.mOrder.getStatus() != 1)return;

    let index = this.products.findIndex(p => {
      return p.getAmount() > 0;
    })
    if (index > -1) {
      this.mAppModule.showToast("Order hiện tại không thể xoá");
    }else{
      let alert = this.mAppModule.getAlertController().create();
      alert.setTitle("Thông báo");
      alert.setMessage("Bạn muốn xoá order hiện tại ?");
      alert.addButton("Huỷ");
      alert.addButton({
        text: "Xoá",
        handler: () => {
          this.doDeleteOrder();
        }
      })
      alert.present();
    }

  }

  doDeleteOrder() {

    this.mAppModule.showLoading();
    RestaurantSFSConnector.getInstance().removeOrder(this.mOrder.getOrder_id());

  }

  onClickCheck() {
    if(this.mOrder.getStatus() != 1)return;
    this.mAppModule.showModal("CheckOrderPage",{id: this.mOrder.getOrder_id()});
  }

  onClickMoney() {
    if(this.mOrder.getStatus() != 1)return;

  }

  onClickNumberCustomer(){
    if(this.mOrder.getStatus() != 1)return;

    let alert = this.mAppModule.getAlertController().create();
    alert.setTitle("Chỉnh sửa số lượng khách");
    alert.addInput({
      type: "number",
      name: "numberCustomer",
      value: this.mOrder.getNumber_customer()+""
    });
    alert.addButton({
      text: "Lưu",
      handler: data=>{
        let newNumber = parseInt(data.numberCustomer);
        if(newNumber > 0 && newNumber != this.mOrder.getNumber_customer()){
          this.mOrder.setNumber_customer(newNumber);
          this.mAppModule.showLoading();
          RestaurantSFSConnector.getInstance().updateOrderInfo(this.mOrder);
        }
      }
    })
    alert.present();
  }

  onClickTable(){
    if(this.mOrder.getStatus() != 1)return;

    this.mAppModule.showModal("SelectTableToOrderPage",{id: this.mOrder.getOrder_id(), table_id: this.mOrder.getTable_id()},(table: Tables)=>{
      if(table){
        this.mOrder.setTable_id(table.getTable_id());
        RestaurantSFSConnector.getInstance().updateOrderInfo(this.mOrder);
      }
    })
  }

  onClickAddFood(){
    if(this.mOrder.getStatus() != 1)return;

    this.mAppModule.showModal("SelectFoodToOrderPage",{id: this.mOrder.getOrder_id(), type: 1},(data)=>{
      if(data){
        RestaurantSFSConnector.getInstance().getListProductInOrder(this.mOrder.getOrder_id());
      }
    });
  }

  onClickAllOrders(){
    
    let orders = OrderManager.getInstance().getAllOrders();
    let array = [];
    orders.forEach(element => {
        array.push({
          name: "Order #" + element.getOrder_id(),
          id: element.getOrder_id()
        });
    });

    this.mAppModule.showRadio("Chọn order", array,this.mOrder.getOrder_id(),(id)=>{
      if(id){
        this.mAppModule.showLoading();
        this.mOrder.setOrder_id(parseInt(id));
        RestaurantSFSConnector.getInstance().getListProductInOrder(this.mOrder.getOrder_id());
        RestaurantSFSConnector.getInstance().getOrderInfo(this.mOrder.getOrder_id());
      }
    })
  }

}
