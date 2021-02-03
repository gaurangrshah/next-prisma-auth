import { useEffect } from "react";
import { Box, Flex, UnorderedList } from "@chakra-ui/react";
import { Section } from "./section";
import { usePositionReorder } from "@/hooks/use-position-reorder";

const DEFAULT_ITEMS = [60, 80, 70, 100];

export const DashComponent = ({ items = [], children }) => {
  const [order, setOrder, updatePosition, updateOrder] = usePositionReorder([]);

  useEffect(() => {
    console.log("running effect", items);
    items.length ? setOrder(items) : setOrder(DEFAULT_ITEMS);
  }, []);

  return (
    <Flex w='full' mx='auto' border='1px solid red'>
      <Box bg='blue.200' minW='15%'>
        left
      </Box>
      <Box bg='blue.500' flex={1}>
        Center
      </Box>
      <UnorderedList listStyleType='none' minW="30%">
        {order.map((item, i) => {
          // item.id = i
          // item.order = i
          return (
            <Section
              key={item}
              item={item}
              i={i}
              updatePosition={updatePosition}
              updateOrder={updateOrder}
              bg='blue.50'
            />
          );
        })}
      </UnorderedList>
    </Flex>
  );
};
