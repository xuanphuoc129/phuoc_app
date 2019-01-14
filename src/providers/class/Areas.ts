import { Paramskey } from "../smartfox/Paramkeys";

export class Areas{
    private  area_id : number = - 1;
	private  name : string = "";
	private  type : number = - 1;
	private  status : number = - 1;
	private  floor_id : number = - 1;
    private  restaurant_id : number = - 1;
    
    constructor(){}

    public toSFSObject(o) {
		
		o.putInt(Paramskey.AREA_ID, this.getArea_id());
		o.putUtfString(Paramskey.NAME, this.getName());
		o.putInt(Paramskey.TYPE, this.getType());
		o.putInt(Paramskey.STATUS, this.getStatus());
		o.putInt(Paramskey.FLOOR_ID, this.getFloor_id());
		o.putInt(Paramskey.RESTAURANT_ID, this.getRestaurant_id());
		return o;
	}
	
	public  fromSFSObject(o) {
		if(o.containsKey(Paramskey.AREA_ID)) {
			this.setArea_id(o.getInt(Paramskey.AREA_ID));
		}
		if(o.containsKey(Paramskey.NAME)) {
			this.setName(o.getUtfString(Paramskey.NAME));
		}
		if(o.containsKey(Paramskey.TYPE)) {
			this.setType(o.getInt(Paramskey.TYPE));
		}
		if(o.containsKey(Paramskey.STATUS)) {
			this.setStatus(o.getInt(Paramskey.STATUS));
		}
		if(o.containsKey(Paramskey.FLOOR_ID)) {
			this.setFloor_id(o.getInt(Paramskey.FLOOR_ID));
		}
		if(o.containsKey(Paramskey.RESTAURANT_ID)) {
			this.setRestaurant_id(o.getInt(Paramskey.RESTAURANT_ID));
		}
	}
	
	public  getArea_id() {
		return this.area_id;
	}
	
	public  setArea_id( area_id) {
		this.area_id = area_id;
	}

	public  getName() {
		return this.name;
	}

	public  setName( name) {
		this.name = name;
	}

	public  getType() {
		return this.type;
	}

	public  setType( type) {
		this.type = type;
	}

	public  getStatus() {
		return this.status;
	}

	public  setStatus( status) {
		this.status = status;
	}

	public  getFloor_id() {
		return this.floor_id;
	}

	public  setFloor_id( floor_id) {
		this.floor_id = floor_id;
	}

	public  getRestaurant_id() {
		return this.restaurant_id;
	}

	public  setRestaurant_id( restaurant_id) {
		this.restaurant_id = restaurant_id;
	}
}