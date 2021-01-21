import React, { useState } from 'react';
import { IoChevronDownCircleSharp } from 'react-icons/io5';
import { Content } from './styles';

export default function Expansibled({ showText, hiddenText, children }) {
  const [expansible, setExpansible] = useState(false);

  return (
    <Content show={expansible}>
      <div>
        {children}
      </div>
      <div>
        <button
          type="button"
          onClick={() => setExpansible(!expansible)}
        >
          {!expansible ? showText : hiddenText}
          <IoChevronDownCircleSharp />
        </button>
      </div>
    </Content>
  );
}
