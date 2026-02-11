import { motion } from "framer-motion";
import Navbar from "./Navbar";

function PageWrapper({ children, animation = { opacity: 0 }, animate = { opacity: 1 } }) {
  return (
    <motion.div 
      className="page" 
      initial={animation} 
      animate={animate}
    >
      <Navbar />
      {children}
    </motion.div>
  );
}

export default PageWrapper;
