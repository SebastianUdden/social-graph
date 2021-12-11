import styled from "styled-components";

export interface JobProps {
  company?: string;
  title?: string;
  startdate?: string;
  enddate?: string;
}

const Job = ({ company, title, startdate, enddate }: JobProps) => (
  <Wrapper>
    <P>{company}</P>
    <AdditionalInfo>{title}</AdditionalInfo>
    <AdditionalInfo>
      {startdate} - {enddate}
    </AdditionalInfo>
  </Wrapper>
);

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

export default Job;
