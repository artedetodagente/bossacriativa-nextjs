/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { Search, BtnSearch } from './styles';

export default function SearchBar({ submit }) {
  const [filter, setFilter] = useState({ search: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    submit(filter);
  }

  return (
    <Search>
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
    </Search>
  );
}

SearchBar.propTypes = {
  submit: PropTypes.func,
};

SearchBar.defaultProps = {
  submit: null,
};
