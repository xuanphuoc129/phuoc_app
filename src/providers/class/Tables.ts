import { Paramskey } from "../smartfox/Paramkeys";

export class Tables {
    private table_id: number = -1;
    private name: string = "";
    private capacity: number = -1;
    private status: number = -1;
    private floor_id: number = -1;
    private restaurant_id: number = -1;
    private floor_name: string = "";

    constructor() { }

    fromObject(table: Tables){
        this.table_id = table.getTable_id();
        this.name = table.getName();
        this.capacity = table.getCapacity();
        this.status = table.getStatus();
        this.floor_id  = table.getFloor_id();
        this.restaurant_id = table.getRestaurant_id();
    }

    public toSFSObject(o) {
        o.putInt(Paramskey.TABLE_ID, this.getTable_id());
        o.putUtfString(Paramskey.NAME, this.getName());
        o.putInt(Paramskey.CAPACITY, this.getCapacity());
        o.putInt(Paramskey.STATUS, this.getStatus());
        o.putInt(Paramskey.FLOOR_ID, this.getFloor_id());
        o.putInt(Paramskey.RESTAURANT_ID, this.getRestaurant_id());
        return o;
    }

    public fromSFSObject(o) {
        if (o.containsKey(Paramskey.TABLE_ID)) {
            this.setTable_id(o.getInt(Paramskey.TABLE_ID));
        }

        if (o.containsKey(Paramskey.NAME)) {
            this.setName(o.getUtfString(Paramskey.NAME));
        }

        if (o.containsKey(Paramskey.CAPACITY)) {
            this.setCapacity(o.getInt(Paramskey.CAPACITY));
        }

        if (o.containsKey(Paramskey.STATUS)) {
            this.setStatus(o.getInt(Paramskey.STATUS));
        }

        if (o.containsKey(Paramskey.FLOOR_ID)) {
            this.setFloor_id(o.getInt(Paramskey.FLOOR_ID));
        }
        if (o.containsKey(Paramskey.RESTAURANT_ID)) {
            this.setRestaurant_id(o.getInt(Paramskey.RESTAURANT_ID));
        }
    }

    public getTable_id() {
        return this.table_id;
    }


    public setTable_id(table_id) {
        this.table_id = table_id;
    }

    public getFloorName() {
        return this.floor_name;
    }


    public setFloorName(name) {
        this.floor_name = name;
    }



    public getName() {
        return this.name;
    }


    public setName(name) {
        this.name = name;
    }


    public getCapacity() {
        return this.capacity;
    }


    public setCapacity(capacity) {
        this.capacity = capacity;
    }


    public getStatus() {
        return this.status;
    }


    public setStatus(status) {
        this.status = status;
    }


    public getFloor_id() {
        return this.floor_id;
    }


    public setFloor_id(floor_id) {
        this.floor_id = floor_id;
    }


    public getRestaurant_id() {
        return this.restaurant_id;
    }


    public setRestaurant_id(restaurant_id) {
        this.restaurant_id = restaurant_id;
    }
}