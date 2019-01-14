import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Config } from '../core/app/config';
import { RestaurantSFSConnector } from '../smartfox/SFSConnector';
import { StorageController } from '../core/storage';
import { Storage } from '@ionic/storage';
import { UserData } from '../class/UserData';
import { Users } from '../class/Users';
import { Paramskey } from '../smartfox/Paramkeys';
import { RestaurantClient } from '../smartfox/RestaurantClient';
import { ToastController, App, ModalController, AlertController, Events, Loading, LoadingController } from 'ionic-angular';
import { RestaurantCMD } from '../smartfox/RestaurantCMD';
import { RestaurantOfUser } from '../class/RestaurantOfUser';
import { Floors } from '../class/Floors';
import { Areas } from '../class/Areas';
import { Categories } from '../class/Categories';
import { Products } from '../class/Products';
import { RestaurantManager } from './RestaurantManager';
/*
  Generated class for the AppControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppControllerProvider {
  USERLOGIN: string = "userlogin";
  isLogin : boolean = false;
  private mAppConfig: Config;
  private mStorageController: StorageController;
  private mUserData: UserData = new UserData();

  private mUser: Users = new Users();
  private mRestaurantOfUser: Array<RestaurantOfUser> = [];

  mLoading: Loading;
  constructor(
    public mLoadingController: LoadingController,
    public mEventController: Events,
    public mAlertController: AlertController,
    public mModalController: ModalController,
    public mApp: App,
    public mToast: ToastController,
    public mStorage: Storage,
    public http: Http) {
    this.mAppConfig = new Config();
    this.mStorageController = new StorageController();
    this.mStorageController.setStorage(this.mStorage);
  }

  public showRadio(title: string, arrayInput: Array<{ id: any, name: string }>, idselected: any, callback: any) {
    let alert = this.mAlertController.create();
    alert.setTitle(title);
    arrayInput.forEach(element => {
      alert.addInput({
        type: 'radio',
        label: element.name,
        value: element.id + "",
        checked: element.id == idselected ? true : false
      })
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        callback(data);
      }
    });
    alert.present();
  }


  async showLoading(content?: string, cssClass?: string, duration?: number) {
    if (this.mLoading) {
      try {
        await this.mLoading.dismiss()
      } catch (error) { }
    }
    this.mLoading = this.mLoadingController.create({
      duration: duration ? duration : 3000,
      dismissOnPageChange: true,
      content: content ? content : "Waiting...!",
      cssClass: cssClass ? cssClass : ""
    });
    this.mLoading.present();
  }

  async showLoadingNoduration(content?: string, cssClass?: string) {
    if (this.mLoading) {
      try {
        await this.mLoading.dismiss()
      } catch (error) { }
    }
    this.mLoading = this.mLoadingController.create({
      dismissOnPageChange: true,
      content: content ? content : "Waiting...!",
      cssClass: cssClass ? cssClass : ""
    });
    this.mLoading.present();
  }


  public hideLoading(): void {
    if (this.mLoading) {
      this.mLoading.dismiss();
      this.mLoading = null;
    }
  }


  public getEventController(){
    return this.mEventController;
  }

  public getAlertController(){
    return this.mAlertController;
  }

  public showAlertCantConnectServer(){
    let alert = this.mAlertController.create();
    alert.setMessage("Không thể kết nối đến server");
    alert.addButton({
      text: "Thử lại",
      handler: ()=>{
        RestaurantSFSConnector.getInstance().connect().then(()=>{
          this.mApp.getRootNav().setRoot("LoadingPage");
        }).catch(err=>{
          this.showAlertCantConnectServer();
        })
      }
    });
    alert.present();
  }

  public showModal(page, params?: any,callback?:any) {
    let modal = this.mModalController.create(page, params ? params : null );
    modal.present();
    modal.onDidDismiss((data)=>{
      if(callback){
        callback(data);
      }
    })
  }

  public getRestaurantOfUser() {
    if (this.mRestaurantOfUser.length == 0) {
      return new RestaurantOfUser();
    }
    return this.mRestaurantOfUser[0];
  }

  public showToast(message, position?: string) {
    let toast = this.mToast.create({
      message: message,
      position: position ? position : "bottom",
      duration: 3000
    });

    toast.present();
  }

  public getUser(): Users {
    return this.mUser;
  }

  public getUserData() {
    return this.mUserData;
  }

  public getStorageController(): StorageController {
    return this.mStorageController;
  }

  public getAppConfig(): Config {
    return this.mAppConfig;
  }

  // public _loadMenuFromJson() {
  //   return new Promise((resolve, reject) => {
  //     this.http.get('./assets/data/thucdon.json').map(res => res.json()).subscribe(data => {
  //       if (data) {
  //         this.onLoadMenuJsonSuccess(data);
  //         resolve(data);
  //       } else {
  //         reject();
  //       }
  //     })
  //   })

  // }

  public _loadAppConfig() {
    return new Promise((resolve, reject) => {
      this.http.get('./assets/data/config.json').map(res => res.json()).subscribe(data => {
        if (data) {
          this.onResponeAppConfig(data);
          resolve(data);
        } else {
          reject();
        }
      })
    })

  }

  public onResponeAppConfig(data) {
    this.mAppConfig.setData(data);
    RestaurantSFSConnector.getInstance().setData(this.mAppConfig.get("smartfox"));
  }

  public onLoadUserLogin() {
    return new Promise((resolve, reject) => {
      this.mStorageController.getDataFromStorage(this.USERLOGIN).then((data) => {
        if (data) {
          this.mUserData.parseData(JSON.parse(data));
          resolve(this.mUserData);
        } else {
          reject();
        }
      }).catch(err => {
        reject();
      })
    })
  }

  public saveUserLoginData(data) {
    return this.mStorageController.saveDataToStorage(this.USERLOGIN, JSON.stringify(data));
  }

  public removeUserLoginData() {
    return this.mStorageController.removeKeyDataFromStorage(this.USERLOGIN);
  }

  public onLoginSuccess(params) {
    this.isLogin = true;
    let dataObject = params['data'].getSFSObject(Paramskey.CONTENT);
    let room_name = dataObject.getUtfString(Paramskey.ROOM_NAME);

    let user = dataObject.getSFSObject(Paramskey.USER);
    this.getUser().fromSFSObject(user);

    RestaurantSFSConnector.getInstance().requestJoinRoom(room_name).then(() => {
      this.onJoinRoomSuccess();
    }).catch(err => {
      alert(err);
    })
  }

  public onJoinRoomSuccess() {
    RestaurantSFSConnector.getInstance().addListenerForExtensionResponse();
    RestaurantSFSConnector.getInstance().addListener("AppControllerProvider", response => {
      this.onExtensionRespone(response);
    })
    RestaurantSFSConnector.getInstance().getRestaurantOfUser();
    
  }

  public onExtensionRespone(response) {
    let cmd = response.cmd;
    let params = response.params;

    if (RestaurantClient.getInstance().doCheckStatusParams(params)) {
      let dataBase = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd, params);
      if (cmd == RestaurantCMD.GET_RESTAURANT_OF_USER) {
        this.onGetRestaurantOfUser(dataBase);
      }else if (cmd == RestaurantCMD.GET_LIST_CATEGORIES_IN_RESTAURANT) {
        RestaurantManager.getInstance().setCategors(dataBase);
      } else if (cmd == RestaurantCMD.GET_PRODUCT_IN_RESTAURANT) {
        RestaurantManager.getInstance().setProducts(dataBase);
      } else if (cmd == RestaurantCMD.GET_LIST_FLOOR_IN_RESTAURANT) {
        RestaurantManager.getInstance().setFloors(dataBase);
      } else if (cmd == RestaurantCMD.GET_LIST_AREA_IN_RESTAURANT) {
        RestaurantManager.getInstance().setAreas(dataBase);
      } else if (cmd == RestaurantCMD.GET_LIST_TABLE_IN_RESTAURANT) {
        RestaurantManager.getInstance().setTables(dataBase);
      }
    } else {
      this.showToast(params.getUtfString(Paramskey.MESSAGE));
    }
  }

  public showParamsMessage(params){
    this.showToast(params.getUtfString(Paramskey.MESSAGE));
  }
  public onGetRestaurantOfUser(params){
    this.mRestaurantOfUser = params;
    RestaurantSFSConnector.getInstance().getListCategoryOfRestaurant(this.mRestaurantOfUser[0].getRestaurant_id());
    RestaurantSFSConnector.getInstance().getListProductOfRestaurant(this.mRestaurantOfUser[0].getRestaurant_id());
    RestaurantSFSConnector.getInstance().getListTableOfRestaurant(this.mRestaurantOfUser[0].getRestaurant_id());
    RestaurantSFSConnector.getInstance().getListAreaOfRestaurant(this.mRestaurantOfUser[0].getRestaurant_id());
    RestaurantSFSConnector.getInstance().getListFloorOfRestaurant(this.mRestaurantOfUser[0].getRestaurant_id());
  }

 

}
