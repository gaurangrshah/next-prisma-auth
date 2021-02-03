import { motion } from "framer-motion";
import { useMeasurePosition } from "@/hooks/use-measure-position";

export const MotionDragger = ({
  i,
  isDragging,
  setDragging,
  updatePosition,
  updateOrder,
  children,
}) => {
  const ref = useMeasurePosition((pos) => updatePosition(i, pos));

  return (
    <motion.div
      ref={ref}
      layout
      {...motionConfig}
      {...dragConfig}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onViewportBoxUpdate={(_viewportBox, delta) => {
        isDragging && updateOrder(i, delta.y.translate);
      }}
    >
      {children}
    </motion.div>
  );
};

const motionConfig = {
  initial: false,
  whileHover: {
    scale: 1.03,
    boxShadow: "0px 3px 3px rgba(0,0,0,0.15)",
  },
  whileTap: {
    scale: 1.12,
    boxShadow: "0px 5px 5px rgba(0,0,0,0.1)",
  },
};

const dragConfig = {
  drag: "y",
  dragElastic: 1,
  dragPropogation: true,
};
