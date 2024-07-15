'use client';

import String from '@/Strings/english';
import Cards from './Cards';

const Services =()=>{
    return (
         <main className='w-full h-screen mt-24'>
            <Cards header={'IT Management Service'} body={'This is some text within a card body. It provides brief information about the content of the card.'} button={'Learn More'}/>
        </main>
    );
}
export default Services;