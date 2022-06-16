import React, { useState } from "react";

interface TextareaProps {
  jsonKey: string;
  value: string;
}

const Textarea: React.FC<TextareaProps> = (props) => {
  const handleChange = (e: any): void => {
    setShownValue(e?.currentTarget?.value);
  };

  const { jsonKey, value } = props;
  const [shownValue, setShownValue] = useState(value);
  return (
    <div className="input-wrap">
      <label>{jsonKey}</label>
      <textarea value={shownValue} onChange={(e) => handleChange(e)} />
    </div>
  );
};

export default React.memo(Textarea);
