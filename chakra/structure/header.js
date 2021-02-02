import { constants } from './constants'

export const header = {
  position: 'fixed',
  top: 0,
  w: constants.maxWidth,
  h: constants.headerHeight,
  px: constants.minPaddingX,
  py: constants.minPaddingY,
  my: 'auto',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: 'sticky',
  boxShadow: 'lg',
}

header.mobile = {
  display: ['flex', null, null, 'none'],
  flexDirection: 'column',
  justifyContent: 'flex-end',
  align: 'stretch',
  wrap: 'wrap',
  py: 10,
  flex: 1,
  fontSize: 'lg',
  overflow: 'hidden',
  textTransform: 'capitalize',
  cursor: 'pointer',
}

header.desktop = {
  ml: 'auto',
  maxWidth: 'xl',
  display: ['none', null, null, 'flex'],
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: ['center'],
  wrap: 'nowrap',
  flex: 1,
  fontSize: 'md',
  overflow: 'hidden',
  textTransform: 'capitalize',
  cursor: 'pointer',
}

header.body = {
  m: 'auto',
  w: constants.maxWidth,
  maxW: constants.bodyMax,
}
