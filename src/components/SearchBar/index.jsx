import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { Search } from './styles';

export default function SearchBar({
  filters, identity, renderFilter, submit,
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
          filters.map((item) => <li key={item[identity]}>{renderFilter(item)}</li>)
        }
      </ul>
    </Search>
  );
}

SearchBar.propTypes = {
  identity: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.shape()),
  renderFilter: PropTypes.func,
  submit: PropTypes.func,
};

SearchBar.defaultProps = {
  identity: 'id',
  filters: [],
  renderFilter: null,
  submit: null,
};
