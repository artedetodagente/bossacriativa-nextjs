import React from 'react';
import CarouselBanner from '../CarouselBanner';
import {
  WrapperCarousel,
} from './style';

export default function Schedule() {
  return (
    <WrapperCarousel>
      <CarouselBanner width="49%" />
      <CarouselBanner width="49%" />
    </WrapperCarousel>
  );
}
