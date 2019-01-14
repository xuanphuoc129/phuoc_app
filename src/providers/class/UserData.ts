export class UserData{
    private username: string = "";
    private password: string = "";
    private name: string = "";
    private user_id: number = -1;

    constructor(data?:any){
        if(data)this.parseData(data);
    }

    parseData(data){
        if(data){
            this.username = data.username;
            this.password = data.password;
        }
    }

    public setUserId(userid: number){
        this.user_id = userid;
    }

    public getUserId(): number{
        return this.user_id;
    }

    public setName(name: string){
        this.name = name;
    }

    public getName(): string{
        return this.name;
    }

    public getUserName(){
        return this.username;
    }

    public getPassword(){
        return this.password;
    }

    public setUsername(username: string){
        this.username = username;
    }

    public setPassword(password : string){
        this.password = password;
    }
}