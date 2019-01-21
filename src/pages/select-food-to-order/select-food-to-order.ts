import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Products } from '../../providers/class/Products';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';
import { Utils } from '../../providers/core/app/utils';
import { OrderManager } from '../../providers/app-controller/OrderManager';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { ProductInOrder } from '../../providers/class/ProductInOrder';
import { Orders } from '../../providers/class/Orders';

/**
 * Generated class for the SelectFoodToOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface ProductModels {
  product: Products;
  quantity: number;
}

@IonicPage()
@Component({
  selector: 'page-select-food-to-order',
  templateUrl: 'select-food-to-order.html',
})
export class SelectFoodToOrderPage {

  order_id: string = "";

  mProducts: Array<Products> = [];
  mProductsFilter: Array<Products> = [];

  searchQuery: string = "";

  mProductSelected: Array<ProductModels> = [];

  btn_text: string = "Tiếp tục";
  products: Array<ProductInOrder> = [];

  mNumberUpdate: number = 0;
  mNumberCreate: number = 0;

  mNewTotalMoney: number = 0;

  mOrder: Orders = new Orders();

  constructor(
    public mViewController: ViewController,
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.data["id"]){
      this.mOrder.setOrder_id(this.navParams.get("id"))
      this.order_id = "Order " + this.mOrder.getOrder_id();
      this.btn_text = "Lưu";
    }
  }

  ionViewDidLoad() {
    this.mProducts = RestaurantManager.getInstance().getProducts();
    this.mProductsFilter = RestaurantManager.getInstance().getProducts();


   if(this.mOrder.getOrder_id() > 0){
    RestaurantSFSConnector.getInstance().addListener("SelectFoodToOrderPage",response=>{
      this.onExtensions(response);
    })

    RestaurantSFSConnector.getInstance().getListProductInOrder(this.mOrder.getOrder_id());
    RestaurantSFSConnector.getInstance().getOrderInfo(this.mOrder.getOrder_id());

   }
  }

  ionViewWillUnload(){
    RestaurantSFSConnector.getInstance().removeListener("SelectFoodToOrderPage");
  }

  onExtensions(response){

    let cmd = response.cmd;
    let params = response.params;

    if(RestaurantClient.getInstance().doCheckStatusParams(params)){
      let database = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd,params);
      
      if(cmd == RestaurantCMD.GET_ORDER_INFO){
        this.onResponseGetOrderInfo(database);
      }
      else if(cmd == RestaurantCMD.GET_PRODUCT_IN_ORDER){
        this.onResponseOrderInProduct(database);
      }
      else if (cmd == RestaurantCMD.ADD_PRODUCT_INTO_ORDER){
        this.onResponseAddProductIntoOrder();
      }
      else if(cmd == RestaurantCMD.UPDATE_PRODUCT_IN_ORDER){
        this.onResponseUpdateProductInOrder();
      }
      else if(cmd == RestaurantCMD.UPDATE_ORDER_INFO){
        this.onResponseUpdateOrderInfo();
      }
    }else{
      this.mAppModule.hideLoading();
      this.mAppModule.showParamsMessage(params);
    }
  }

  onResponseGetOrderInfo(database){
    this.mOrder.fromSFSObject(database.info);
  }

  onResponseOrderInProduct(database){
    this.products = RestaurantClient.getInstance().onParseProductInOrder(database.array);
    // OrderManager.getInstance().getOrderEdit().products = this.products;
  }

  onResponseAddProductIntoOrder(){
    this.mNumberCreate--;
    this.onSuccess();
  }

  onResponseUpdateProductInOrder(){
    this.mNumberUpdate--;
    this.onSuccess();
  }

  onSuccess(){
    if(this.mNumberCreate == 0 && this.mNumberUpdate == 0){
      RestaurantSFSConnector.getInstance().updateOrderInfo(this.mOrder);
    }
  }

  onResponseUpdateOrderInfo(){
    this.mAppModule.hideLoading();
    this.mViewController.dismiss(1);
  }

  onSearch() {
    if (this.searchQuery.trim() != '') {
      this.mProducts = this.mProductsFilter.filter(product => {
        return Utils.bodauTiengViet(product.getName()).toLowerCase().includes(Utils.bodauTiengViet(this.searchQuery).toLowerCase()) || parseInt(this.searchQuery) == product.getProduct_id();
      })
    } else {
      this.mProducts = this.mProductsFilter;
    }
  }

  onClickProduct(quantity : number, product: Products){
    let index = this.mProductSelected.findIndex(pro=>{
      return pro.product.getProduct_id() == product.getProduct_id();
    })

    if(index > -1){
      if(quantity == 0){
        this.mProductSelected.splice(index,1);
      }else{
        this.mProductSelected[index].quantity = quantity;
      }
    }else{
      this.mProductSelected.push({
        product : product,
        quantity: quantity
      });
    }
  }

  onClickContinue(){
    if(!this.order_id){
      OrderManager.getInstance().getOrderSelected().products = this.mProductSelected;
      this.mViewController.dismiss(this.mProductSelected);
    }else{
      this.onMergeProductNew(this.mProductSelected);
    }
  }

  onMergeProductNew(data : Array<ProductModels>){
    this.mAppModule.showLoadingNoduration();

    let newProduct : Array<ProductInOrder> = [];
    let updateProduct : Array<ProductInOrder> = [];

    data.forEach(element => {
      let index = this.products.findIndex(product=>{
        return product.getProduct_id() == element.product.getProduct_id();
      })

      if(index > -1){

        let p = this.products[index];
        let _product = RestaurantManager.getInstance().getProductInfo(p.getProduct_id());
        p.setQuantity(p.getQuantity() + element.quantity);
        p.setTotal_money(_product.getPrice() * p.getQuantity());
        p.setRestaurant_id(this.mAppModule.getRestaurantOfUser().getRestaurant_id());

        updateProduct.push(p);
        this.mNumberUpdate++;

      }else{

        let newProductInOrder = new ProductInOrder();
        newProductInOrder.fromProductInModels(element);
        newProductInOrder.setOrder_id(this.mOrder.getOrder_id());
        newProductInOrder.setRestaurant_id(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
        newProduct.push(newProductInOrder);
        this.products.push(newProductInOrder);
      }

    });

   

    if(newProduct.length > 0){
      this.mNumberCreate = 1;
      RestaurantSFSConnector.getInstance().addProductIntoOrder(newProduct);
     
    }

    if(updateProduct.length > 0){
      updateProduct.forEach(p => {
        RestaurantSFSConnector.getInstance().updateProductInOrder(p);
        
      });
    }
    this.mNewTotalMoney = 0;
    this.products.forEach(p=>{
        this.mNewTotalMoney+= p.getTotal_money();
    })

    this.mOrder.setTotal_money(this.mNewTotalMoney);
    
  }

}
