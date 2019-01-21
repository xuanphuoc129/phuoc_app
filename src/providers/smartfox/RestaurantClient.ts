import { SfsClientBaseExtension } from "../core/smartfox/sfs-client-extension";
import { RestaurantCMD } from "./RestaurantCMD";
import { RestaurantOfUser } from "../class/RestaurantOfUser";
import { Categories } from "../class/Categories";
import { Products } from "../class/Products";
import { Floors } from "../class/Floors";
import { Areas } from "../class/Areas";
import { Tables } from "../class/Tables";
import { Orders } from "../class/Orders";
import { ProductInOrder } from "../class/ProductInOrder";
import { Paramskey } from "./Paramkeys";

export class RestaurantClient extends SfsClientBaseExtension{
    public static _instance : RestaurantClient = null;

    constructor(){
        super();
    }

    public static getInstance(){
        if(this._instance == null){
            this._instance = new RestaurantClient();
        }
        return this._instance;
    }

    public doBaseDataWithCMDParams(cmd,params){
        if(cmd == RestaurantCMD.GET_RESTAURANT_OF_USER){
            return this.onParseGET_RESTAURANT_OF_USER(params);
        }
        else if(cmd == RestaurantCMD.CREATE_FLOOR){
            return this.doParseInfo(params);
        }
        else if(cmd == RestaurantCMD.CREATE_AREA){
            return this.doParseInfo(params);
        }
        else if(cmd == RestaurantCMD.CREATE_TABLE){
            return this.doParseInfo(params);
        }
        else if (cmd == RestaurantCMD.GET_LIST_CATEGORIES_IN_RESTAURANT) {
            return this.onParseGET_LIST_CATEGORIES_IN_RESTAURANT(params);
        } else if (cmd == RestaurantCMD.GET_PRODUCT_IN_RESTAURANT) {
            return this.onParseGET_PRODUCT_IN_RESTAURANT(params);
        } else if (cmd == RestaurantCMD.GET_LIST_FLOOR_IN_RESTAURANT) {
            return this.onParseGET_LIST_FLOOR_IN_RESTAURANT(params);
        } else if (cmd == RestaurantCMD.GET_LIST_AREA_IN_RESTAURANT) {
            return this.onParseGET_LIST_AREA_IN_RESTAURANT(params);
        } else if (cmd == RestaurantCMD.GET_LIST_TABLE_IN_RESTAURANT) {
            return this.onParseGET_LIST_TABLE_IN_RESTAURANT(params);
        }
        else if(cmd == RestaurantCMD.CREATE_ORDER){
            return this.doParseInfo(params);
        }
        else if(cmd == RestaurantCMD.ADD_PRODUCT_INTO_ORDER){
            return this.doParseUpdateFoodCookDoneParams(params);
        }
        else if(cmd == RestaurantCMD.GET_LIST_ORDER_TODAY){
            return this.doParseArrayExtensions(params);
        }
        else if(cmd == RestaurantCMD.GET_ORDER_INFO){
            return this.doParseInfo(params);
        }
        else if(cmd == RestaurantCMD.GET_PRODUCT_IN_ORDER){
            return this.doParseArrayExtensions(params);
        }
        else if(cmd == RestaurantCMD.GET_PRODUCT_IN_ORDER_COOKING_DONE){
            return this.doParseArrayExtensions(params);
        }
        else if(cmd == RestaurantCMD.GET_PRODUCT_IN_ORDER_YET){
            return this.doParseArrayExtensions(params);
        }
        else if(cmd == RestaurantCMD.GET_PRODUCT_IN_ORDER_COOKING){
            return this.doParseArrayExtensions(params);
        }
        else if(cmd == RestaurantCMD.UPDATE_PRODUCT_IN_ORDER){
            return this.doParseInfo(params);
        }
        else if(cmd == RestaurantCMD.UPDATE_ORDER_INFO){
            return this.doParseInfo(params);
        }
        else if(cmd == RestaurantCMD.REMOVE_ORDER){
            return this.doParseInfo(params);
        }
        else if(cmd == RestaurantCMD.GET_STAFF_INFO){
            return this.doParseInfo(params);
        }
        else if(cmd == RestaurantCMD.UPDATE_FOOD_COOK_DONE){
            return this.doParseUpdateFoodCookDoneParams(params);
        }
        else if(cmd == RestaurantCMD.ON_NEW_FOOD_ORDER){
            return this.doParseUpdateFoodCookDoneParams(params);
        }
        else if(cmd == RestaurantCMD.UPDATE_FOOD_AMOUNT){
            return this.doParseInfo(params);
        }
        else if(cmd == RestaurantCMD.GET_LIST_TABLE_IS_SERVE){
            return this.onParseGET_LIST_TABLE_IN_RESTAURANT(params);
        }
       
    }

    public doParseUpdateFoodCookDoneParams(params){
        let content = params.getSFSObject(Paramskey.CONTENT);
        let total = content.getInt(Paramskey.TOTAL);
        return {total: total, content: content};
    }


    public onParseGET_LIST_CATEGORIES_IN_RESTAURANT(params){
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if(array){
            for(let i = 0;i < array.size(); i++){
                let sfs = array.getSFSObject(i);
                let newRes = new Categories();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

     public onParseListOrder(array){
        let res = [];
        if(array){
            for(let i = 0;i < array.size(); i++){
                let sfs = array.getSFSObject(i);
                let newRes = new Orders();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

    public onParseProductInOrder(array){
        let res = [];
        if(array){
            for(let i = 0;i < array.size(); i++){
                let sfs = array.getSFSObject(i);
                let newRes = new ProductInOrder();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }


    public onParseGET_PRODUCT_IN_RESTAURANT(params){
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if(array){
            for(let i = 0;i < array.size(); i++){
                let sfs = array.getSFSObject(i);
                let newRes = new Products();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

    public onParseGET_LIST_FLOOR_IN_RESTAURANT(params){
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if(array){
            for(let i = 0;i < array.size(); i++){
                let sfs = array.getSFSObject(i);
                let newRes = new Floors();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

    public onParseGET_LIST_AREA_IN_RESTAURANT(params){
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if(array){
            for(let i = 0;i < array.size(); i++){
                let sfs = array.getSFSObject(i);
                let newRes = new Areas();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

    public onParseGET_LIST_TABLE_IN_RESTAURANT(params){
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if(array){
            for(let i = 0;i < array.size(); i++){
                let sfs = array.getSFSObject(i);
                let newRes = new Tables();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

    public onParseGET_RESTAURANT_OF_USER(params){
        let data = this.doParseArrayExtensions(params);
        let array = data.array;
        let res = [];
        if(array){
            for(let i = 0;i < array.size(); i++){
                let sfs = array.getSFSObject(i);
                let newRes = new RestaurantOfUser();
                newRes.fromSFSObject(sfs);
                res.push(newRes);
            }
        }
        return res;
    }

    

    // public onParseGET_PRODUCT_IN_RESTAURANT(params){
    //     let data = this.doParseArrayExtensions(params);
    //     let array = data.array;
    //     let res = [];
    //     if(array){
    //         for(let i = 0;i < array.size(); i++){
    //             let sfs = array.getSFSObject(i);
    //             let newRes = new RestaurantOfUser();
    //             newRes.fromSFSObject(sfs);
    //             res.push(newRes);
    //         }
    //     }
    //     return res;

    // }
}