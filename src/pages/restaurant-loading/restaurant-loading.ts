import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Users } from '../../providers/class/Users';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Utils } from '../../providers/core/app/utils';
import { RestaurantOfUser } from '../../providers/class/RestaurantOfUser';

/**
 * Generated class for the RestaurantLoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurant-loading',
  templateUrl: 'restaurant-loading.html',
})
export class RestaurantLoadingPage {

  mUser: Users;
  restaurant: RestaurantOfUser;

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    this.mUser = this.mAppModule.getUser();
    this.restaurant = this.mAppModule.getRestaurantOfUser();
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.doTranslate();
      setTimeout(() => {
        let ele = document.getElementById("animatedID");
        if (ele) {
          ele.style.transform = "scaleX(1)";
        }
        setTimeout(() => {
          this.navCtrl.setRoot("TabsPage");
        }, 1000);
       
      }, 1200);
    }, 100);
  }

  doTranslate() {
    let number = Utils.randInt(20, 60);
    let ele = document.getElementById("animatedID");
    if (ele) {
      ele.style.transform = "scaleX(" + number * 0.01 + ")";
    }
  }

}
