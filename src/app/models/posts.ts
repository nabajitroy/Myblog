 export interface Posts {
  _id: number|string;
  title: string;
  body: string;
  created: Date;
  updated:Date;
  createdBy:  { _id: number|string; email: string;  };
  tags:[string];
 }
// constructor(comment ) {
 //  this._id = comment._id;
//   this.title = comment.title;
  // this.body = comment.body;
 //  this.created = comment.created;
  // this.createdBy = comment.createdBy;
   
// }
  

 /*export class Posts {
 
    public _id: number;
    public title: string;
    public body: string;
    public tags:[string];
    public createdBy:string;
    public created: Date;
    public updated: Date;
   
    constructor(_id:number, title:string, body:string,tags:[string],createdBy:string,created:Date,updated:Date) {
      this._id = _id;
      this.title = title;
      this.body = body;
      this.tags =tags;
      this.createdBy =createdBy;
      this.created =created;
      this.updated=updated;
    }
     
  }*/