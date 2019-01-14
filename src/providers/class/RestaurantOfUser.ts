import { Paramskey } from "../smartfox/Paramkeys";

export class RestaurantOfUser{
    private  userID : number = -1;
    private  status : number = -1;
    private restaurant_id : number = -1;
    private name: string = "";
    private role: number = -1;

    constructor(){

    }

    public getRestaurant_id() {
		return this.restaurant_id;
	}

	public  setRestaurant_id( restaurant_id) {
		this.restaurant_id = restaurant_id;
	}
	

	public  fromSFSObject( o) {
		if(o.containsKey(Paramskey.NAME)) {
			this.setName(o.getUtfString(Paramskey.NAME));
		}
		if(o.containsKey(Paramskey.RESTAURANT_ID)) {
			this.setRestaurant_id(o.getInt(Paramskey.RESTAURANT_ID));
		}
		if(o.containsKey(Paramskey.STAFF_ID)) {
			this.setUserID(o.getInt(Paramskey.STAFF_ID));
        }
        if(o.containsKey(Paramskey.STATUS)) {
			this.setStatus(o.getInt(Paramskey.STATUS));
		}
		if(o.containsKey(Paramskey.ROLE)) {
			this.setRole(o.getInt(Paramskey.ROLE));
		}
    }

    public getRole() {
		return this.role;
	}

	public  setRole( role) {
		this.role = role;
	}
    
    public getName() {
		return this.name;
	}


	public  setName( name) {
		this.name = name;
	}


    public getStatus() {
		return this.status;
	}

	public  setStatus( status) {
		this.status = status;
    }
    
    public  getUserID() {
		return this.userID;
	}

	public  setUserID( userID) {
		this.userID = userID;
	}
}