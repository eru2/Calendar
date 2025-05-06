import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 12px 16px;
  width: 100%;
  max-width: 360px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background-color: #A5C4EE;
  color: #280B0B;

  &::placeholder {
    color: #280B0B;
  }

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const SearchBar = ({ value, onChange }) => (
  <SearchContainer>
    <SearchInput
      type="text"
      placeholder="일정 검색..."
      value={value}
      onChange={onChange}
    />
  </SearchContainer>
);

export default SearchBar;