import styled from "styled-components";
import Gift, { GiftProps } from "./Gift";
import Job, { JobProps } from "./Job";
import List from "./List";
import { CommonWrapper } from "./SimpleComponents";
import { getAge, getDaysUntilBirthDate } from "./utils";

export interface SimplePerson {
  id: string;
  name: string;
  hasBackup?: boolean;
  extra?: string | number;
}

export interface ComplexPerson {
  id: string;
  firstname: string;
  lastname: string;
  notes?: string;
  birthdate?: string;
  latestContact?: string;
  address?: string;
  parents: SimplePerson[];
  significantOther: SimplePerson[];
  children: SimplePerson[];
  friends: SimplePerson[];
  colleagues: SimplePerson[];
  jobs?: JobProps[];
  gifts?: {
    given?: GiftProps[];
    received?: GiftProps[];
  };
  handleSelect?: Function;
  onEdit?: Function;
  onDelete?: Function;
  hasBackup?: boolean;
}

const Person = ({
  id,
  firstname,
  lastname,
  birthdate,
  latestContact,
  address,
  notes,
  parents,
  children,
  significantOther,
  friends,
  colleagues,
  jobs,
  gifts,
  handleSelect,
  onEdit,
  onDelete,
}: ComplexPerson) => {
  if (!id) return <></>;
  const age = getAge(birthdate || "");
  const daysUntilBirthday = getDaysUntilBirthDate(birthdate || "");

  const handleEdit = () => {
    onEdit &&
      onEdit({
        id,
        firstname,
        lastname,
        birthdate,
        latestContact,
        address,
        notes,
        parents,
        children,
        significantOther,
        friends,
        colleagues,
        jobs,
        gifts,
        handleSelect,
      });
  };
  const handleDelete = () => onDelete && onDelete(id);

  return (
    <Wrapper>
      {firstname && lastname && (
        <Name>
          {firstname} {lastname}
        </Name>
      )}
      <TopLeft>
        <SmallButton onClick={handleEdit}>Edit</SmallButton>
        <SmallButton onClick={handleDelete}>Delete</SmallButton>
      </TopLeft>
      {birthdate && <Data>{age} years old</Data>}
      {birthdate && <Data>Next birthday: {daysUntilBirthday} days</Data>}
      {latestContact && <Data>Last contact: {latestContact}</Data>}
      {address && (
        <Data>
          Address:{" "}
          <Address
            href={`https://maps.google.com/?q=${address}`}
            target="_blank"
          >
            {address}
          </Address>
        </Data>
      )}
      <Notes>{notes}</Notes>
      {parents.length !== 0 && (
        <List title="Parents" list={parents} handleSelect={handleSelect} />
      )}
      {significantOther.length !== 0 && (
        <List
          title="Significant Other"
          list={significantOther}
          handleSelect={handleSelect}
        />
      )}
      {children.length !== 0 && (
        <List title="Children" list={children} handleSelect={handleSelect} />
      )}
      {friends.length !== 0 && (
        <List title="Friends" list={friends} handleSelect={handleSelect} />
      )}
      {colleagues.length !== 0 && (
        <List
          title="Colleagues"
          list={colleagues}
          handleSelect={handleSelect}
        />
      )}
      {jobs && (
        <Box>
          <Title>Jobs</Title>
          {jobs?.map((j) => (
            <Job {...j} />
          ))}
        </Box>
      )}
      {gifts?.given && (
        <Box>
          <Title>Given</Title>
          {gifts?.given?.map((g) => (
            <Gift {...g} />
          ))}
        </Box>
      )}
      {gifts?.received && (
        <Box>
          <Title>Received</Title>
          {gifts?.received?.map((g) => (
            <Gift {...g} />
          ))}
        </Box>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(CommonWrapper)``;
const Name = styled.h1`
  margin: 0 0 14px;
`;
const P = styled.p`
  margin: 3px 0;
`;
const Notes = styled(P)`
  margin: 14px 0;
`;
const Data = styled(P)`
  opacity: 0.5;
`;
const Title = styled.h2`
  margin: 0;
`;
const Box = styled.div`
  margin-bottom: 15px;
`;
const Address = styled.a`
  color: inherit;
  :hover {
    color: orange;
  }
  :active {
    color: magenta;
  }
`;
const TopLeft = styled.div`
  position: absolute;
  right: 8px;
  top: 5px;
`;
const SmallButton = styled.button`
  border-radius: 6px;
  padding: 8px;
  background-color: inherit;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export default Person;
