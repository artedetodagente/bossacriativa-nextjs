/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { Search, BtnSearch } from './styles';

export default function SearchBar({ submit }) {
  const [filter, setFilter] = useState({ search: '' });
  const campoBusca = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    submit(filter);
  }

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        submit({ ...filter, search: event.target.value });
      } else if (event.key === 'Enter') {
        submit({ ...filter, search: event.target.value });
        campoBusca.current.blur();
      }
    };
    campoBusca.current.addEventListener('keypress', listener);
    return () => {
      campoBusca.current.removeEventListener('keypress', listener);
    };
  }, []);

  return (
    <Search>
      <div>
        <BtnSearch type="button" onClick={(e) => handleSubmit(e)}>
          <BiSearch />
        </BtnSearch>
        <input
          ref={campoBusca}
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
