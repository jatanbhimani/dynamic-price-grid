import { Box, Button, Card, Flex } from "@radix-ui/themes";
import SelectData from "./Select";
import { useContext, useState } from "react";
import { ColumnContext } from "../App";

const Search = () => {
  const { rows, columns, tabs, searchedTab, searchedRow, searchedColumn, price, setPrice, data } = useContext(ColumnContext);

  const [isRowSetForSearch, setIsRowSetForSearch] = useState(false);
  const [isColumnSetForSearch, setIsColumnSetForSearch] = useState(false);
  const [isTabSetForSearch, setIsTabSetForSearch] = useState(false);

  const handleSearch = () => {

    // Implement your search logic here
    setPrice(data[searchedTab.current][searchedRow.current][searchedColumn.current]);
  }

  return (
    <>
      <Flex gap="6" justify="center" align="center">
        <Box>
          <Card className="mt-5">
            <Flex gap="6" justify="center" align="center">
              <SelectData data={tabs} isSet={setIsTabSetForSearch} searchedData={searchedTab} />
              <SelectData data={rows} isSet={setIsRowSetForSearch} searchedData={searchedRow} />
              <SelectData data={columns} isSet={setIsColumnSetForSearch} searchedData={searchedColumn}/>
              <Button
                variant="soft"
                disabled={
                  !(
                    isTabSetForSearch &&
                    isColumnSetForSearch &&
                    isRowSetForSearch
                  )
                }

                onClick={handleSearch}
              >
                Search
              </Button>
            </Flex>
          </Card>
        </Box>
      </Flex>
    </>
  );
};

export default Search;
