import React from "react";
import styled from "styled-components";
import { cloudUpload } from "../svgs/cloud-upload";
import { SimplePerson } from "./Person";
import SVG from "./SVG";

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
        <Opacity>No {title?.toLowerCase()} added...</Opacity>
      )}
      {list.map((item?: SimplePerson) => (
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
          {item?.extra && <Opacity>{item.extra}</Opacity>}
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
const Opacity = styled.span`
  opacity: 0.5;
`;
const Text = styled.span`
  margin-right: 6px;
`;

export default List;
