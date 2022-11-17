'use client'
import React, {use, useEffect, useState} from "react";
import { setInterval } from "timers";
import '../styles/globals.css'

let nonce = generateRandomID(32)
function generateRandomID(length : Number) : String {

    let result : String = '';
    let characters : String = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength : number = characters.length;

    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export default function Generate() {
    console.log(nonce);
    
    useEffect(() => {
        getToken('/api/GenerateToken', {"nonce": nonce, "signature": "temp", "address": "temp"})
        .then(async () => {
            await getToken('/api/CollectResources', {"nonce": nonce})
            .then((o) => {

                if (!o) return;
                setUserId(o.address)
                setGold(Number(o.gold))
                setWood(Number(o.gold))
            });
        });

        setInterval(async () => {

            await getToken('/api/CollectResources', {"nonce": nonce})
            .then((o) => {

                if (!o) return;
                setUserId(o.address)
                setGold(Number(o.gold))
                setWood(Number(o.gold))
            })
        }, 5000);
    }, []);

    const [userId, setUserId] = useState('cwinge');
    const [gold, setGold] = useState(0);
    const [wood, setWood] = useState(0);

    const getToken = async (url = '', data = {}) => {

        const response = await fetch(url, {
    
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
    
        return response.json();
    }



    return ( 
        <>
        <div className=" underline border-lime-300">Address: {userId} Gold: {gold} Wood: {wood} </div><br />
        <button onClick={async () => {setUserId(
                `${await getToken('/api/GenerateToken', {"nonce": generateRandomID(32), "signature": "temps", "address": "temp"})
                .then(async (o) => {
                    return (o.name).slice(-10);
                })}`
                )}
        }>click me</button><br />
        <button onClick={async () => setWood(wood+1)}>resources</button>
        </>
    )
}