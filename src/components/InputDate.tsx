import React, { useState } from "react";

interface InputProps {
  jsonKey: string;
  value: string;
}

const InputDate: React.FC<InputProps> = (props) => {
  const handleChange = (e: any): void => {
    setShownValue(e?.currentTarget?.value);
  };

  const formatedDate = (value: string): string => {
    return new Date(value).toISOString().split("T")[0].slice(0, 10);
    // return new Date(value).toISOString();
  };

  const { jsonKey, value } = props;
  const [shownValue, setShownValue] = useState(value);
  return (
    <div className="input-wrap">
      <label>{jsonKey}</label>
      <input
        type="date"
        value={formatedDate(shownValue)}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default React.memo(InputDate);
