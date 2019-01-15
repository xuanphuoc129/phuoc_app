import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Users } from '../../providers/class/Users';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  mUser: Users = new Users();
  restaurant_name: string = "";
  items: Array<{ icon: string, name: string, page: string, color?: string }> = [];

  constructor(
    public mApp: App,
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    this.mUser = this.mAppModule.getUser();
    this.restaurant_name = this.mAppModule.getRestaurantOfUser().getName();

  }

  ionViewDidLoad() {
    this.items = [
      { name: "Điểm Danh", icon: "ios-log-in-outline", page: "", color: "green-bg" },
      { name: "Lịch Làm Việc", icon: "ios-calendar-outline", page: "", color: "blue-bg" },
      { name: "Tài liệu đào tạo nghiệp vụ nhà hàng", icon: "ios-link-outline", page: "", color: "lightblue-bg" },
      { name: "Báo cáo sự cố", icon: "ios-chatbubbles-outline", page: "",color: "orange-bg" },
      { name: "Cài đặt", icon: "ios-settings-outline", page: "", color: "gray-bg" },
      { name: "Đăng xuất", icon: "ios-power-outline", page: "",color: "red-bg" }
    ];
  }

  onClickItem(item,index){
    if(index == 5){
      this.mAppModule.logout().then(()=>{
        this.mAppModule.isLogin = false;
        RestaurantSFSConnector.getInstance()._Disconnect().then(()=>{
            this.mApp.getRootNav().setRoot("LoginPage");
        })
      })
    }
  }

}
