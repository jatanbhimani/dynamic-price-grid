import { Box, Button, Flex, Popover, TextArea } from "@radix-ui/themes";
import React, { useContext } from "react";
import { ColumnContext } from "../App";

const ColumnPopover = () => {
  const {columns, columnName, setColumn} = useContext(ColumnContext);

  const addColumn = (columnName) => {
    const newKey = `col${columns.length + 1}`;
    setColumn([...columns, {
        key : newKey,
        value: columnName.current
    }]);

    columnName.current = "";
  };
  return (
    <>
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="soft">+</Button>
        </Popover.Trigger>
        <Popover.Content width="360px">
          <Flex gap="3">
            <Box flexGrow="1">
              <TextArea
                placeholder="Write Column Name"
                style={{ height: 80 }}
                onInput={(e) => (columnName.current = e.target.value)}
              />
              <Flex gap="3" mt="3" justify="between">
                <Popover.Close>
                  <Button onClick={() => addColumn(columnName)} size="1">
                    Save
                  </Button>
                </Popover.Close>
              </Flex>
            </Box>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </>
  );
};

export default ColumnPopover;
