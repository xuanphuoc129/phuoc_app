import { Orders } from "../class/Orders";
import { ProductModels } from "../../pages/select-food-to-order/select-food-to-order";
import { ProductInOrder } from "../class/ProductInOrder";

export class OrderManager{
    public static _instance: OrderManager = null;
    CREATE_ORDER = 1;
    EDIT_ORDER = 2;

    private mOrderNew: OrderModels = {order: new Orders(), products: []};
    private mOrderEdit: OrderEditModels = {};

    constructor(){

    }

    public getOrderEdit(){
        return this.mOrderEdit;
    }

    public getOrderSelected(){
        return this.mOrderNew;
    }

    public static getInstance() : OrderManager {
        if (this._instance == null) {
            this._instance = new OrderManager();
        }
        return this._instance;
    }
}

export interface OrderModels{
    order?: Orders;
    products?: Array<ProductModels>;
}

export interface OrderEditModels{
    order?: Orders;
    products?: Array<ProductInOrder>;
}