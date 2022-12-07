import Generate from './components/Generate';
import Accordion from './components/accordion';

export default async function Home() {

    return ( 
        <>
            <div className=' flex flex-col gap-4 p-5'>
                <Accordion></Accordion>
            </div>
        </>
     );

}