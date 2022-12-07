'use client'
import { useState } from "react";

export default function accordion() {

    const accordionData = [
        {
            title: "title",
            data:
                <>
                <div className=" grid grid-cols-3 gap-4 p-2">
                    <div className="border rounded-2 border-slate-600">
                        <img className="rounded-2" src="https://img.freepik.com/premium-photo/antique-compass-vintage-africa-travel-map-exploration-navigation-concept-background-photo_526934-389.jpg?w=996" alt="" />
                    </div>
                    <div className="border rounded-2 border-slate-600">
                        <img src="https://img.freepik.com/premium-photo/antique-compass-vintage-africa-travel-map-exploration-navigation-concept-background-photo_526934-389.jpg?w=996" alt="" />
                    </div>
                    <div className="border border-slate-600">
                        <img src="https://img.freepik.com/premium-photo/antique-compass-vintage-africa-travel-map-exploration-navigation-concept-background-photo_526934-389.jpg?w=996" alt="" />
                    </div>
                </div>
                <div className="grid grid-cols-3 border rounded-t">
                    <div className=" font-bold">test</div>
                    <div className=" font-bold">test</div>
                    <div className=" font-bold">test</div>
                </div>
                </>
        },
        {
            title: "title2",
            data: "data2"
        },
        {
            title: "title3",
            data: "data3"
        },
        {
            title: "title4",
            data: "data4"
        },
        {
            title: "title5",
            data: "data5"
        },
        {
            title: "title6",
            data: "data6"
        }
    ]

    const [selected, setSelected] : any = useState(0);
    
    /**
     * 
     * @param i => accordion id
     * @returns desired accordion state
     */
    const toggle = (i : any) => {

        if (selected == i){
            return setSelected(null);
        }
            return setSelected(i)
    }

    return (
        <div className="flex flex-col gap-3">
            {
                accordionData.map((item, i) => (
                    <div className="item bg-zinc-700 w-full text-center  border-zinc-600 border rounded-lg">
                        <div className="flex justify-between cursor-pointer p-2" onClick={() => toggle(i)}>
                            <div className=" text-lg font-bold">{item.title}</div>
                            <span className="">{selected === i ? '-' : '+'}</span>
                        </div>
                        
                        <div className={selected === i ? ' border-t border-zinc-600 p-2 bg' : 'hidden'}>{item.data}</div>
                    </div>
                ))
            }
        </div>
    )
}