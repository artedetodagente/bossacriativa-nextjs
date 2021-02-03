import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { Search } from './styles';

export default function SearchBar({
  filters, renderFilter, submit,
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
      <div>
        <button type="button" onClick={(e) => handleSubmit(e)}>
          <BiSearch />
        </button>
        <input
          name="search"
          type="text"
          placeholder="Digite aqui para buscar..."
          value={filter.search}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <ul>
        {
          filters.map((item, index) => <li key={index}>{renderFilter(item)}</li>)
        }
      </ul>
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
