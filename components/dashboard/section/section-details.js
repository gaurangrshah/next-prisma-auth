import { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { Editables } from "./editables";
import { Holder } from "../holder";
import { AddIconButton } from "./add-icon-btn";
import { Json } from "@/chakra/components";

export const SectionDetails = ({
  contentSection: { block, pages, ...restSection },
}) => {
  const [sectionBlock, setSectionBlock] = useState(null)
  useEffect(() => {
    !sectionBlock && setSectionBlock(block)
  }, [block])
  function renderSectionDetails(section) {
    return Object.keys(section).map((key, i) => {
      return (
        <>
          <Editables
            key={key}
            placeholder={key}
            defaultValue={section[key]}
            textAlign={i % 2 == 1 ? "right" : "left"}
          />
        </>
      );
    });
  }

  return (
    <Box
      p={4}
      minH={52}
      bg='white'
      borderRadius='sm'
      textAlign='left'
      boxShadow='xs'
    >
      <Flex justifyContent='space-between'>
        {renderSectionDetails(restSection)}
      </Flex>
      {sectionBlock ? (
        <Block block={sectionBlock} />
      ) : (
        <EmptyBlock setSectionBlock={setSectionBlock} />
      )}
    </Box>
  );
};

const EmptyBlock = ({ setSectionBlock }) => {
  const createBlock = () => {
    console.log("creating new block");
    setSectionBlock({
      type: "content",
      lead: "This is a lead",
      title: "This is the Title",
      excerpt: "This is the excerpt",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, sapiente? Corrupti, laborum quae voluptatem impedit architecto incidunt quam dolorum veniam.",
    });
  };

  return (
    <Holder>
      <AddIconButton onClick={createBlock} />
    </Holder>
  );
};

const Block = ({ block }) => {
  return <Holder>{<Json data={block} />}</Holder>;
};
