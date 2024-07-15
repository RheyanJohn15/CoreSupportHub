'use client';

import String from '@/Strings/english';
import Cards from './Cards';
import Img from '../../public/techIcon.png'

const Services =()=>{
    return (
         <main className='w-screen h-screen mt-24'>
             <div className="flex">
            <Cards header={'IT Management Service'} image={Img} body={'This is some text within a card body. It provides brief information about the content of the card.'} button={'Learn More'}/>
             <Cards header={'IT Management Service'} image={Img} body={'This is some text within a card body. It provides brief information about the content of the card.'} button={'Learn More'}/>
        </div>

        </main>
    );
}
export default Services;