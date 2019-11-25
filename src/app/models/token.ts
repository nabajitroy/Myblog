export interface Token {
    status:string,
    token:string,
    user: { 
         _id: number|string;
         email: string; 
         role:string;
      };
}