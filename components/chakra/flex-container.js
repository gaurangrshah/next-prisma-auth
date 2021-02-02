import React from "react";
import { Flex } from "@chakra-ui/react";

export const FlexContainer = ({ components, ...rest }) => {
  return (
    <Flex className="flex-container" {...rest} {...flexWrapper}>
      {components.map((Comp, i) => (
        <Flex key={i} flexDirection='column' w='full'>
          {Comp}
        </Flex>
      ))}
    </Flex>
  );
};

const flexWrapper = {
  flexDirection: ["column-reverse", null, "row"],
  w: "full",
  alignItems: ["center", "flex-start"],
};
