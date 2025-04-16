export const handleSaveData = (data) => {
  if (data.length > 0) {
    localStorage.setItem("data", JSON.stringify(data));
    console.log("Data Saved");
  }
};

export const handleDelete = (index, items, setItems) => {
  const updatedItems = [...items]; // clone array
  updatedItems.splice(index, 1);   // now safe to mutate the copy
  setItems(updatedItems);
};
