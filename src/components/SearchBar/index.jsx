/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearch, BiCaretDown } from 'react-icons/bi';
import { Search, BtnSearch, BtnCombo } from './styles';

export default function SearchBar({
  filters, renderFilter, submit,
}) {
  const [filter, setFilter] = useState({ search: '' });
  const [openCombo, setOpenCombo] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(0);

  function handleChange(e) {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    submit(filter);
  }

  return (
    <Search props={{ openCombo, selectedCombo }}>
      <div>
        <BtnSearch type="button" onClick={(e) => handleSubmit(e)}>
          <BiSearch />
        </BtnSearch>
        <input
          name="search"
          type="text"
          placeholder="Digite aqui para buscar..."
          value={filter.search}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div onClick={() => setOpenCombo(!openCombo)} role="presentation">
        <ul>
          {
            filters.map((item, index) => <li role="presentation" onClick={() => setSelectedCombo(index)} key={index}>{renderFilter(item)}</li>)
          }
        </ul>
        <BtnCombo type="button" onClick={() => setOpenCombo(!openCombo)}>
          <BiCaretDown />
        </BtnCombo>
      </div>
    </Search>
  );
}

SearchBar.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape()),
  renderFilter: PropTypes.func,
  submit: PropTypes.func,
};

SearchBar.defaultProps = {
  filters: [],
  renderFilter: null,
  submit: null,
};
