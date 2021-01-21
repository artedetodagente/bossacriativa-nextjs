import React from 'react';
import AgendaCarousel from '../AgendaCarousel';
import {
  WrapperCarousel,
} from './style';

export default function Schedule() {
  return (
    <WrapperCarousel>
      <AgendaCarousel width="49%" />
      <AgendaCarousel width="49%" />
    </WrapperCarousel>
  );
}
