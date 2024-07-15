'use client';

const BTN = ({text, onclick}) => {
    return (
        <button onClick={onclick} className="shadow-[inset_0_0_0_2px_#616467] text-sm text-black px-8 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-main hover:text-dark dark:text-neutral-200 transition duration-200">
        {text}
      </button>
      
    );
}

export default BTN;