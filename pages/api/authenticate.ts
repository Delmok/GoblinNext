import jwt from 'jsonwebtoken';

export default async function authenticate(token: String) {

    let result : String = '';

    if (!token) return;
    
    jwt.verify(token.split('session=')[1], `${process.env.ACCESS_TOKEN_SECRET}`, async (err, e : any) => {
        if (err) return;        
        if (!e) return;
        let sig : string = `${e.signature}`;
        result = sig;
        
    });
        
    return result;
}