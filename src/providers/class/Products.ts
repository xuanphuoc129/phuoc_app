import { Paramskey } from "../smartfox/Paramkeys";

export class Products{

    private  product_id : number = -1;
	private  status : number = -1;
	private  restaurant_id : number = -1;
	private  category_id : number = -1;
	private  area_id : number = -1;
	private  price : number = 0;
	private  name : string = "";
	private  description : string = "";
	private  thumnail : string = "";
	
	private  currency : string = "";
	private  unit : string = "";

	constructor(){}
	
	public fromJsonObject(o){
		this.name = o.name;
		this.currency = o.currency;
		this.unit = o.unit;
		this.price = parseInt(o.price);
		this.category_id = parseInt(o.category_id);
		this.area_id = parseInt(o.area_id);
		this.restaurant_id = parseInt(o.restaurant_id);
	}

    public  toSFSObject(o) {
		o.putInt(Paramskey.RESTAURANT_ID, this.getRestaurant_id());
		o.putInt(Paramskey.STATUS, this.getStatus());
		o.putInt(Paramskey.AREA_ID, this.getArea_id());
		o.putInt(Paramskey.CATEGORY_ID, this.getCategory_id());
		o.putInt(Paramskey.PRODUCT_ID, this.getProduct_id());
		
		o.putDouble(Paramskey.PRICE, this.getPrice());
		o.putUtfString(Paramskey.NAME, this.getName());
		o.putUtfString(Paramskey.THUMBNAIL, this.getThumnail());
		o.putUtfString(Paramskey.DESCRIPTION, this.getDescription());
		o.putUtfString(Paramskey.CURRENCY, this.currency);
		o.putUtfString(Paramskey.UNIT, this.unit);
		
		return o;
	}
	
	public  fromSFSObject( o) {
		if(o.containsKey(Paramskey.PRODUCT_ID)) {
			this.setProduct_id(o.getInt(Paramskey.PRODUCT_ID));
		}
		
		if(o.containsKey(Paramskey.RESTAURANT_ID)) {
			this.setRestaurant_id(o.getInt(Paramskey.RESTAURANT_ID));
		}
			
		if(o.containsKey(Paramskey.PRICE)) {
			this.setPrice(o.getDouble(Paramskey.PRICE));
		}
		
		if(o.containsKey(Paramskey.AREA_ID)) {
			this.setArea_id(o.getInt(Paramskey.AREA_ID));
		}
		
		if(o.containsKey(Paramskey.STATUS)) {
			this.setStatus(o.getInt(Paramskey.STATUS));
		}
		
		if(o.containsKey(Paramskey.CATEGORY_ID)) {
			this.setCategory_id(o.getInt(Paramskey.CATEGORY_ID));
		}
		
		if(o.containsKey(Paramskey.NAME)) {
			this.setName(o.getUtfString(Paramskey.NAME));
		}
		
		if(o.containsKey(Paramskey.DESCRIPTION)) {
			this.setDescription(o.getUtfString(Paramskey.DESCRIPTION));
		}
		
		if(o.containsKey(Paramskey.THUMBNAIL)) {
			this.setThumnail(o.getUtfString(Paramskey.THUMBNAIL));
		}
		if(o.containsKey(Paramskey.CURRENCY)) {
			this.setCurrency(o.getUtfString(Paramskey.CURRENCY));
		}
		if(o.containsKey(Paramskey.UNIT)) {
			this.setUnit(o.getUtfString(Paramskey.UNIT));
		}
	}

	public getCurrency() {
		return this.currency;
	}

	public  setCurrency(currency) {
		this.currency = currency;
	}

	public getUnit() {
		return this.unit;
	}

	public  setUnit(unit) {
		this.unit = unit;
	}

	
	

	public  getProduct_id() {
		return this.product_id;
	}

	public  setProduct_id( product_id) {
		this.product_id = product_id;
	}

	public  getName() {
		return this.name;
	}

	public  setName( name) {
		this.name = name;
	}

	public  getPrice() {
		return this.price;
	}

	public  setPrice( price) {
		this.price = price;
	}

	public  getStatus() {
		return this.status;
	}

	public  setStatus( status) {
		this.status = status;
	}

	public  getDescription() {
		return this.description;
	}

	public  setDescription( description) {
		this.description = description;
	}

	public  getThumnail() {
		return this.thumnail;
	}

	public  setThumnail( thumnail) {
		this.thumnail = thumnail;
	}

	public  getRestaurant_id() {
		return this.restaurant_id;
	}

	public  setRestaurant_id( restaurant_id) {
		this.restaurant_id = restaurant_id;
	}

	public  getCategory_id() {
		return this.category_id;
	}

	public  setCategory_id( category_id) {
		this.category_id = category_id;
	}

	public  getArea_id() {
		return this.area_id;
	}

	public  setArea_id( area_id) {
		this.area_id = area_id;
	}
	
}