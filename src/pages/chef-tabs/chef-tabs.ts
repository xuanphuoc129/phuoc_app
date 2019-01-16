import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

}
