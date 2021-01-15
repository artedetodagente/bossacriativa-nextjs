import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { Search } from './styles';

export default function SearchBar({
  options, identity, renderOption, submit,
}) {
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
      <form action="POST" onSubmit={(e) => handleSubmit(e)}>
        <button type="submit">
          <BiSearch />
        </button>
        <input
          name="search"
          type="text"
          placeholder="Digite aqui para buscar..."
          value={filter.search}
          onChange={(e) => handleChange(e)}
        />
      </form>
      <ul>
        {
          options.map((item) => <li key={item[identity]}>{renderOption(item)}</li>)
        }
      </ul>
    </Search>
  );
}

SearchBar.propTypes = {
  identity: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape()),
  renderOption: PropTypes.func,
  submit: PropTypes.func,
};

SearchBar.defaultProps = {
  identity: 'id',
  options: [],
  renderOption: null,
  submit: null,
};
