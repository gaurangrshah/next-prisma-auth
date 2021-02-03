import { useState } from "react";
import { Box, Flex, UnorderedList, ListItem } from "@chakra-ui/react";
import { MotionDragger } from "@/components/motion-dragger";

export const Section = ({ item, i, updatePosition, updateOrder, ...rest }) => {
  const [isDragging, setDragging] = useState(false);

  return (
    <ListItem {...rest} sx={{ zIndex: isDragging ? 3 : 1 }}>
      <MotionDragger
        i={i}
        isDragging={isDragging}
        setDragging={setDragging}
        updatePosition={updatePosition}
        updateOrder={updateOrder}
      >
        {JSON.stringify(item)}
      </MotionDragger>
    </ListItem>
  );
};
