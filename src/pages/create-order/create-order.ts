import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Orders } from '../../providers/class/Orders';
import { ProductModels } from '../select-food-to-order/select-food-to-order';
import { OrderManager } from '../../providers/app-controller/OrderManager';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { ProductInOrder } from '../../providers/class/ProductInOrder';

/**
 * Generated class for the CreateOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-order',
  templateUrl: 'create-order.html',
})
export class CreateOrderPage {
  mOrder: Orders = new Orders();
  products: Array<ProductModels> = [];

  constructor(
    public mViewController: ViewController,
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    this.mAppModule.showModal("SelectFoodToOrderPage", null, (data) => {
      if (data) {
        this.products = OrderManager.getInstance().getOrderSelected().products;

        this.mAppModule.showModal("SelectTableToOrderPage", null, (data) => {
          if (data) {
            this.mOrder.setTable_id(OrderManager.getInstance().getOrderSelected().order.getTable_id());
            this.mOrder.getTables().fromObject(OrderManager.getInstance().getOrderSelected().order.getTables());
          }
        });
      } else {
        this.navCtrl.pop();
      }
    });

    this.mOrder.setRestaurant_id(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
  }

  ionViewDidLoad(){
    this.mAppModule._loadAppConfig().then(()=>{
      RestaurantSFSConnector.getInstance().addListener("CreateOrderPage",response=>{
        this.onExtension(response);
      })
    })
  }

  ionViewWillUnload(){
    RestaurantSFSConnector.getInstance().removeListener("CreateOrderPage");
  }

  onExtension(response){
    this.mAppModule.hideLoading();

    let cmd = response.cmd;
    let params = response.params;

    if(RestaurantClient.getInstance().doCheckStatusParams(params)){
      let database = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd,params);
      if(cmd == RestaurantCMD.CREATE_ORDER){
        this.onResponseCreateOrder(database);
      }else if(cmd == RestaurantCMD.ADD_PRODUCT_INTO_ORDER){
        this.onResponseAddProductInOrder(database);
      }
    }else{
      this.mAppModule.showParamsMessage(params);
    }
  }

  onResponseCreateOrder(database){
    this.mOrder.fromSFSObject(database.info);
    let array: Array<ProductInOrder> = [];
    this.products.forEach(element=>{
      let mProductInOrder = new ProductInOrder();
      mProductInOrder.fromProductInModels(element);
      mProductInOrder.setOrder_id(this.mOrder.getOrder_id());
      array.push(mProductInOrder);
    })
    this.mAppModule.showLoading();
    RestaurantSFSConnector.getInstance().addProductIntoOrder(array);
  }

  onResponseAddProductInOrder(database){
    this.mAppModule.showParamsMessage(database);
    this.mViewController.dismiss(1);
  }

  onClickProduct(quantity: number, product: ProductModels) {
    if (quantity == 0) {
      this.showAlert(product);
    } else {
      product.quantity = quantity;
    }
  }

  showAlert(product: ProductModels) {
    let alert = this.mAppModule.getAlertController().create();
    alert.setTitle("Notifications");
    alert.setMessage("Bạn muốn xoá sản phẩm này khỏi order?");
    alert.addButton(
      {
        text: "Không",
        handler: () => {
          this.mAppModule.getEventController().publish("cancel", product.product);
        }
      }
    );
    alert.addButton({
      text: "Xoá",
      handler: () => {
        let index = this.products.findIndex(pro => {
          return pro.product.getProduct_id() == product.product.getProduct_id();
        })

        if (index > -1) {
          this.products.splice(index, 1);
        }
      }
    })
    alert.present();
  }

  onClickCreateOrder(){
    this.mAppModule.showLoadingNoduration();
    let sum = 0;
    this.products.forEach(element => {
      sum+= element.product.getPrice() * element.quantity;
    });
    this.mOrder.setTotal_money(sum);
    this.mOrder.setStaff_created(this.mAppModule.getUser().getUserID());
    RestaurantSFSConnector.getInstance().createOrder(this.mOrder);
  }

  onClickNumberCustomer(){
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
        if(newNumber > 0){
          this.mOrder.setNumber_customer(newNumber);
        }
      }
    })
    alert.present();
  }

}
