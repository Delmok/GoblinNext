// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import client from '../DB';

type Data = {
  name: string
}

function generateToken(nonce : String) {

    if (!nonce) return;

    let o = {
        signature: nonce
    };

    return jwt.sign(o, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: 60 * 60 * 24 // expiresds in 24 hours
    });
}
async function createTempUser(userName : String) {
    try { 
        console.log('new user added');
        
        await client.query(
            `INSERT INTO "users" ("address", "lastcollect")  
             VALUES ($1, $2)`, [userName, Date.now()]);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
async function createFirstGoblin(userName : String) {
    try { 
        console.log('new user added');
        
        await client.query(
            `INSERT INTO "goblins" ("owner", "rarity", "skills", "woodcuttingmax", "woodcuttinglvl", "miningmax", "mininglvl")  
             VALUES ($1, $2, $3, $4, $5, $6, $7)`, [userName, 1, 1, 5, 1, 5 ,1]);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
export default async function handler(

    req: NextApiRequest,
    res: NextApiResponse<Data>

){
    
    if (!req.headers.cookie) {
        res.setHeader('Set-Cookie', cookie.serialize('session', `${generateToken(req.body.nonce)}`, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 // 1 week
          }));
        await createTempUser(`${req.body.nonce}`);
        await createFirstGoblin(`${req.body.nonce}`);
        res.status(200).json({ name: `${generateToken(req.body.nonce)}` });

    }
    
    res.status(200).json({ name: `${generateToken(req.body.nonce)}` });
}