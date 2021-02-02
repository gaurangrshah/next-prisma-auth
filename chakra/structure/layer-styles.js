import { header } from './header'
import { nav } from './nav'
import { footer } from './footer'
import { main } from './main'
import { wrapper } from './wrapper'
import { responsive, fullWidth, flexCenter } from './container';
import { row } from './row'
import customLayerStyles from "@/theme/layer-styles";


const layerStyles = {
  wrapper,
  header,
  nav,
  main,
  footer,
  responsive,
  fullWidth,
  flexCenter,
  row,
  ...customLayerStyles
};

export default layerStyles
