  export interface Comments {
     _id: number|string;
    // title: string;
    body: string;
    created: Date;
    createdBy:  { _id: number|string; email: string;  };
   
   // constructor(comment ) {
    //  this._id = comment._id;
   //   this.title = comment.title;
     // this.body = comment.body;
    //  this.created = comment.created;
     // this.createdBy = comment.createdBy;
      
   // }
     
  }