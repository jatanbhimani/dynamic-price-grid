import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Tabs,
  Box,
  Text,
  Button,
  Flex,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { createContext, useRef, useState } from "react";
import Grid from "./components/Grid";
import DataTable from "./components/Table";
import { TrashIcon } from "@radix-ui/react-icons";
import { handleDelete, handleSaveData } from "./helpers/helper";
import Search from "./components/Search";

export const ColumnContext = createContext();

function App() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const variantName = useRef("");

  const [editingTabIndex, setEditingTabIndex] = useState(null);
  const [tempTabValue, setTempTabValue] = useState("");

  // Column Data
  const [columns, setColumn] = useState([]);
  const columnName = useRef("");

  // Row Data
  const [rows, setRow] = useState([]);
  const rowName = useRef("");

  // Data
  const [data, setData] = useState([]);

  // Search Value
  const searchedRow = useRef("");
  const searchedColumn = useRef("");
  const searchedTab = useRef("");

  // Answer (Price)
  const [price, setPrice] = useState("");

  const handleTabDoubleClick = (idx, currentValue) => {
    setEditingTabIndex(idx);
    setTempTabValue(currentValue);
  };

  const saveTabEdit = (idx) => {
    const updatedTabs = [...tabs];
    updatedTabs[idx].value = tempTabValue;
    setTabs(updatedTabs);
    setEditingTabIndex(null);
  };

  const handleTabKeyDown = (e, idx) => {
    if (e.key === "Enter") saveTabEdit(idx);
  };

  return (
    <>
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
          tabs,
          searchedTab,
          searchedColumn,
          searchedRow,
          price,
          setPrice,
        }}
      >
        <Tabs.Root
          value={activeTab}
          onValueChange={(val) => {
            setActiveTab(val);
          }}
        >
          <Tabs.List>
            {tabs.map((tab, tIndx) => (
              <Tabs.Trigger key={tIndx} value={tIndx.toString()}>
                <Tooltip content="Double click to edit">
                  <Flex
                    gap="2"
                    justify="between"
                    align="center"
                    onDoubleClick={() => handleTabDoubleClick(tIndx, tab.value)}
                  >
                    {editingTabIndex === tIndx ? (
                      <TextField.Root
                        autoFocus
                        value={tempTabValue}
                        onChange={(e) => setTempTabValue(e.target.value)}
                        onBlur={() => saveTabEdit(tIndx)}
                        onKeyDown={(e) => handleTabKeyDown(e, tIndx)}
                        size="1"
                      />
                    ) : (
                      tab.value
                    )}
                    {activeTab === tIndx.toString() && (
                      <TrashIcon
                        color="red"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(tIndx, tabs, setTabs);
                        }}
                      />
                    )}
                  </Flex>
                </Tooltip>
              </Tabs.Trigger>
            ))}
            <Grid tabs={tabs} setTabs={setTabs} variantName={variantName} />
          </Tabs.List>

          <Box pt="3">
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
          </Box>
        </Tabs.Root>

        {tabs.length > 0 && (
          <>
            <Button onClick={() => handleSaveData(data)} className="mt-3">
              Save
            </Button>
            <Search className="mt-5" />
          </>
        )}

        <Text className="text-center mt-3">
          {price !== ""
            ? `Price: ${price}`
            : "Search for a price by selecting a tab, row, and column."}
        </Text>
      </ColumnContext.Provider>
    </>
  );
}

export default App;
