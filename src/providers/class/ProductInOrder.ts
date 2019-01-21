import { Paramskey } from "../smartfox/Paramkeys";
import { ProductModels } from "../../pages/select-food-to-order/select-food-to-order";

export class ProductInOrder{
    private  order_id : number = -1;
	private  product_id : number = -1;
	private  quantity : number = -1;
	private  status : number = -1;
	private  amount : number = 0;
    private  total_money : number = 0;
	private  name : string = "";

	private  cooking_number : number = 0;
	private  cook_done : number = 0;
	private  table_id: number = -1;
	private  restaurant_id : number = -1;

	private time_update: number = -1;

    constructor(){

	}

	

	public getTime_update() : number {
		return this.time_update;
	}

	public setTime_update(time_update : number) {
		this.time_update = time_update;
	}


	public getRestaurant_id() {
		return this.restaurant_id;
	}

	public  setRestaurant_id( restaurant_id) {
		this.restaurant_id = restaurant_id;
	}
	

	public getNeedCookNumber(){
		return this.quantity - this.amount - this.cook_done - this.cooking_number;
	}
	
	public fromProductInModels(product: ProductModels){
		this.product_id = product.product.getProduct_id();
		this.quantity = product.quantity;
		this.total_money = product.product.getPrice() * this.quantity;
		this.status = 1;
	}

    public  toSFSObject(o) {
		o.putInt(Paramskey.PRODUCT_ID, this.getProduct_id());
		o.putInt(Paramskey.ORDER_ID, this.getOrder_id());
		o.putInt(Paramskey.QUANTITY, this.getQuantity());
		o.putInt(Paramskey.AMOUNT, this.getAmount());
		o.putInt(Paramskey.STATUS, this.getStatus());
		o.putDouble(Paramskey.TOTAL_MONEY, this.getTotal_money());
		o.putInt(Paramskey.COOKING_NUMBER, this.getCooking_number());
		o.putInt(Paramskey.COOK_DONE, this.getCook_done());
		o.putInt(Paramskey.TABLE_ID, this.getTable_id());
		o.putInt(Paramskey.RESTAURANT_ID, this.getRestaurant_id());
		return o;
	}
	
	public  fromSFSObject( o) {
		
		if(o.containsKey(Paramskey.PRODUCT_ID)) {
			this.setProduct_id(o.getInt(Paramskey.PRODUCT_ID));
		}
		
		if(o.containsKey(Paramskey.ORDER_ID)) {
			this.setOrder_id(o.getInt(Paramskey.ORDER_ID));
		}
		
		if(o.containsKey(Paramskey.QUANTITY)) {
			this.setQuantity(o.getInt(Paramskey.QUANTITY));
		}
		
		if(o.containsKey(Paramskey.AMOUNT)) {
			this.setAmount(o.getInt(Paramskey.AMOUNT));
		}
		
		if(o.containsKey(Paramskey.STATUS)) {
			this.setStatus(o.getInt(Paramskey.STATUS));
		}
		
		if(o.containsKey(Paramskey.TOTAL_MONEY)) {
			this.setTotal_money(o.getDouble(Paramskey.TOTAL_MONEY));
		}

		if(o.containsKey(Paramskey.NAME)) {
			this.setName(o.getUtfString(Paramskey.NAME));
		}

		if(o.containsKey(Paramskey.COOKING_NUMBER)) {
			this.setCooking_number(o.getInt(Paramskey.COOKING_NUMBER));
		}
		if(o.containsKey(Paramskey.COOK_DONE)) {
			this.setCook_done(o.getInt(Paramskey.COOK_DONE));
		}
		if (o.containsKey(Paramskey.TABLE_ID)) {
            this.setTable_id(o.getInt(Paramskey.TABLE_ID));
		}
		
		if(o.containsKey(Paramskey.RESTAURANT_ID)) {
			this.setRestaurant_id(o.getInt(Paramskey.RESTAURANT_ID));
		}

		if(o.containsKey(Paramskey.TIME_UPDATE)) {
			this.setTime_update(o.getLong(Paramskey.TIME_UPDATE));
		}
	}


	public getTable_id() {
        return this.table_id;
    }


    public setTable_id(table_id) {
        this.table_id = table_id;
    }

	public  getCooking_number() {
		return this.cooking_number;
	}

	public  setCooking_number( cooking_number) {
		this.cooking_number = cooking_number;
	}

	public  getCook_done() {
		return this.cook_done;
	}

	public  setCook_done( cook_done) {
		this.cook_done = cook_done;
	}

	public  getName() {
		return this.name;
	}

	public  setName( name) {
		this.name = name;
	}

    public  getOrder_id() {
		return this.order_id;
	}

	public  setOrder_id( order_id) {
		this.order_id = order_id;
	}

	public  getProduct_id() {
		return this.product_id;
	}

	public  setProduct_id( product_id) {
		this.product_id = product_id;
	}

	public  getQuantity() {
		return this.quantity;
	}

	public  setQuantity( quantity) {
		this.quantity = quantity;
	}

	public  getStatus() {
		return this.status;
	}

	public  setStatus( status) {
		this.status = status;
	}

	public  getAmount() {
		return this.amount;
	}

	public  setAmount( amount) {
		this.amount = amount;
	}

	public  getTotal_money() {
		return this.total_money;
	}

	public  setTotal_money( total_money) {
		this.total_money = total_money;
	}
	
}