// CORE
import { useState } from 'react';

// COMPONENTS
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

const Navbar: React.FC = () => {
   const [active, setActive] = useState(1);

   const tabs = [
      { id: 1, name: 'Home' },
      { id: 2, name: 'Products' },
      { id: 3, name: 'Some long name like, really long' },
   ];

   return (
      <header className="w-full h-14 px-5 fixed top-0 flex items-center shadow-md border-b">
         <Sidebar tabs={tabs} active={active} />

         <nav className="hidden w-full h-full lg:flex items-center gap-2">
            {tabs.map((tab) => (
               <div
                  onClick={() => setActive(tab.id)}
                  key={tab.id}
                  className="h-full px-3 relative cursor-pointer flex items-center"
               >
                  <span
                     className={`font-bold ${
                        active === tab.id
                           ? 'text-black'
                           : 'text-gray-600 hover:text-black'
                     } transition cursor-pointer`}
                  >
                     {tab.name}
                  </span>

                  {active === tab.id ? (
                     <motion.div
                        className="absolute w-full bottom-0 left-0 h-1 bg-indigo-500 rounded-t-sm"
                        layoutId="daffa"
                     />
                  ) : null}
               </div>
            ))}
         </nav>
      </header>
   );
};

export default Navbar;
