import { Paramskey } from "../smartfox/Paramkeys";
import { Tables } from "./Tables";

export class Orders {
    private order_id : number = -1;
    private restaurant_id : number = -1;
    private table_id : number = -1;
    private staff_create : number = -1;
    private status : number = -1;
    private staff_payment : number = -1;
    private customer_id : number = -1;

    private code = "";
    private total_money : number = 0;
    private time_created : number = -1;
    private time_payment : number = -1;

    private number_customer: number = 1;
    private mTable: Tables = new Tables();

    private time_serve: number = 0;

    constructor() { }

    

    public getNumber_customer() {
		return this.number_customer;
	}

	public setNumber_customer(number_customer) {
		this.number_customer = number_customer;
    }
    
    public getTables(): Tables{
        return this.mTable;
    }


    public  toSFSObject(o) {
		o.putInt(Paramskey.RESTAURANT_ID, this.getRestaurant_id());
		o.putInt(Paramskey.TABLE_ID, this.getTable_id());
		o.putInt(Paramskey.ORDER_ID, this.getOrder_id());
		if(this.getCustomer_id() > 0)o.putInt(Paramskey.CUSTOMER_ID, this.getCustomer_id());
		o.putInt(Paramskey.STAFF_CREATE, this.getStaff_created());
		if(this.getStaff_payment() > 0)o.putInt(Paramskey.STAFF_PAYMENT, this.getStaff_payment());
		o.putInt(Paramskey.STATUS, this.getStatus());
		o.putUtfString(Paramskey.CODE, this.getCode());
		o.putDouble(Paramskey.TOTAL_MONEY, this.getTotal_money());
		o.putLong(Paramskey.TIME_CREATED, this.getTime_created());
        if(this.getTime_payment() > 0)o.putLong(Paramskey.TIME_PAYMENT, this.getTime_payment());
        o.putInt(Paramskey.NUMBER_CUSTOMER, this.getNumber_customer());
		return o;
	}

    public fromSFSObject(o) {
        if (o.containsKey(Paramskey.TABLE_ID)) {
            this.setTable_id(o.getInt(Paramskey.TABLE_ID));
        }
        if(o.containsKey(Paramskey.NUMBER_CUSTOMER)) {
			this.setNumber_customer(o.getInt(Paramskey.NUMBER_CUSTOMER));
		}
        if (o.containsKey(Paramskey.RESTAURANT_ID)) {
            this.setRestaurant_id(o.getInt(Paramskey.RESTAURANT_ID));
        }
        if (o.containsKey(Paramskey.ORDER_ID)) {
            this.setOrder_id(o.getInt(Paramskey.ORDER_ID));
        }
        if (o.containsKey(Paramskey.STAFF_CREATE)) {
            this.setStaff_created(o.getInt(Paramskey.STAFF_CREATE));
        }
        if (o.containsKey(Paramskey.STAFF_PAYMENT)) {
            this.setStaff_payment(o.getInt(Paramskey.STAFF_PAYMENT));
        }
        if (o.containsKey(Paramskey.CUSTOMER_ID)) {
            this.setCustomer_id(o.getInt(Paramskey.CUSTOMER_ID));
        }
        if (o.containsKey(Paramskey.STATUS)) {
            this.setStatus(o.getInt(Paramskey.STATUS));
        }
        if (o.containsKey(Paramskey.CODE)) {
            this.setCode(o.getUtfString(Paramskey.CODE));
        }
        if (o.containsKey(Paramskey.TOTAL_MONEY)) {
            this.setTotal_money(o.getDouble(Paramskey.TOTAL_MONEY));
        }
        if (o.containsKey(Paramskey.TIME_CREATED)) {
            this.setTime_created(o.getLong(Paramskey.TIME_CREATED));
        }
        if (o.containsKey(Paramskey.TIME_PAYMENT)) {
            this.setTime_payment(o.getLong(Paramskey.TIME_PAYMENT));
        }
    }

    public getOrder_id() {
        return this.order_id;
    }

    public setOrder_id(order_id) {
        this.order_id = order_id;
    }

    public getCode() {
        return this.code;
    }

    public setCode(code) {
        this.code = code;
    }

    public getRestaurant_id() {
        return this.restaurant_id;
    }

    public setRestaurant_id(restaurant_id) {
        this.restaurant_id = restaurant_id;
    }

    public getTable_id() {
        return this.table_id;
    }

    public setTable_id(table_id) {
        this.table_id = table_id;
    }

    public getTotal_money() {
        return this.total_money;
    }

    public setTotal_money(total_money) {
        this.total_money = total_money;
    }

    public getStaff_created() {
        return this.staff_create;
    }

    public setStaff_created(staff_created) {
        this.staff_create = staff_created;
    }

    public getStatus() {
        return this.status;
    }

    public setStatus(status) {
        this.status = status;
    }

    public getStaff_payment() {
        return this.staff_payment;
    }

    public setStaff_payment(staff_payment) {
        this.staff_payment = staff_payment;
    }

    public getCustomer_id() {
        return this.customer_id;
    }

    public setCustomer_id(customer_id) {
        this.customer_id = customer_id;
    }

    public getTime_created() {
        return this.time_created;
    }

    public setTime_created(time_created) {
        this.time_created = time_created;
    }

    public getTime_payment() {
        return this.time_payment;
    }

    public setTime_payment(time_payment) {
        this.time_payment = time_payment;
    }

}