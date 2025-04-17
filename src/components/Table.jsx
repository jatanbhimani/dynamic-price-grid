import React, { useContext, useState } from "react";
import { Box, Flex, Table, TextField, Tooltip } from "@radix-ui/themes";
import ColumnPopover from "./ColumnPopover";
import RowPopover from "./RowPopover";
import { TrashIcon } from "@radix-ui/react-icons";
import { ColumnContext } from "../App";
import { handleDelete } from "../helpers/helper.js";

const DataTable = () => {
  const { columns, rows, activeTab, data, setData, setColumn, setRow } =
    useContext(ColumnContext);

  const [editingColIndex, setEditingColIndex] = useState(null);
  const [tempColValue, setTempColValue] = useState("");

  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [tempRowValue, setTempRowValue] = useState("");

  const handleDataInput = (row, col, value) => {
    const updatedData = [...data];

    if (!updatedData[activeTab]) {
      updatedData[activeTab] = [];
    }

    if (!updatedData[activeTab][row]) {
      updatedData[activeTab][row] = [];
    }

    updatedData[activeTab][row][col] = value;
    setData(updatedData);
  };

  // Column header edit
  const handleColDoubleClick = (idx, currentValue) => {
    setEditingColIndex(idx);
    setTempColValue(currentValue);
  };

  const saveColEdit = (idx) => {
    const updatedColumns = [...columns];
    updatedColumns[idx].value = tempColValue;
    setColumn(updatedColumns);
    setEditingColIndex(null);
  };

  const handleColKeyDown = (e, idx) => {
    if (e.key === "Enter") saveColEdit(idx);
  };

  // Row header edit
  const handleRowDoubleClick = (idx, currentValue) => {
    setEditingRowIndex(idx);
    setTempRowValue(currentValue);
  };

  const saveRowEdit = (idx) => {
    const updatedRows = [...rows];
    updatedRows[idx].value = tempRowValue;
    setRow(updatedRows);
    setEditingRowIndex(null);
  };

  const handleRowKeyDown = (e, idx) => {
    if (e.key === "Enter") saveRowEdit(idx);
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell />
          {columns.map((col, idx) => (
            <Tooltip content="Double click to edit" key={col.key}>
              <Table.ColumnHeaderCell
                align="center"
                onDoubleClick={() => handleColDoubleClick(idx, col.value)}
              >
                <Flex gap="2" justify="between" align="center">
                  {editingColIndex === idx ? (
                    <TextField.Root
                      autoFocus
                      value={tempColValue}
                      onChange={(e) => setTempColValue(e.target.value)}
                      onBlur={() => saveColEdit(idx)}
                      onKeyDown={(e) => handleColKeyDown(e, idx)}
                      size="2"
                    />
                  ) : (
                    col.value
                  )}
                  <TrashIcon
                    color="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(idx, columns, setColumn);
                    }}
                  />
                </Flex>
              </Table.ColumnHeaderCell>
            </Tooltip>
          ))}
          <Table.ColumnHeaderCell>
            <ColumnPopover />
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows.map((row, rIndx) => (
          <Table.Row key={row.key}>
            <Table.RowHeaderCell
              width="100"
              onDoubleClick={() => handleRowDoubleClick(rIndx, row.value)}
            >
              <Flex gap="2" justify="between" align="center">
                {editingRowIndex === rIndx ? (
                  <TextField.Root
                    autoFocus
                    value={tempRowValue}
                    onChange={(e) => setTempRowValue(e.target.value)}
                    onBlur={() => saveRowEdit(rIndx)}
                    onKeyDown={(e) => handleRowKeyDown(e, rIndx)}
                    size="2"
                  />
                ) : (
                  row.value
                )}
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
                  />
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
  );
};

export default DataTable;
