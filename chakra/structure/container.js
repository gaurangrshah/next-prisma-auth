import { constants } from './constants'

export const responsive = {
  width: 'full',
  maxWidth: constants.bodyMax,
  px: 5,
  py: constants.containerPadding,
  mx: 'auto',
  textAlign: 'center',
};

export const fullWidth = {
  // * breakout fullwidth container
  // https://css-tricks.com/full-width-containers-limited-width-parents/
  // https://codepen.io/chriscoyier/pen/xOjaYA
  width: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
};

export const flexCenter = {
  align: 'center',
  justify: 'center',
}
