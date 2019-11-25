export class Users {
    public _id: number; 
    public fullname: string;
    public email: String;
     
    constructor(user ) {
      this._id = user._id;
      this.fullname = user.fullname;
      this.email = user.email; 
      
    }
     
  }