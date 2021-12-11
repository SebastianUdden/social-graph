import React from "react";
import styled from "styled-components";
import { SimplePerson } from "./Person";
import { byName } from "./utils";

interface Props {
  title?: string;
  list: SimplePerson[];
  handleSelect?: Function;
}

const EditList = ({ title, list, handleSelect }: Props) => (
  <Wrapper>
    {title && <Title>{title}</Title>}
    <Graph>
      {list.length === 0 && <Text>No {title?.toLowerCase()} added...</Text>}
      {list.sort(byName).map((item?: SimplePerson) => (
        <Relation
          key={item?.id}
          onClick={() => handleSelect && handleSelect(item?.id)}
        >
          {item?.name}
        </Relation>
      ))}
    </Graph>
  </Wrapper>
);

const Wrapper = styled.div``;
const Graph = styled.div`
  border: 1px solid #444;
  justify-content: space-around;
  border-radius: 6px;
  padding: 5px 10px;
  margin: 0px 0 20px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
const Title = styled.h2`
  margin: 0;
`;
const Relation = styled.button`
  background-color: #666;
  color: #fff;
  border: none;
  padding: 10px;
  width: 100%;
  margin: 5px;

  cursor: pointer;
  :hover {
    background-color: #444;
  }
  :active {
    background-color: #000;
  }
`;
const Text = styled.span`
  opacity: 0.5;
`;

export default EditList;
