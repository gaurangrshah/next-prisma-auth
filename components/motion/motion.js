import { Box, forwardRef, ListItem } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
// 1. Create a custom motion component from Box
// export const MotionBox = motion.custom(
//   forwardRef((props, ref) => {
//     const chakraProps = Object.fromEntries(
//       // do not pass framer props to DOM element
//       Object.entries(props).filter(([key]) => !isValidMotionProp(key))
//     );
//     return <Box ref={ref} {...chakraProps} />;
//   })
// );

export const MotionBox = motion.custom(Box);

export const MotionListItem = motion.custom(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <ListItem ref={ref} {...chakraProps} />;
  })
);

// 2. You'll get access to `motion` and `chakra` props in `MotionBox`
// function Example() {
//   return (
//     <MotionBox
//       boxSize='40px'
//       bg='red.300'
//       drag='x'
//       dragConstraints={{ left: -100, right: 100 }}
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//     />
//   );
// }
