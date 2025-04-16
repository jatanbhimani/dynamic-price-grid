import { useContext } from "react";

export function MyButton() {
  const count = useContext()
  return (
    <>
      <button onClick={handleCount}>
        count is {count}
      </button>
    </>
  );
}