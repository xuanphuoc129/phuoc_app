import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { UserData } from '../../providers/class/UserData';
import { Paramskey } from '../../providers/smartfox/Paramkeys';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string = "";
  password: string = "";


  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.mAppModule._loadAppConfig().then(()=>{
      
    })
  }

  doConnectToServer(){
    RestaurantSFSConnector.getInstance().connect().then(()=>{
      this.onConnectSuccess();
    })
  }

  onConnectSuccess(){
    this.mAppModule.getUserData().setUsername(this.username);
    this.mAppModule.getUserData().setPassword(this.password);
    
    RestaurantSFSConnector.getInstance().doLogin(this.mAppModule.getUserData()).then((success) => {
      this.onLoginSuccess(success);
    })
  }

  login() {
    this.doConnectToServer();
  }

  onLoginSuccess(success) {
    console.log("login success", success['data'].getDump());
    this.mAppModule.saveUserLoginData(this.mAppModule.getUserData());
    this.mAppModule.onLoginSuccess(success);
  }
 
}
