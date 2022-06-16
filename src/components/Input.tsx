import React, { useState } from "react";

interface InputProps {
  type: string;
  jsonKey: string;
  value: string;
}

const Input: React.FC<InputProps> = (props) => {
  const handleChange = (e: any): void => {
    setShownValue(e?.currentTarget?.value);
  };

  const { type, jsonKey, value } = props;
  const [shownValue, setShownValue] = useState(value);
  return (
    <div className="input-wrap">
      <label>{jsonKey}</label>
      <input type={type} value={shownValue} onChange={(e) => handleChange(e)} />
    </div>
  );
};

export default React.memo(Input);
