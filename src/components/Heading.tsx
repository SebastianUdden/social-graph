import React from "react";
import styled from "styled-components";
import { cloudUpload } from "../svgs/cloud-upload";
import { peopleIcon } from "../svgs/people";
import { personIcon } from "../svgs/person";
import Search from "./Search";
import SVG from "./SVG";

interface Props {
  firstTimeVisitor: boolean;
  selectedTab?: number;
  onSelectTab?: Function;
  onSearch?: Function;
}

const Heading = ({
  firstTimeVisitor,
  selectedTab,
  onSelectTab,
  onSearch,
}: Props) => {
  return (
    <>
      <Container>
        <Wrapper firstTimeVisitor={firstTimeVisitor}>
          <Title>Social Graph</Title>

          <Icons>
            {firstTimeVisitor && (
              <Icon
                selected={selectedTab === 0}
                onClick={() => onSelectTab && onSelectTab(0)}
              >
                <TextWrapper>
                  <Strong>+</Strong>
                </TextWrapper>
              </Icon>
            )}
            <Icon
              selected={selectedTab === 3}
              onClick={() => onSelectTab && onSelectTab(3)}
            >
              <SVGWrapper>
                <SVG {...cloudUpload} />
              </SVGWrapper>
            </Icon>
            {!firstTimeVisitor && (
              <Icon
                selected={selectedTab === 2}
                onClick={() => onSelectTab && onSelectTab(2)}
              >
                <SVGWrapper>
                  <SVG {...peopleIcon} />
                </SVGWrapper>
              </Icon>
            )}
          </Icons>
        </Wrapper>
      </Container>
      {!firstTimeVisitor && (
        <Sticky>
          {onSearch && <Search onSearch={onSearch} />}
          <Icons>
            <Icon
              selected={selectedTab === 0}
              onClick={() => onSelectTab && onSelectTab(0)}
            >
              <TextWrapper>
                <Strong>+</Strong>
              </TextWrapper>
            </Icon>

            <Icon
              selected={selectedTab === 1}
              onClick={() => onSelectTab && onSelectTab(1)}
            >
              <SVGWrapper>
                <SVG {...personIcon} />
              </SVGWrapper>
            </Icon>
          </Icons>
        </Sticky>
      )}
    </>
  );
};

const Container = styled.div`
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: space-between;
`;
const Wrapper = styled.div<{ firstTimeVisitor: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px 15px 0;
  margin-bottom: 1px;
  z-index: 199;
  ${(p) =>
    p.firstTimeVisitor &&
    `
      padding: 15px;
  `}
`;
const Sticky = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -1px;
  background-color: #000;
  color: #fff;
  padding: 15px;
  position: sticky;
  top: -1px;
  z-index: 99;
`;
const Title = styled.h1`
  font-size: 35px;
  margin: 0;
  white-space: nowrap;
`;
const Icons = styled.div``;
const Icon = styled.button<{ selected: boolean }>`
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  border: none;
  background-color: inherit;
  color: inherit;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  margin: 1px;
  :hover {
    background-color: #222;
  }
  ${(p) =>
    p.selected &&
    `
    margin: 0 1px;
    border: 1px solid white;
  `}
`;
const SVGWrapper = styled.div`
  svg {
    box-sizing: border-box;
  }
`;
const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Strong = styled.strong`
  font-size: 28px;
  line-height: 25px;
`;

export default Heading;
