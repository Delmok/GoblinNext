// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import auth from '../authenticate';
import client from '../DB';

type Data = {
  name: string
}



export default async function handler(

    req: NextApiRequest,
    res: NextApiResponse<Data>

){

    if (!req.headers.cookie) return res.status(401);
    if (!await auth(req.headers.cookie)) return res.status(401);
    
    let address : any = await auth(req.headers.cookie);
    let jobData = await client.query(`SELECT * FROM jobs WHERE address='${address}' AND completeat <= ${Date.now()}`);

    
    return res.status(200).json(address);

}
