import { useState, useEffect } from "react";
import { Box, UnorderedList } from "@chakra-ui/react";

import { AddIconButton } from "./add-icon-btn";
import { SectionDetails } from "./section-details";
import { Holder } from "../holder";
import dummySection from "./dummy-section.json";

const Sections = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    console.log("setting sections");
    !sections.length &&
      setSections(
        [1, 2, 3].map((num, i) => {
          dummySection.id = i;
          dummySection.order = i;
          console.log("dummy", dummySection);
          return dummySection;
        })
      );
  }, []);

  const createSection = (sectionTitle = "untitled") => {
    console.log("creating new section");
    const newSection = createNewSection();
    setSections((prevSections) => [...prevSections, newSection]);
  };

  return (
    <UnorderedList
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
            <SectionDetails
              contentSection={section}
              // Component={SectionHolder}
            />
          </Holder>
        ))}
      <Holder w={["85%", null, "70%"]} mx='auto'>
        <AddIconButton onClick={createSection} />
      </Holder>
    </UnorderedList>
  );
};

const SectionHolder = ({ item }) => (
  <Holder>
    <SectionDetails contentSection={item} />
  </Holder>
);


export default Sections
