import { constants } from './constants'

export const footer = {
  w: constants.maxWidth,
  h: constants.footerHeight,
  p: constants.minPadding,
  position: 'fixed',
  justify: 'space-between',
  bottom: '0px',
  my: 'auto',
  zIndex: 'sticky',
  boxShadow: 'lg',
}

footer.body = {
  w: constants.maxWidth,
  maxW: constants.bodyMax,
  px: 5,
  mx: 'auto'
}
