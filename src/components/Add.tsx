import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TYPES } from "../constants/constants";
import List from "./List";
import { ComplexPerson, SimplePerson } from "./Person";
import { CommonWrapper } from "./SimpleComponents";

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

interface Props {
  people: SimplePerson[];
  editPerson: ComplexPerson | null | undefined;
  onSave: (person: ComplexPerson) => void;
  onEdit: (person: ComplexPerson) => void;
  onCancel: () => void;
}

const Add = ({ people, editPerson, onEdit, onSave, onCancel }: Props) => {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);

  const [id, setId] = useState<string | undefined>("");
  const [firstname, setFirstname] = useState<string | undefined>("");
  const [lastname, setLastname] = useState<string | undefined>("");
  const [birthdate, setBirthdate] = useState<string | undefined>("");
  const [latestContact, setLatestContact] = useState<string | undefined>("");
  const [address, setAddress] = useState<string | undefined>("");
  const [notes, setNotes] = useState<string | undefined>("");
  const [type, setType] = useState("");
  const [significantOther, setSignificantOther] = useState<SimplePerson[]>([]);
  const [parents, setParents] = useState<SimplePerson[]>([]);
  const [children, setChildren] = useState<SimplePerson[]>([]);
  const [friends, setFriends] = useState<SimplePerson[]>([]);
  const [colleagues, setColleagues] = useState<SimplePerson[]>([]);

  useEffect(() => {
    if (!firstnameRef) return;
    firstnameRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (!editPerson) {
      setId("");
      setFirstname("");
      setLastname("");
      setBirthdate("");
      setLatestContact("");
      setAddress("");
      setNotes("");
      setSignificantOther([]);
      setParents([]);
      setChildren([]);
      setFriends([]);
      setColleagues([]);
      return;
    }
    setId(editPerson.id);
    setFirstname(editPerson.firstname);
    setLastname(editPerson.lastname);
    setBirthdate(editPerson.birthdate);
    setLatestContact(editPerson.latestContact);
    setAddress(editPerson.address);
    setNotes(editPerson.notes);
    setSignificantOther(editPerson.significantOther);
    setParents(editPerson.parents);
    setChildren(editPerson.children);
    setFriends(editPerson.friends);
    setColleagues(editPerson.colleagues);
  }, [editPerson]);

  const handleSave = () => {
    if (!firstname && !lastname) {
      setFirstnameError(true);
      setLastnameError(true);
      return;
    }
    if (!firstname) {
      setFirstnameError(true);
      return;
    }
    if (!lastname) {
      setLastnameError(true);
      return;
    }
    if (id) {
      onEdit({
        id,
        firstname,
        lastname,
        birthdate,
        latestContact,
        address,
        notes,
        significantOther,
        parents,
        children,
        friends,
        colleagues,
      });
      return;
    }
    onSave({
      id: uuidv4(),
      firstname,
      lastname,
      birthdate,
      latestContact,
      address,
      notes,
      significantOther,
      parents,
      children,
      friends,
      colleagues,
    });
  };
  const handleTypeChange = (e: any) => {
    setType(e.target.value);
  };
  const handleConnectionChange = (e: any) => {
    const newConnection = people?.find((p) => p.id === e.target.value);
    if (!newConnection) return;
    switch (type) {
      case "Significant other":
        if (significantOther?.length > 0) {
          setSignificantOther([...significantOther, newConnection]);
          return;
        }
        setSignificantOther([newConnection]);
        return;
      case "Parent":
        if (parents?.length > 0) {
          setParents([...parents, newConnection]);
          return;
        }
        setParents([newConnection]);
        return;
      case "Child":
        if (children?.length > 0) {
          setChildren([...children, newConnection]);
          return;
        }
        setChildren([newConnection]);
        return;
      case "Friend":
        if (friends?.length > 0) {
          setFriends([...friends, newConnection]);
          return;
        }
        setFriends([newConnection]);
        return;
      case "Colleague":
        if (colleagues?.length > 0) {
          setColleagues([...colleagues, newConnection]);
          return;
        }
        setColleagues([newConnection]);
        return;
      default:
        return;
    }
  };
  const handleRemove = (id: string, title: string) => {
    if (title === "significant other") {
      setSignificantOther(significantOther.filter((c) => c.id !== id));
    }
    if (title === "parents") {
      setParents(parents.filter((c) => c.id !== id));
    }
    if (title === "children") {
      setChildren(children.filter((c) => c.id !== id));
    }
    if (title === "friends") {
      setFriends(friends.filter((c) => c.id !== id));
    }
    if (title === "colleagues") {
      setColleagues(colleagues.filter((c) => c.id !== id));
    }
  };

  return (
    <Wrapper>
      <Title>{id ? "Edit" : "Add"} person</Title>
      <Input
        ref={firstnameRef}
        placeholder="Firstname"
        value={firstname}
        onChange={(e) => {
          setFirstname(e.target.value);
          setFirstnameError(false);
        }}
        error={firstnameError}
      />
      <Input
        placeholder="Lastname"
        value={lastname}
        onChange={(e) => {
          setLastname(e.target.value);
          setLastnameError(false);
        }}
        error={lastnameError}
      />
      <Input
        placeholder="Birthdate (e.g 1988-01-30)"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      <Input
        placeholder="Last contact (e.g 2020-11-24)"
        value={latestContact}
        onChange={(e) => setLatestContact(e.target.value)}
      />
      <Input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      {people.length > 0 && (
        <>
          <Label>{type ? "Change" : "Add"} connection type</Label>
          <Select onChange={handleTypeChange}>
            {!type && <option>Select type</option>}
            {TYPES.map((t) => (
              <option>{t}</option>
            ))}
          </Select>
          {type && (
            <>
              <Label>Add connection</Label>
              <Select onChange={handleConnectionChange}>
                <option>Select person</option>
                {people
                  .filter((p) => p.id !== id)
                  .map((p: SimplePerson) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
              </Select>
            </>
          )}
        </>
      )}
      {significantOther.length !== 0 && (
        <List
          title="Significant Other"
          list={significantOther}
          handleSelect={handleRemove}
        />
      )}
      {parents.length !== 0 && (
        <List title="Parents" list={parents} handleSelect={handleRemove} />
      )}
      {children.length !== 0 && (
        <List title="Children" list={children} handleSelect={handleRemove} />
      )}
      {friends.length !== 0 && (
        <List title="Friends" list={friends} handleSelect={handleRemove} />
      )}
      {colleagues.length !== 0 && (
        <List
          title="Colleagues"
          list={colleagues}
          handleSelect={handleRemove}
        />
      )}
      <Buttons>
        <Button disabled={firstnameError || lastnameError} onClick={handleSave}>
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Buttons>
    </Wrapper>
  );
};

const Wrapper = styled(CommonWrapper)`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  margin: 0 0 14px;
`;
const Input = styled.input<{ error?: boolean }>`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 12px;
  border-radius: 6px;
  ${(p) =>
    p.error &&
    `
    background-color: #ffeeee;
    border: 2px solid red;
  `}
`;
const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 12px;
  border-radius: 6px;
  font-family: inherit;
  min-height: 40px;
  resize: vertical;
`;
const Buttons = styled.div`
  display: flex;
`;
const Button = styled.button`
  font-size: 22px;
  padding: 15px;
  border-radius: 6px;
  width: 100%;
  border: none;
  background-color: #444;
  color: #fff;
  cursor: pointer;
  :hover {
    background-color: #333;
  }
  :active {
    background-color: #000;
  }
  :disabled {
    opacity: 0.2;
  }
  :last-child {
    margin-left: 10px;
    background-color: #992222;
    :hover {
      background-color: #771111;
    }
    :active {
      background-color: #550000;
    }
  }
`;
const Label = styled.label`
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 600;
`;
const Select = styled.select`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 6px;
`;

export default Add;
