import { Box, Button, Flex, Popover, TextArea } from "@radix-ui/themes";
import React from "react";

export default function Grid(props) {
  let tabs = props.tabs;
  let variantName = props.variantName;
  let setTabs = props.setTabs;

  const addTab = (variantName) => {
    const newKey = `tab${tabs.length + 1}`;
    setTabs([
      ...tabs,
      {
        key: newKey,
        label: variantName.current,
      },
    ]);

    variantName.current = "";
  };

  

  return (
    <>
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="soft" className="mb-2">+</Button>
        </Popover.Trigger>
        <Popover.Content width="360px">
          <Flex gap="3">
            <Box flexGrow="1">
              <TextArea
                placeholder="Write Tab Name"
                style={{ height: 80 }}
                onInput={(e) => (variantName.current = e.target.value)}
              />
              <Flex gap="3" mt="3" justify="between">
                <Popover.Close>
                  <Button onClick={() => addTab(variantName)} size="1">
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
}
