import { useState } from "react";
import { useAsyncDebounce } from "react-table";

interface IProps {
  filter: string;
  setFilter: (value: string) => void;
}

const GlobalFilter = ({ filter, setFilter }: IProps) => {
  const [value, setValue] = useState(filter);

  const handleChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 2000);

  return (
    <span>
      Search{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          handleChange(e.target.value);
        }}
      />
    </span>
  );
};

export default GlobalFilter;
