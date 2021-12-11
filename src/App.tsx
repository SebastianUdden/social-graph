import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import Add from "./components/Add";
import Heading from "./components/Heading";
import ImportExport from "./components/ImportExport";
import People from "./components/People";
import Person, { ComplexPerson, SimplePerson } from "./components/Person";
import { byName } from "./components/utils";
import { SOCIAL_GRAPH_LOCALSTORAGE } from "./constants/constants";

interface DiffResult {
  newPerson: ComplexPerson;
  type: string;
  isLonger: boolean;
  personLinks: SimplePerson[];
}

const diff = (
  type: string,
  oldPersonArray: SimplePerson[],
  newPersonArray: SimplePerson[]
) => {
  if (
    newPersonArray.length !== 0 &&
    newPersonArray.length > oldPersonArray.length
  ) {
    return {
      type,
      isLonger: true,
      personLinks: newPersonArray.filter(
        (np) => !oldPersonArray.some((op) => op.id === np.id)
      ),
    };
  }
  if (
    oldPersonArray.length !== 0 &&
    oldPersonArray.length > newPersonArray.length
  ) {
    return {
      type,
      isLonger: false,
      personLinks: oldPersonArray.filter(
        (np) => !newPersonArray.some((op) => op.id === np.id)
      ),
    };
  }
  return false;
};

const checkDiff = (oldPerson: ComplexPerson, newPerson: ComplexPerson) => {
  const diffArray = [];
  const significantOtherDiff = diff(
    "Significant other",
    oldPerson.significantOther,
    newPerson.significantOther
  );
  const parentsDiff = diff("Parent", oldPerson.parents, newPerson.parents);
  const childrenDiff = diff("Child", oldPerson.children, newPerson.children);
  const friendsDiff = diff("Friend", oldPerson.friends, newPerson.friends);
  const colleaguesDiff = diff(
    "Colleague",
    oldPerson.colleagues,
    newPerson.colleagues
  );

  if (significantOtherDiff)
    diffArray.push({ ...significantOtherDiff, newPerson });
  if (parentsDiff) diffArray.push({ ...parentsDiff, newPerson });
  if (childrenDiff) diffArray.push({ ...childrenDiff, newPerson });
  if (friendsDiff) diffArray.push({ ...friendsDiff, newPerson });
  if (colleaguesDiff) diffArray.push({ ...colleaguesDiff, newPerson });
  return { diffArray, newPerson };
};

const createSimplePerson = (complexPerson: ComplexPerson) => {
  const { id, firstname, lastname } = complexPerson;
  return { id, name: `${firstname} ${lastname}` };
};

const getNewPeople = (
  people: ComplexPerson[],
  diffArray: DiffResult[],
  newPerson: ComplexPerson
) => {
  const newPeople = people.map((p) => {
    const diff = diffArray.find((d) =>
      d?.personLinks.some((pl: any) => pl?.id === p.id)
    );
    if (p.id === newPerson.id) return newPerson;
    if (!diff) {
      return p;
    }
    const editPerson = { ...p, hasBackup: false };
    if (diff.type === "Significant other") {
      if (!diff.isLonger) {
        return {
          ...editPerson,
          significantOther: editPerson.significantOther.filter(
            (c) => c.id !== diff.newPerson.id
          ),
        };
      }
      const { id, firstname, lastname } = diff.newPerson;
      const np = { id, name: `${firstname} ${lastname}` };
      const result = {
        ...editPerson,
        significantOther: [...editPerson.significantOther, np],
      };
      return result;
    }
    if (diff.type === "Parent") {
      if (!diff.isLonger) {
        return {
          ...editPerson,
          children: editPerson.children.filter(
            (c) => c.id !== diff.newPerson.id
          ),
        };
      }
      const result = {
        ...editPerson,
        children: [...editPerson.children, createSimplePerson(diff.newPerson)],
      };
      return result;
    }
    if (diff.type === "Child") {
      if (!diff.isLonger) {
        return {
          ...editPerson,
          parents: editPerson.parents.filter((c) => c.id !== diff.newPerson.id),
        };
      }
      const result = {
        ...editPerson,
        parents: [...editPerson.parents, createSimplePerson(diff.newPerson)],
      };
      return result;
    }
    if (diff.type === "Friend") {
      if (!diff.isLonger) {
        return {
          ...editPerson,
          friends: editPerson.friends.filter((c) => c.id !== diff.newPerson.id),
        };
      }
      const result = {
        ...editPerson,
        friends: [...editPerson.friends, createSimplePerson(diff.newPerson)],
      };
      return result;
    }
    if (diff.type === "Colleague") {
      if (!diff.isLonger) {
        return {
          ...editPerson,
          colleagues: editPerson.colleagues.filter(
            (c) => c.id !== diff.newPerson.id
          ),
        };
      }
      const result = {
        ...editPerson,
        colleagues: [
          ...editPerson.colleagues,
          createSimplePerson(diff.newPerson),
        ],
      };
      return result;
    }

    return p;
  });
  return newPeople;
};

function App() {
  const [selectionHistory, setSelectionHistory] = useState<any>([]);
  const [selectedPerson, setSelectedPerson] = useState<any>({});
  const [selectedTab, setSelectedTab] = useState<number>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [people, setPeople] = useState<ComplexPerson[] | null>([]);
  const [peopleLength, setPeopleLength] = useState<number>(0);
  const [editPerson, setEditPerson] = useState<ComplexPerson | null>();

  const updateLinkedDiffs = ({
    diffArray,
    newPerson,
    brandNew,
  }: {
    diffArray: DiffResult[];
    newPerson: ComplexPerson;
    brandNew?: boolean;
  }) => {
    if (!people) return;

    const newPeople = getNewPeople(people, diffArray, newPerson);
    if (brandNew) {
      setPeople([...newPeople, newPerson]);
      return;
    }
    setPeople(newPeople);
  };

  useEffect(() => {
    const data = localStorage.getItem(SOCIAL_GRAPH_LOCALSTORAGE);
    if (!data) return;
    const { selectedPerson: s, selectedTab: t, people: p } = JSON.parse(data);
    setSelectedPerson(s);
    setSelectedTab(t);
    setPeople(p);
  }, []);

  useEffect(() => {
    if (!people) return;
    const newSelectedPerson = people[people.length - 1];
    localStorage.setItem(
      SOCIAL_GRAPH_LOCALSTORAGE,
      JSON.stringify({
        people,
        selectedPerson:
          people.length !== peopleLength ? newSelectedPerson : selectedPerson,
        selectedTab: people.length === 0 ? 0 : selectedTab,
      })
    );
    if (people.length !== peopleLength) {
      setSelectedPerson(newSelectedPerson);
    }
    if (people.length === 0) {
      setSelectedTab(0);
    }
    setPeopleLength(people.length);

    // eslint-disable-next-line
  }, [people]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(SOCIAL_GRAPH_LOCALSTORAGE) || "{}"
    );
    localStorage.setItem(
      SOCIAL_GRAPH_LOCALSTORAGE,
      JSON.stringify({
        ...data,
        selectedTab,
      })
    );
  }, [selectedTab]);

  if (!people) return <></>;

  return (
    <div>
      <Heading
        firstTimeVisitor={people.length === 0}
        selectedTab={selectedTab}
        onSelectTab={(tab: number) => {
          setEditPerson(undefined);
          setSelectedTab(tab);
        }}
        onSearch={(query: string) => {
          setSelectedTab(2);
          setSearchQuery(query);
        }}
      />
      <Content>
        {selectedTab === 0 && (
          <Add
            people={people.map((p) => ({
              id: p.id,
              name: `${p.firstname} ${p.lastname}`,
            }))}
            editPerson={editPerson}
            onSave={(person: ComplexPerson) => {
              updateLinkedDiffs({
                ...checkDiff(
                  {
                    id: "",
                    firstname: "",
                    lastname: "",
                    significantOther: [],
                    parents: [],
                    children: [],
                    friends: [],
                    colleagues: [],
                  },
                  person
                ),
                brandNew: true,
              });
              setSelectedTab(1);
            }}
            onEdit={async (person: ComplexPerson) => {
              people.forEach((p) => {
                if (p.id === person.id) {
                  updateLinkedDiffs(checkDiff(p, person));
                }
                return p;
              });
              setSelectedPerson(person);
              setSelectedTab(1);
            }}
            onCancel={() => setSelectedTab(2)}
          />
        )}
        {selectedTab === 1 && (
          <Person
            {...selectedPerson}
            handleSelect={(value: string) => {
              setSelectionHistory([...selectionHistory, selectedPerson]);
              setSelectedPerson(
                people.find((p) => value === p.id) || selectedPerson
              );
            }}
            onEdit={(person: ComplexPerson) => {
              setSelectedTab(0);
              console.log({ person });
              setEditPerson(person);
            }}
            onDelete={(id: string) => {
              setPeople(people.filter((p) => p.id !== id));
            }}
          />
        )}
        {selectedTab === 2 && (
          <People
            people={people
              .map((p) => ({
                id: p.id,
                name: `${p.firstname} ${p.lastname}`,
                hasBackup: p.hasBackup,
              }))
              .filter((p) => {
                if (!searchQuery) return true;
                if (p.name.includes(searchQuery)) return true;
                return false;
              })
              .sort(byName)}
            handleSelect={(value: string) => {
              setSelectionHistory([...selectionHistory, selectedPerson]);
              setSelectedPerson(
                people.find((p) => value === p.id) || selectedPerson
              );
              setSelectedTab(1);
            }}
          />
        )}
        {selectedTab === 3 && (
          <ImportExport firstTimeVisitor={people.length === 0} />
        )}
      </Content>
    </div>
  );
}

const Content = styled.div`
  padding: 0 10px;
`;

export default App;
