// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import auth from '../authenticate';
import client from '../DB';

type Data = {
  name: string
}

const goldPerEgg = 10;
const baseJobRate = 2;

let jobs = {
    woodcutting: 1,
    mining: 2,
}

export default async function handler(

    req: NextApiRequest,
    res: NextApiResponse<Data>

){
    let resources = {
        wood: 0,
        stone: 0,
        goblinessence: 0
    }

    if (!req.headers.cookie) return res.status(401);
    if (!await auth(req.headers.cookie)) return res.status(401);
    
    let address : any = await auth(req.headers.cookie);
    let userData = await client.query(`SELECT * FROM users WHERE address='${address}'`);
    let user : any = userData.rows[0];
    let lastCollectEggs : Number = user.lastcollect;
    let timeNow : number = Date.now()
    let timeDif = Number(timeNow) - Number(lastCollectEggs);
    let eggsPerMili = (goldPerEgg / (10 + Number(user.gold))) / 600000;

    let eggsToCollect = timeDif * eggsPerMili;
    let userGoblins = await client.query(`SELECT * FROM goblins WHERE owner='${address}'`);
    let goblins = userGoblins.rows;

    for (let i = 0; i < goblins.length; i++) {
        resources.wood = resources.wood + goblins[i].woodcuttinglvl;
        resources.stone = resources.stone + goblins[i].mininglvl;
    }
    let woodPerMili = (baseJobRate / resources.wood) / 600000;
    let stonePerMili = (baseJobRate / resources.stone) / 600000;
    let woodToCollect = timeDif * woodPerMili;
    let stoneToCollect = timeDif * stonePerMili;
    console.log(eggsToCollect.toFixed(4), woodToCollect.toFixed(4), stoneToCollect.toFixed(4));
    
    return res.status(200).json(user);

}
/**
 * 
 * user: address, wood, stone, ore, goblinEssence, lastCollect
 * goblin: ID, owner, rarity, skills[], woodcuttingMax, woodcuttingLVL, miningMax, miningLVL
 * 
 */