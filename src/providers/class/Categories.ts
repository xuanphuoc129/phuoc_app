import { Paramskey } from "../smartfox/Paramkeys";

export class Categories{
    private  category_id : number = -1;
	private  name : string = "";
    private  icon : string = "";
    private  type : number = -1;
	private restaurant_id : number = -1;

    constructor(){}

    public toSFSObject(o) {
		o.putInt(Paramskey.CATEGORY_ID, this.getCategory_id());
		o.putUtfString(Paramskey.NAME, this.getName());
		o.putUtfString(Paramskey.ICON, this.getIcon());
		o.putInt(Paramskey.TYPE, parseInt(this.getType()+""));
		o.putInt(Paramskey.RESTAURANT_ID, this.getRestaurant_id());
		return o;
	}
	
	public  fromSFSObject(o) {
		if(o.containsKey(Paramskey.CATEGORY_ID)) {
			this.setCategory_id(o.getInt(Paramskey.CATEGORY_ID));
		}
		if(o.containsKey(Paramskey.NAME)) {
			this.setName(o.getUtfString(Paramskey.NAME));
		}
		if(o.containsKey(Paramskey.ICON)) {
			this.setIcon(o.getUtfString(Paramskey.ICON));
		}
		if(o.containsKey(Paramskey.TYPE)) {
			this.setType(o.getInt(Paramskey.TYPE));
		}
		if(o.containsKey(Paramskey.RESTAURANT_ID)) {
			this.setRestaurant_id(o.getInt(Paramskey.RESTAURANT_ID));
		}
	}

	public getRestaurant_id() {
		return this.restaurant_id;
	}

	public  setRestaurant_id( restaurant_id) {
		this.restaurant_id = restaurant_id;
	}
	

	public  getType() {
		return this.type;
	}

	public  setType(type: number) {
		this.type = type;
	}

	public  getCategory_id() {
		return this.category_id;
	}

	public  setCategory_id( category_id) {
		this.category_id = category_id;
	}

	public  getName() {
		return this.name;
	}

	public  setName( name) {
		this.name = name;
	}

	public  getIcon() {
		return this.icon;
	}

	public  setIcon( icon) {
		this.icon = icon;
	}
}