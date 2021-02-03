import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UnorderedList, ListItem } from "@chakra-ui/react";
import { usePositionReorder } from "@/hooks/use-position-reorder";
import { useMeasurePosition } from "@/hooks/use-measure-position";
import { MotionBox } from "@/components/motion";
import { Json } from "@/chakra/components";

/**
 * This is an example of drag-to-reorder in Framer Motion 2.
 *
 * By applying both drag and layout props to a component, if it changes place
 * in the DOM it'll either animate to its new position (if not dragging) or
 * stay stuck to the user's cursor (if dragging).
 */

const DEFAULT_ITEMS = [60, 80, 70, 100];

export default function DndHolder({ items, Component }) {
  const [order, setOrder, updatePosition, updateOrder] = usePositionReorder([]);

  useEffect(() => {
    console.log("running effect", items);
    items.length ? setOrder(items) : setOrder(DEFAULT_ITEMS);
  }, []);

  return (
    <UnorderedList
      sx={{
        maxWidth: "300px",
        margin: "0 auto",
        listStyleType: "none",
        // padding: "1em",
        overflow: "hidden",
        // paddingLeft: "0.3em",
        // paddingRight: "0.3em",
      }}
    >
      {order.map((item, i) => (
        <Item
          key={item}
          i={i}
          item={item}
          updatePosition={updatePosition}
          updateOrder={updateOrder}
          // Component={Component}
        />
      ))}
    </UnorderedList>
  );
}

function Item({ i, item, updatePosition, updateOrder, Component }) {
  const [isDragging, setDragging] = useState(false);

  const ref = useMeasurePosition((pos) => updatePosition(i, pos));

  return (
    <ListItem
      sx={{
        padding: 0,
        minH: "2em",
        // When dragging, set the zIndex of that item to be on top of the other items.
        zIndex: isDragging ? 3 : 1,
      }}
    >
      <motion.div
        ref={ref}
        layout
        initial={false}
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 3px 3px rgba(0,0,0,0.15)",
        }}
        whileTap={{
          scale: 1.12,
          boxShadow: "0px 5px 5px rgba(0,0,0,0.1)",
        }}
        drag='y'
        // Animate the component back to 0 when dragging ends
        // dragConstraints={{ top: 0, bottom: 0 }}
        // But allow full movement outside those constraints
        dragElastic={1}
        dragPropagation
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        onViewportBoxUpdate={(_viewportBox, delta) => {
          isDragging && updateOrder(i, delta.y.translate);
        }}
      >
        {Component ? <Component item={item} /> : <Json data={item} />}
      </motion.div>
    </ListItem>
  );
}
