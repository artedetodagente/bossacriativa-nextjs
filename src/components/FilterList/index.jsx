import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { List, Select } from './styles';
import ButtonsNavigations from '../ButtonsNavigations';

export default function FilterList({ source, action, renderItem }) {
  const [buttonsShow, setButtonsShow] = useState(false);
  const listRef = useRef(null);

  const checkOverflow = () => {
    const isOverflown = (e) => e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth;
    if (isOverflown(listRef.current)) {
      setButtonsShow(true);
      listRef.current.scrollLeft = 0;
    } else {
      setButtonsShow(false);
    }
  };

  function scrollToLeft() {
    listRef.current.scrollLeft -= 200;
  }

  function scrollToRight() {
    listRef.current.scrollLeft += 200;
  }

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
  }, []);

  return (
    <>
      <List ref={listRef}>
        {
          source.map((item, index) => <li key={index}>{renderItem(item)}</li>)
        }
      </List>
      { buttonsShow ? (
        <ButtonsNavigations
          onPrev={scrollToLeft}
          onNext={scrollToRight}
        />
      ) : ''}
      <Select onChange={(e) => action(e.target.value)}>
        {
          source.map((item, index) => <option key={index} value={item?.slug}>{item?.name}</option>)
        }
      </Select>
    </>
  );
}

FilterList.propTypes = {
  source: PropTypes.arrayOf(PropTypes.shape()),
  renderItem: PropTypes.func,
};

FilterList.defaultProps = {
  source: [],
  renderItem: null,
};
