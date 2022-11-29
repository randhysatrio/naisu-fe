// COMPONENTS
import { AnimatePresence, motion } from 'framer-motion';

interface BasicModalProps {
   children: React.ReactNode;
   open: boolean;
   close?: () => void;
}

const BasicModal = ({ children, open, close }: BasicModalProps) => {
   return (
      <AnimatePresence exitBeforeEnter>
         {open && (
            <motion.div
               onClick={close}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex p-9 overflow-y-auto overscroll-contain"
            >
               <motion.div
                  onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ bounce: 0 }}
                  className="w-fit m-auto z-[1]"
               >
                  {children}
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default BasicModal;
