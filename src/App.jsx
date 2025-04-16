import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Box, Text, Button, Flex } from "@radix-ui/themes";
import { createContext, useRef, useState } from "react";
import Grid from "./components/Grid";
import DataTable from "./components/Table";
import { TrashIcon } from "@radix-ui/react-icons";
import { handleDelete, handleSaveData } from "./helpers/helper";

export const ColumnContext = createContext();

function App() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const variantName = useRef("");

  // Column Data
  const [columns, setColumn] = useState([]);
  const columnName = useRef("");

  //Row Data
  const [rows, setRow] = useState([]);
  const rowName = useRef("");

  //Data
  const [data, setData] = useState([]);

  return (
    <>
      <Tabs.Root
        value={activeTab}
        onValueChange={(val) => {
          setActiveTab(val);
        }}
      >
        <Tabs.List>
          {tabs.map((tab, tIndx) => (
            <Tabs.Trigger key={tIndx} value={tIndx.toString()}>
              <Flex gap="2" justify="between" align="center">
                {tab.label}
                <TrashIcon color="red"
                  onClick={(e) => {
                    e.stopPropagation(); // 🔥 prevents tab change
                    handleDelete(tIndx, tabs, setTabs);
                  }}
                />
              </Flex>
            </Tabs.Trigger>
          ))}

          <Grid tabs={tabs} setTabs={setTabs} variantName={variantName} />
        </Tabs.List>

        <Box pt="3">
          <ColumnContext.Provider
            value={{
              columns,
              columnName,
              setColumn,
              rowName,
              rows,
              setRow,
              activeTab,
              data,
              setData,
            }}
          >
            {tabs.length === 0 ? (
              <Text className="text-center text-muted">
                No tab content to display
              </Text>
            ) : (
              tabs.map((tab, tIndx) => (
                <Tabs.Content key={tIndx} value={tIndx.toString()}>
                  <DataTable />
                </Tabs.Content>
              ))
            )}
          </ColumnContext.Provider>
        </Box>
      </Tabs.Root>
      {tabs.length > 0 && (
        <Button onClick={() => handleSaveData(data)} className="mt-3">
          Save
        </Button>
      )}
    </>
  );
}

export default App;
