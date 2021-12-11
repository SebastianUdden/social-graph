import styled from "styled-components";
import List from "./List";
import { SimplePerson } from "./Person";

interface Props {
  people: SimplePerson[];
  handleSelect: Function;
}

const People = ({ people, handleSelect }: Props) => {
  return (
    <Wrapper>
      <Title>People</Title>
      {people.length !== 0 ? (
        <List list={people} handleSelect={handleSelect} />
      ) : (
        <Text>No results found...</Text>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #222;
  padding: 30px;
  border-radius: 12px;
  margin: 20px;
  color: #fff;
`;
const Title = styled.h1`
  margin: 0 0 14px;
`;
const Text = styled.p`
  opacity: 0.5;
`;

export default People;
