import { Box, Button, Flex, Popover, TextArea } from "@radix-ui/themes";
import React, { useContext } from "react";
import { ColumnContext } from "../App";

const RowPopover = () => {
  const {rows, rowName, setRow} = useContext(ColumnContext);

  const addRow = (rowName) => {
    const newKey = `row${rows.length + 1}`;
    setRow([...rows, {
        key : newKey,
        value: rowName.current
    }]);

    rowName.current = "";
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
                placeholder="Write Row Name"
                style={{ height: 80 }}
                onInput={(e) => (rowName.current = e.target.value)}
              />
              <Flex gap="3" mt="3" justify="between">
                <Popover.Close>
                  <Button onClick={() => addRow(rowName)} size="1">
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

export default RowPopover;
