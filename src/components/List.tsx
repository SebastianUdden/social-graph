import React from "react";
import styled from "styled-components";
import { cloudUpload } from "../svgs/cloud-upload";
import { SimplePerson } from "./Person";
import SVG from "./SVG";
import { byName } from "./utils";

interface Props {
  title?: string;
  list: SimplePerson[];
  handleSelect?: Function;
}

const List = ({ title, list, handleSelect }: Props) => (
  <Wrapper>
    {title && <Title>{title}</Title>}
    <Graph>
      {list.length === 0 && (
        <NoneText>No {title?.toLowerCase()} added...</NoneText>
      )}
      {list.sort(byName).map((item?: SimplePerson) => (
        <Relation
          key={item?.id}
          onClick={() =>
            handleSelect && handleSelect(item?.id, title?.toLowerCase())
          }
        >
          <Text>{item?.name}</Text>
          {title === "People" && !item?.hasBackup && (
            <SVG size={12} {...cloudUpload} />
          )}
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
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  :hover {
    background-color: #444;
  }
  :active {
    background-color: #000;
  }
`;
const NoneText = styled.span`
  opacity: 0.5;
`;
const Text = styled.span`
  margin-right: 6px;
`;

export default List;
