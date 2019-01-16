import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { UserData } from '../../providers/class/UserData';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {
  mUserData: UserData = new UserData();

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
      // this.mAppModule.getStorageController().clearAllData();
  }

  ionViewDidEnter() {
    this.mAppModule._loadAppConfig().then(()=>{
      this.onLoadConfigDone();
    })
  }

  onLoadConfigDone(){
    this.mAppModule.onLoadUserLogin().then((data: any)=>{
      if(data){
        this.mUserData.parseData(data);
        this.doConnectToSmartfox();
      }else{
        this.navCtrl.setRoot("LoginPage");
      }
    }).catch((err)=>{
      this.navCtrl.setRoot("LoginPage");
    })
  }

  doConnectToSmartfox(){
    RestaurantSFSConnector.getInstance().connect().then(()=>{
      this.onConnectSucess();
    }).catch((err)=>{
      alert("Cant connect to server");
    })
  }

  onConnectSucess(){
    RestaurantSFSConnector.getInstance().doLogin(this.mUserData).then((params)=>{
      this.onLoginSuccess(params);
    }).catch((err)=>{
      alert("Login fail");
    })
  }
  

  onLoginSuccess(params){
    this.mAppModule.onLoginSuccess(params);
  }

}
