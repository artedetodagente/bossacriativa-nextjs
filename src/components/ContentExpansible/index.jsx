import React from 'react';
import { IoChevronDownCircleSharp } from 'react-icons/io5';
import { Content } from './styles';

export default function ContentExpansive({ showText, hiddenText, children }) {
  return (
    <Content>
      <div>
        {children}
      </div>
      <div>
        <button type="button">
          {showText || hiddenText}
          <IoChevronDownCircleSharp />
        </button>
      </div>
    </Content>
  );
}
