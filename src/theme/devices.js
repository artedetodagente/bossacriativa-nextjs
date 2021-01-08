import sizes from './sizes';

export default {
  mobile: `only screen and (max-width: ${sizes.mobile})`,
  tablet: `only screen and (max-width: ${sizes.tablet})`,
  laptop: `only screen and (max-width: ${sizes.laptop})`,
  desktop: `only screen and (min-width: ${sizes.desktop})`,
};
