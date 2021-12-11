import styled from "styled-components";
import List from "./List";
import { SimplePerson } from "./Person";
import { CommonWrapper } from "./SimpleComponents";

interface Props {
  people: SimplePerson[];
  handleSelect: Function;
}

const People = ({ people, handleSelect }: Props) => {
  return (
    <CommonWrapper>
      <Title>People</Title>
      {people.length !== 0 ? (
        <List list={people} handleSelect={handleSelect} />
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

export default People;
