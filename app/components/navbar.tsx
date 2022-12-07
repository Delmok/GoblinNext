export default function navbar() {

    return (
        <>
        <div className=" w-full bg-violet-600 items-center">
            <div className="flex flex-col justify-center items-center">
                <div className="grid grid-cols-5 items-center gap-4">
                    <div><button className="w-14 h-14 bg-green-300">1</button></div>
                    <div><button className="w-14 h-14 bg-red-300">2</button></div>
                    <div><button className="w-14 h-14 bg-blue-300">3</button></div>
                    <div><button className="w-14 h-14 bg-orange-300">4</button></div>
                    <div><button className="w-14 h-14 bg-slate-300">5</button></div>
                </div>
            </div>
        </div>
        </>
    )
}
