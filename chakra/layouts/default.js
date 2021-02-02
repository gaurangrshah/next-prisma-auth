import { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import useColor from "../hooks/use-color";

import { ModeToggle } from "../components";
import { NavProvider } from "../../components/chakra/contexts/nav-context";
import { useToastState } from "../contexts/toast-context";

export function DefaultLayout({ bars = [], children }) {
  const { color } = useColor();
  const { msg, toast } = useToastState();

  const [Header, Footer] = bars

  useEffect(() => {
    if (!msg) return;
    toast(msg);
  }, [msg]);

  return (
    <>
      <ModeToggle />
      <Flex className='wrapper' layerStyle='wrapper'>
        <NavProvider>
          {Header ? Header : null}
        </NavProvider>
        <Box as='main' layerStyle='main'>
          {children}
        </Box>
        <Flex as='footer' bg={color("barBg")} layerStyle='footer'>
          <Box layerStyle='footer.body'>
            {Footer ? Footer : "footer"}
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
