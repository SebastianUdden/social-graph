import React from "react";
import styled from "styled-components";

export interface GiftProps {
  name?: string;
  price?: number;
  when?: string;
}

const Gift = ({ name, price, when }: GiftProps) => {
  return (
    <Wrapper>
      <P>{name}</P>
      <AdditionalInfo>{when}</AdditionalInfo>
      <AdditionalInfo>{price} kr</AdditionalInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #444;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 5px;
`;
const P = styled.p`
  margin: 3px 0;
`;
const AdditionalInfo = styled(P)`
  opacity: 0.5;
`;

export default Gift;
