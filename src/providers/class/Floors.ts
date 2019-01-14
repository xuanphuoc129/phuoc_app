import { Paramskey } from "../smartfox/Paramkeys";

export class Floors{
    private  floor_id : number = -1;
	private  restaurant_id : number = -1;
    private  name : string = "";
    
    constructor(){
        
    }

    public toSFSObject(o) {
		o.putUtfString(Paramskey.NAME, this.getName());
		o.putInt(Paramskey.FLOOR_ID, this.getFloor_id());
		o.putInt(Paramskey.RESTAURANT_ID, this.getRestaurant_id());
		return o;
	}
	
	public fromSFSObject(o) {
		
		if(o.containsKey(Paramskey.NAME)) {
			this.setName(o.getUtfString(Paramskey.NAME));
		}
		
		if(o.containsKey(Paramskey.FLOOR_ID)) {
			this.setFloor_id(o.getInt(Paramskey.FLOOR_ID));
        }
        
		if(o.containsKey(Paramskey.RESTAURANT_ID)) {
			this.setRestaurant_id(o.getInt(Paramskey.RESTAURANT_ID));
		}
	}

	public  getFloor_id() {
		return this.floor_id;
	}

	public  setFloor_id( floor_id) {
		this.floor_id = floor_id;
	}

	public  getName() {
		return this.name;
	}

	public  setName( name) {
		this.name = name;
	}

	public  getRestaurant_id() {
		return this.restaurant_id;
	}

	public  setRestaurant_id( restaurant_id) {
		this.restaurant_id = restaurant_id;
	}
}