import { Paramskey } from "../smartfox/Paramkeys";

export class Users{
    private  userID : number = -1;
	private  name : string = "";
	private  username : string = "";
	private  phone : string = "";
	private  address : string = "";
	private  avatar : string = "";
	private  role : number = -1;
	private  status : number = -1;
    
    constructor(){

    }

    public fromSFSObject(o) {
		if(o.containsKey(Paramskey.USER_ID)) {
			this.setUserID(o.getInt(Paramskey.USER_ID));
		}
		if(o.containsKey(Paramskey.NAME)) {
			this.setName(o.getUtfString(Paramskey.NAME));
		}
		if(o.containsKey(Paramskey.PHONE)) {
			this.setPhone(o.getUtfString(Paramskey.PHONE));
		}
		if(o.containsKey(Paramskey.AVATAR)) {
			this.setAvatar(o.getUtfString(Paramskey.AVATAR));
		}
		if(o.containsKey(Paramskey.USERNAME)) {
			this.setUsername(o.getUtfString(Paramskey.USERNAME));
		}
		if(o.containsKey(Paramskey.ADDRESS)) {
			this.setAddress(o.getUtfString(Paramskey.ADDRESS));
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


	public getName() {
		return this.name;
	}


	public  setName( name) {
		this.name = name;
	}


	public  getUsername() {
		return this.username;
	}


	public  setUsername( username) {
		this.username = username;
	}


	public  getPhone() {
		return this.phone;
	}


	public  setPhone( phone) {
		this.phone = phone;
	}


	public  getAddress() {
		return this.address;
	}


	public  setAddress( address) {
		this.address = address;
	}


	public  getAvatar() {
		return this.avatar;
	}


	public  setAvatar( avatar) {
		this.avatar = avatar;
	}
}