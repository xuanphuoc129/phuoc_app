import { Categories } from "../class/Categories";
import { Products } from "../class/Products";
import { Floors } from "../class/Floors";
import { Tables } from "../class/Tables";
import { Areas } from "../class/Areas";

export class RestaurantManager {
    public static _instance: RestaurantManager = null;
    mCategorys: Array<Categories> = [];
    mProducts: Array<Products> = [];
    mFloors: Array<Floors> = [];
    mTables: Array<Tables> = [];
    mAreas: Array<Areas> = [];

    constructor() {

    }

    public getFloorInfo(floor_id: number){
        if(this.mFloors.length > 0){
            for (const floor of this.mFloors) {
                if(floor.getFloor_id() == floor_id){
                    return floor;
                }
            }
        }
        return new Floors();
    }

    public getTableInfo(table_id: number){
        if(this.mTables.length > 0){
            for (const table of this.mTables) {
                if(table.getTable_id() == table_id){
                    return table;
                }
            }
        }
        return new Tables();
    }

    public getAreaInfo(area_id: number){
        if(this.mAreas.length > 0){
            for (const area of this.mAreas) {
                if(area.getArea_id() == area_id){
                    return area;
                }
            }
        }
        return new Areas();
    }

    public getProductInfo(product_id: number){
        if(this.mProducts.length > 0){
            for (const product of this.mProducts) {
                if(product.getProduct_id() == product_id){
                    return product;
                }
            }
        }
        return new Products();
    }

    public getCategoryInfo(category_id: number){
        if(this.mCategorys.length > 0){
            for (const category of this.mCategorys) {
                if(category.getCategory_id() == category_id){
                    return category;
                }
            }
        }
        return new Categories();
    }

    public getFloors() {
        return this.mFloors;
    }
    public getAreas() {
        return this.mAreas;
    }
    public getTables() {
        return this.mTables;
    }
    public getProducts() {
        return this.mProducts;
    }
    public getCategorys() {
        return this.mCategorys;
    }

    public setCategors(params) {
        this.mCategorys = params;
    }
    public setProducts(params) {
        this.mProducts = params;
    }
    public setFloors(params) {
        this.mFloors = params;
    }
    public setTables(params) {
        this.mTables = params;
    }
    public setAreas(params) {
        this.mAreas = params;
    }

    public static getInstance() {
        if (this._instance == null) {
            this._instance = new RestaurantManager();
        }
        return this._instance;
    }

}