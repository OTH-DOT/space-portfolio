import { motion } from "framer-motion";

const SharedItem = ({ inView }) => {
  return (
    <motion.div
      animate={{ x: inView ? "70vw" : "70vw" , y:inView ? "30vh" : "20vh"}}
      initial={{ x: "0vw" }}
      transition={{ duration: 1 }}
      className="fixed top-1/2 transform z-10 -translate-y-1/2"
    >
      <div className="w-32 h-32 bg-orange-500 rounded-full" />
    </motion.div>
  );
};

export default SharedItem;
