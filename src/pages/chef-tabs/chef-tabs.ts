import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';

/**
 * Generated class for the ChefTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chef-tabs',
  templateUrl: 'chef-tabs.html',
})
export class ChefTabsPage {

  tab1Root: string = "ChefServePage";
  tab2Root: string = "ChefMenuPage";
  tab3Root: string = "UserPage";

  countCarItem: number = 0;

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  public onLoadFood(){
    RestaurantSFSConnector.getInstance().getListProductInOrderNeed(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
  }


  ionViewDidLoad() {
    // RestaurantSFSConnector.getInstance().addListener("ChefTabsPage",response=>{
    //   this.onExtensions(response);
    // })
  }

  onExtensions(response){
    let cmd = response.cmd;
    let params = response.params;

    if(RestaurantClient.getInstance().doCheckStatusParams(params)){
      let data = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd,params);
      if(cmd == RestaurantCMD.ON_NEW_FOOD_ORDER){
        this.onLoadFood();
      }else if(cmd == RestaurantCMD.GET_PRODUCT_IN_ORDER_YET){
        let array = data.array;
        this.countCarItem = array.size();
      }
    }
    
  }

}
