import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { AddIconButton, SectionDetails } from "./section";
import { Holder } from "./holder";

const dummySection = {
  title: "Home Hero",
  order: 0,
  block: {
    type: "content",
    lead: "This is a lead",
    title: "This is the Title",
    excerpt: "This is the excerpt",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, sapiente? Corrupti, laborum quae voluptatem impedit architecto incidunt quam dolorum veniam.",
  },
  pages: ["home"],
};

const createNewSection = () => ({
  title: "untitled",
  order: 0
})

export const DashComponent = ({ children }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    !sections.length && setSections([dummySection]);
  }, [sections]);

  const createSection = (sectionTitle = "untitled") => {
    console.log("creating new section");
    const newSection = createNewSection();
    setSections((prevSections) => [...prevSections, newSection]);
  };

  return (
    <Box
      as='ul'
      w={["4/5", null, "3/4", "8/12"]}
      maxW='4xl'
      h='70vh'
      m='auto auto'
      mb={24}
      px={2}
      py={2}
      borderRadius='md'
      border='0.25px solid lightgray'
      bg='#fff'
      display='flex'
      flexDirection='column'
      overflowY='auto'
      className='no-scroll'
    >
      {sections.length &&
        sections.map((section) => (
          <Holder key={section.title} minH={60} listItem>
            <SectionDetails contentSection={section} />
          </Holder>
        ))}
      <Holder w={["85%", null, "70%"]} mx='auto'>
        <AddIconButton onClick={createSection} />
      </Holder>
    </Box>
  );
};
