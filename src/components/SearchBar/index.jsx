import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearch, BiCaretDown } from 'react-icons/bi';
import { Search, BtnSearch, BtnCombo } from './styles';

export default function SearchBar({
  filters, renderFilter, submit,
}) {
  const [filter, setFilter] = useState({ search: '' });
  const [openCombo, setOpenCombo] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    submit(filter);
  }

  return (
    <Search openCombo={openCombo}>
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
            filters.map((item, index) => <li key={index}>{renderFilter(item)}</li>)
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
