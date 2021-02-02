import { mode } from "@chakra-ui/theme-tools";
import "focus-visible/dist/focus-visible";

const styles = {
  global: (props) => ({
    ".js-focus-visible": {
      /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
    */
      outline: "none",
      boxShadow: "none",
    },
    "*": {
      border: 0,
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      fontFeatureSettings: `'kern'`,
      textRendering: "optimizeLegibility",
      WebkitFontSmoothing: "antialiased",
    },
    "html, body": {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      scrollBehavior: "smooth",
    },
    body: {
      fontFamily: "body",
      color: mode("gray.700", "whiteAlpha.900")(props),
      bg: mode("white", "gray.800")(props),
      lineHeight: "1.75em",
      textRendering: "optimizeLegibility",
      minHeight: "full"
    },
    "*::placeholder": {
      color: mode("gray.400", "whiteAlpha.400")(props),
    },
    "*, *::before, *::after": {
      borderColor: mode("gray.200", "whiteAlpha.300")(props),
      boxSizing: "border-box",
      wordWrap: "break-word",
    },
    "input:focus": {
      border: "inherit",
    },
    "input:focus:invalid": {
      backround: "rgba(255, 224, 224, 1)",
    },
    "input:focus, input:focus:valid": {
      backround: "rgba(226, 250, 219, 1)",
    },
    "a:active, a:focus, a:visited": {
      outline: 0,
      border: "none",
      outlineStyle: "none",
      textDecoration: "none",
      boxShadow: "0 0 0 1px rgba(0, 0, 0, 0) !important",
    },
    "a:hover": {
      textDecoration: "none",
    },
    a: {
      color: "inherit",
    }
  }),
};

export default styles;
