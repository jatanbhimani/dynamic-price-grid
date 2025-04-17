import { Select } from "@radix-ui/themes";

const SelectData = ({data, isSet, searchedData}) => {
    
  return (
    <Select.Root
      onValueChange={(value) => {
        if(value) {
            isSet(true);
            searchedData.current = value;
        }
      }}
    >
      <Select.Trigger placeholder="Choose" />
      <Select.Content>
        {data.map((item, index) => {
          return (
            <Select.Item key={index} value={index.toString()}>
              {item.value}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

export default SelectData;
