import { useState } from "react";
import styled from "styled-components";
import SVG from "./SVG";
import { cloudUpload } from "../svgs/cloud-upload";
import { cloudDownload } from "../svgs/cloud-download";
import {
  SOCIAL_GRAPH,
  SOCIAL_GRAPH_FILENAME,
  SOCIAL_GRAPH_LOCALSTORAGE,
} from "../constants/constants";
import { CommonWrapper } from "./SimpleComponents";

const Wrapper = styled(CommonWrapper)`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button<{ disabled?: boolean }>`
  background-color: #666;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
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
  ${(p) =>
    p.disabled &&
    `
    :hover {
      cursor: default;
      background-color: black;
      color: white;
    }
  `}
`;
const Strong = styled.strong`
  color: #dd0000;
`;
const Text = styled.span`
  margin-left: 8px;
`;
const Title = styled.h1`
  margin: 0 0 14px;
`;

const createFile = (data: any, filename: any, type: any) => {
  const file = new Blob([data], { type: type });
  var a = document.createElement("a"),
    url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  a.style.color = "white";
  const exportEl = document.getElementById("export");
  if (exportEl) {
    exportEl.style.marginTop = "15px";
    var text = document.createTextNode(SOCIAL_GRAPH_FILENAME);
    a.appendChild(text);
    exportEl.appendChild(a);
  }
};

const addZero = (value: any) => {
  const number = Number.parseInt(value);
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};

const exportData = () => {
  const dataPointsString =
    localStorage.getItem(SOCIAL_GRAPH_LOCALSTORAGE) || "";
  const dataPoints = JSON.parse(dataPointsString);
  const dataPointsWithBackupCheck = dataPoints.people.map((item: any) => ({
    ...item,
    hasBackup: true,
  }));
  const result = JSON.stringify({
    ...dataPoints,
    people: dataPointsWithBackupCheck,
  });
  localStorage.setItem(SOCIAL_GRAPH_LOCALSTORAGE, result);
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = addZero(now.getUTCMonth());
  const date = addZero(now.getUTCDate());
  const hours = addZero(now.getUTCHours());
  const minutes = addZero(now.getUTCMinutes());

  createFile(
    JSON.stringify(result),
    `${SOCIAL_GRAPH}-${year}-${month}-${date}_${hours}-${minutes}.json`,
    "application/json"
  );
};

const parseBlob = (blob: any) => {
  const data =
    JSON.parse(blob) || localStorage.getItem(SOCIAL_GRAPH_LOCALSTORAGE);
  localStorage.setItem(SOCIAL_GRAPH_LOCALSTORAGE, data);
  window.location.reload();
};

const ImportExport = ({ firstTimeVisitor }: { firstTimeVisitor: boolean }) => {
  const [showImport, setShowImport] = useState(false);

  const onFileUpload = async (e: any) => {
    const blob = e.target.files[0];
    if (blob && blob.text) {
      blob.text().then(parseBlob);
    } else if (blob) {
      const text = await new Response(blob).text();
      parseBlob(text);
    }
  };

  return (
    <Wrapper>
      <Title>Import/Export data</Title>
      <p>
        The social graph application is only storing data on your local device
        in order to keep your data safe. If you do wish to use your data on
        multiple devices you need to export the data from the device you're
        using then import the data on the device you wish to use.
      </p>
      <p>
        Exporting data is also a good practice for keeping backups in case the
        localstorage gets corrupted, if you lose your device or if it would get
        stolen etc.
      </p>
      {!firstTimeVisitor && (
        <>
          <Button onClick={() => exportData()}>
            <SVG {...cloudDownload} />
            <Text>Export data</Text>
          </Button>
          <div id="export" />
          <ul>
            <li>Creates a backup file containing all the rememory data</li>
            <li>Send this file to your other device, then...</li>
          </ul>
        </>
      )}
      <Button onClick={() => setShowImport(true)} disabled={showImport}>
        <SVG {...cloudUpload} />
        <Text>Import data</Text>
      </Button>
      <ul>
        {showImport && (
          <>
            <li>
              <Strong>DANGER!</Strong> When choosing a file, the old data is
              removed and replaced, <Strong>this can't be undone!</Strong>
            </li>
            <li>
              <input type="file" id="input" onChange={onFileUpload}></input>
            </li>
          </>
        )}
        <li>Upload a file containing all the rememory data</li>
        <li>
          Note that this will <strong>remove any existing data</strong> from
          this device!
        </li>
      </ul>
    </Wrapper>
  );
};

export default ImportExport;
