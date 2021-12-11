import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  onSearch: Function;
}

const Search = ({ onSearch }: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <Wrapper>
      <Input
        type="search"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 65%;
`;
const Input = styled.input`
  width: 100%;
  padding: 13px;
  font-size: 16px;
`;

export default Search;
