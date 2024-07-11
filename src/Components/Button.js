'use client';

const BTN = ({text, onclick}) => {
    return (
     <button onClick={onclick} class="bg-main hover:bg-main-light text-white font-bold py-2 px-4 border-b-4 border-main-dark hover:border-main-light rounded">{text}</button>
    );
}

export default BTN;