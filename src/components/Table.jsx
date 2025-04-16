import React, { createContext, useContext, useRef, useState } from "react";
import { Box, Button, Flex, Table, Text, TextField } from "@radix-ui/themes";
import ColumnPopover from "./ColumnPopover";
import { ColumnContext } from "../App";
import RowPopover from "./RowPopover";
import { TrashIcon } from "@radix-ui/react-icons";
import { handleDelete } from "../helpers/helper";

const DataTable = () => {
  const { columns, rows, activeTab, data, setData, setColumn, setRow } =
    useContext(ColumnContext);

  const handleDataInput = (row, col, value) => {
    const updatedData = [...data];

    // Ensure tab index exists
    if (!updatedData[activeTab]) {
      updatedData[activeTab] = [];
    }

    // Ensure row exists in the current tab
    if (!updatedData[activeTab][row]) {
      updatedData[activeTab][row] = [];
    }

    // Now you can safely assign the value
    updatedData[activeTab][row][col] = value;
    console.log("Row: " + row);
    console.log("Col: " + col);
    console.log("Val: " + value);
    console.log("Tab: " + activeTab);

    setData(updatedData);

    console.log(updatedData);
  };

  return (
    <>
      <Table.Root variant="surface">
        {/* Column Headers */}
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            {columns.map((col, idx) => (
              <Table.ColumnHeaderCell align="center" key={col.key}>
                <Flex gap="2" justify="between" align="center">
                  {col.value}
                  <TrashIcon
                    color="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(idx, columns, setColumn);
                    }}
                  />
                </Flex>
              </Table.ColumnHeaderCell>
            ))}
            <Table.ColumnHeaderCell>
              <ColumnPopover />
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        {/* Table Body with Row Headers */}
        <Table.Body>
          {rows.map((row, rIndx) => (
            <Table.Row key={row.key}>
              <Table.RowHeaderCell width="100">
                <Flex gap="2" justify="between" align="center">
                  {row.value}
                  <TrashIcon
                    color="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(rIndx, rows, setRow);
                    }}
                  />
                </Flex>
              </Table.RowHeaderCell>
              {columns.map((col, cIndx) => (
                <Table.Cell key={col.key}>
                  <Box maxWidth="250px">
                    <TextField.Root
                      placeholder="Enter Value"
                      value={data?.[activeTab]?.[rIndx]?.[cIndx] || ""}
                      size="2"
                      onInput={(e) => {
                        handleDataInput(rIndx, cIndx, e.target.value);
                      }}
                    ></TextField.Root>
                  </Box>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
          <Table.Row>
            <Table.RowHeaderCell>
              <RowPopover />
            </Table.RowHeaderCell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default DataTable;
