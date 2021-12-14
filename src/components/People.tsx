import { useState } from "react";
import styled from "styled-components";
import {
  AGE,
  BIRTHDAY,
  FIRSTNAME,
  LASTNAME,
  NEXT_BIRTHDAY,
} from "../constants/constants";
import List from "./List";
import { ComplexPerson } from "./Person";
import { CommonWrapper } from "./SimpleComponents";
import { getAge, getDaysUntilBirthDate, sortBy } from "./utils";

const options = [FIRSTNAME, LASTNAME, AGE, NEXT_BIRTHDAY, BIRTHDAY];

const getExtra = (type: string, p: ComplexPerson) => {
  if (type === AGE) {
    const age = getAge(p.birthdate || "");
    return isNaN(age) ? "Not available" : age;
  }
  if (type === NEXT_BIRTHDAY) {
    const days = getDaysUntilBirthDate(p.birthdate || "");
    return isNaN(days) ? "Not available" : days;
  }
  if (type === BIRTHDAY) {
    const birthdate = p.birthdate;
    return birthdate || "Not available";
  }
  return undefined;
};

interface Props {
  people: ComplexPerson[];
  handleSelect: Function;
}

const People = ({ people, handleSelect }: Props) => {
  const [sortType, setSortType] = useState(options[0]);
  const [isAscending, setIsAscending] = useState(true);

  const handleChange = (e: any) => {
    setSortType(e.target.value);
  };

  const sortedPeople = people.sort((a, b) =>
    sortBy(sortType, isAscending, a, b)
  );

  return (
    <CommonWrapper>
      <Title>People</Title>
      <SortWrapper>
        Sort by:{" "}
        <Select onChange={handleChange}>
          {options.map((o) => (
            <Option value={o}>{o}</Option>
          ))}
        </Select>
        <Button onClick={() => setIsAscending(!isAscending)}>
          {isAscending ? <>&uarr;</> : <>&darr;</>}
        </Button>
      </SortWrapper>
      {people.length !== 0 ? (
        <List
          list={sortedPeople.map((p) => ({
            id: p.id,
            name:
              sortType === LASTNAME
                ? `${p.lastname}, ${p.firstname}`
                : `${p.firstname} ${p.lastname}`,
            hasBackup: p.hasBackup,
            extra: getExtra(sortType, p),
          }))}
          handleSelect={handleSelect}
        />
      ) : (
        <Text>No results found...</Text>
      )}
    </CommonWrapper>
  );
};

const Title = styled.h1`
  margin: 0 0 14px;
`;
const Text = styled.p`
  opacity: 0.5;
`;
const SortWrapper = styled.div`
  margin-bottom: 12px;
`;
const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  :hover {
    background-color: #ddd;
  }
`;
const Option = styled.option`
  text-transform: capitalize;
`;
const Button = styled.button`
  box-sizing: border-box;
  border: none;
  padding: 8px;
  border-radius: 6px;
  background-color: inherit;
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  margin: 5px;
  cursor: pointer;
  :hover {
    color: orange;
  }
  :active {
    color: #000;
  }
`;

export default People;
