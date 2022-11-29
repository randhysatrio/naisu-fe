// CORE
import React, { useState } from 'react';

// COMPONENTS
import { motion, AnimatePresence, useCycle } from 'framer-motion';

// ICONS
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

interface Tab {
   id: number;
   name: string;
}

interface SidebarProps {
   tabs: Tab[];
   active: number;
}

const Sidebar = ({ tabs }: SidebarProps) => {
   const [open, toggleOpen] = useCycle(false, true);
   const [active, setActive] = useState(tabs[0].id);

   const CHILD_DUR = 0.3;

   const variants = {
      start: {
         x: '-100%',
      },
      animate: {
         x: 0,
         transition: {
            bounce: 0,
            duration: 0.5,
         },
      },
      exit: {
         x: '-100%',
         transition: {
            delay: tabs.length * CHILD_DUR,
            bounce: 0,
         },
      },
   };

   const menuVariants = {
      start: {
         opacity: 0,
      },
      animate: {
         opacity: 1,
         transition: {
            delayChildren: 0.5,
            staggerChildren: 0.2,
         },
      },
      exit: {
         opacity: 0,
         transition: {
            when: 'afterChildren',
            staggerChildren: 0.2,
            staggerDirection: -1,
         },
      },
   };

   const itemVariants = {
      start: {
         opacity: 0,
         y: 5,
      },
      animate: {
         opacity: 1,
         y: 0,
      },
      exit: {
         opacity: 0,
         y: 10,
      },
   };

   return (
      <>
         <button
            onClick={() => toggleOpen()}
            className="border p-2 rounded-md lg:hidden active:scale-95 transition"
         >
            <AiOutlineMenu />
         </button>

         <AnimatePresence exitBeforeEnter>
            {open && (
               <>
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{
                        opacity: 0,
                        transition: { delay: tabs.length * CHILD_DUR + 0.3 },
                     }}
                     className="fixed inset-0 z-[9999] bg-black bg-opacity-50"
                     onClick={() => toggleOpen()}
                  >
                     <motion.div
                        className="absolute z-[9999] top-0 left-0 h-screen w-[55%] bg-white border-r flex flex-col p-4 shadow-md shadow-indigo-200"
                        variants={variants}
                        initial="start"
                        animate="animate"
                        exit="exit"
                        onClick={(e: React.SyntheticEvent) =>
                           e.stopPropagation()
                        }
                     >
                        <motion.button
                           initial={{ opacity: 0 }}
                           animate={{
                              opacity: 1,
                              transition: {
                                 delay: tabs.length * CHILD_DUR,
                              },
                           }}
                           exit={{
                              opacity: 0,
                              transition: { delay: tabs.length * 0.2 },
                           }}
                           onClick={() => toggleOpen()}
                        >
                           <AiOutlineClose className="text-lg" />
                        </motion.button>

                        <motion.div
                           className="w-full flex flex-col mt-9 gap-1"
                           variants={menuVariants}
                           initial="start"
                           animate="animate"
                           exit="exit"
                        >
                           {tabs.map((tab) => (
                              <motion.div
                                 key={tab.id}
                                 variants={itemVariants}
                                 transition={{ bounce: 0 }}
                                 className="text-md font-bold cursor-pointer origin-left relative flex items-center p-2"
                                 onClick={() => {
                                    setActive(tab.id);
                                 }}
                                 style={{
                                    WebkitTapHighlightColor: `rgba(0,0,0,0)`,
                                 }}
                              >
                                 <span className="relative z-[2] text-lg truncate">
                                    {tab.name}
                                 </span>

                                 <AnimatePresence>
                                    {active === tab.id ? (
                                       <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                          transition={{ duration: 0.4 }}
                                          className="absolute left-0 h-full w-full bg-gray-100 rounded-md"
                                       />
                                    ) : null}
                                 </AnimatePresence>

                                 {active === tab.id ? (
                                    <motion.div
                                       className="absolute z-[2] left-0 h-[70%] w-[3px] bg-indigo-400 rounded-r-md"
                                       layoutId="line"
                                    />
                                 ) : null}
                              </motion.div>
                           ))}
                        </motion.div>
                     </motion.div>
                  </motion.div>
               </>
            )}
         </AnimatePresence>
      </>
   );
};

export default Sidebar;
