import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root: string = "OrderPage";
  tab2Root: string = "ServePage";
  tab3Root: string = "UserPage";

  countCarItem: number = 0;

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  public onLoadFood(){
    RestaurantSFSConnector.getInstance().getListProductInOrderCookingDone(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
  }

  ionViewDidLoad() {
    RestaurantSFSConnector.getInstance().addListener("TabsPage",response=>{
      this.onExtensions(response);
    })
  }

  onExtensions(response){
    let cmd = response.cmd;
    let params = response.params;

    if(RestaurantClient.getInstance().doCheckStatusParams(params)){
      let data = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd,params);
      if(cmd == RestaurantCMD.ON_NEW_FOOD_ORDER){
        this.onLoadFood();
      }else if(cmd == RestaurantCMD.GET_PRODUCT_IN_ORDER_COOKING_DONE){
        let array = data.array;
        this.countCarItem = array.size();
      }
    }
    
  }

}
