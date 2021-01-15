import sizes from './sizes';

export default {
  mobile: `only screen and (max-width: ${sizes.mobile}px)`,
  tablet: `only screen and (max-width: ${sizes.tablet}px)`,
  laptop: `only screen and (max-width: ${sizes.laptop}px)`,
  desktop: `only screen and (min-width: ${sizes.desktop}px)`,
};
