import React, { useEffect } from "react";
import { Avatar, Box, chakra, Flex, Heading, Slide } from "@chakra-ui/react";
// import { useSession } from "next-auth/client";

import { Nav } from "./nav";
import { useNavDispatch } from "@/components/chakra/contexts/nav-context";
import { constants } from "@/chakra/structure/constants";
import useColor from "@/chakra/hooks/use-color";
import { LogoIcon } from '@/components';
import data from "@/config/setup.json";
import CustomLink from "@/components/link/custom-link";
import { AuthButton } from '../../auth/auth-buttons';

const SlideHeader = chakra(Slide, {
  shouldForwardProp: (prop) => !["no-op"].includes(prop),
});


const Header = ({ title = "Proto UI", controls, show = false, ...rest }) => {
  const { color } = useColor();
  const { updatePages, updateControls } = useNavDispatch();
  // const [session] = useSession();
  useEffect(() => {
    updatePages(data?.pages || []);
  }, []);

  useEffect(() => {
    if (!CustomLink || !AuthButton) return;
    updateControls([CustomLink]);
  }, []);
  return (
    show && (
      <SlideHeader
        as='header'
        direction='top'
        in={show}
        {...rest}
        layerStyle='header'
        bg={color("barBg")}
        style={{ width: "100%", height: constants.headerHeight, zIndex: 1100 }}
      >
        <Flex layerStyle='header.body'>
          {LogoIcon ? (
            <LogoIcon title={title} w={12} h={12} minW='1/5' mr='auto' />
          ) : (
            <Heading
              as='h1'
              m={0}
              color='inherit'
              fontSize={["2xl", null, null, "3xl"]}
              pl={[4, null, null, null, 0]}
              flex={0}
              minW='25%'
            >
              {title}
            </Heading>
          )}
          <Nav title={title} Logo={LogoIcon} />
          {/* {session && (
            <Avatar
              size='sm'
              src={session.user.profile.avatar}
              className='user'
              ml={4}
              my='auto'
            />
          )} */}
        </Flex>
      </SlideHeader>
    )
  );
};

export default Header
