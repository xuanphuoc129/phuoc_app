import { Users } from "./Users";
import { Paramskey } from "../smartfox/Paramkeys";

export class Staffs extends Users {
	private restaurant_id : number = -1;
	
	constructor(){
        super();
    }

	public getRestaurant_id() {
		return this.restaurant_id;
	}

	public  setRestaurant_id( restaurant_id) {
		this.restaurant_id = restaurant_id;
	}
	

	public  fromSFSObject( o) {
		super.fromSFSObject(o);
		if(o.containsKey(Paramskey.RESTAURANT_ID)) {
			this.setRestaurant_id(o.getInt(Paramskey.RESTAURANT_ID));
		}
		if(o.containsKey(Paramskey.STAFF_ID)) {
			this.setUserID(o.getInt(Paramskey.STAFF_ID));
		}
	}
	
}