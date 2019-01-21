import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Floors } from '../../providers/class/Floors';
import { Tables } from '../../providers/class/Tables';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';
import { OrderManager } from '../../providers/app-controller/OrderManager';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';

/**
 * Generated class for the SelectTableToOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface TableModels{
  floor: Floors;
  tables: Array<Tables>;
}

@IonicPage()
@Component({
  selector: 'page-select-table-to-order',
  templateUrl: 'select-table-to-order.html',
})
export class SelectTableToOrderPage {
  order_id: string = "";

  mTables: Array<TableModels> = [];
  mTableSelected: Tables = new Tables();

  btn_text: string = "Tiếp tục";

  constructor(
    public mViewController: ViewController,
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.data["id"]){
      this.order_id = "Order #" + this.navParams.get("id");
      this.btn_text = "Lưu";
    }
    if(this.navParams.data["table_id"]){
      let table_id = this.navParams.get("table_id");
      let table = RestaurantManager.getInstance().getTableInfo(table_id);
      if(table){
        this.mTableSelected.fromObject(table);
      }
    }
    
  }

  ionViewDidLoad() {
    this.onLoadTables();

    RestaurantSFSConnector.getInstance().addListener("SelectTableToOrderPage",response=>{
      this.onExtions(response);
    })

    RestaurantSFSConnector.getInstance().getListTablesIsServe(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
  }

  ionViewWillUnload(){
    RestaurantSFSConnector.getInstance().removeListener("SelectTableToOrderPage");
  }

  onExtions(response){
    let cmd = response.cmd;
    let params = response.params;

    if(RestaurantClient.getInstance().doCheckStatusParams(params)){
      let database = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd,params);
      if(cmd == RestaurantCMD.GET_LIST_TABLE_IS_SERVE){
        this.onResponseGetListTableIsServe(database);
      }
    }else{
      this.mAppModule.showParamsMessage(params);
    }
  }

  onResponseGetListTableIsServe(database){
    let tables = RestaurantManager.getInstance().getTables();

    database.forEach(element => {
      for (let index = 0; index < tables.length; index++) {
        const _table = tables[index];
        if(_table.getTable_id() == element.getTable_id()){
          _table.setStatus(2);
          break;
        }
      }
    });

    this.onLoadTables();
   
  }

  onLoadTables(){
    let floors = RestaurantManager.getInstance().getFloors();
    let table = RestaurantManager.getInstance().getTables();

    this.mTables = [];

    floors.forEach(element => {
      this.mTables.push({
        floor: element,
        tables: table.filter(ta=>{
          return ta.getFloor_id() == element.getFloor_id();
        })
      });
    });
  }

  onClickContinue(){
    OrderManager.getInstance().getOrderSelected().order.setTable_id(this.mTableSelected.getTable_id());
    OrderManager.getInstance().getOrderSelected().order.getTables().fromObject(this.mTableSelected);
    this.mViewController.dismiss(this.mTableSelected);
  }

  onClickTable(table: Tables){
    if(table.getStatus() == 2){
      return;
    }
    this.mTableSelected = table;
  }

}
