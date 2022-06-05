import React, { useState } from "react";
import "./App.css";
import json from "./random.json";

// TODO add scrollview or smth like that

function App() {
  console.log(json);

  const isDate = (value: string): boolean => {
    const d = new Date(value);
    return d.getTime() === d.getTime();
  };

  const formatedDate = (value: string): string => {
    return new Date(value).toISOString().split("T")[0].slice(0, 10);
  };

  const isIdField = (key: string): boolean =>
    key === "id" || key === "_id" || key === "guid";

  let elements: any[] = [];

  json.forEach((obj: any, index: number) => {
    elements.push(
      <div className="index" key={index}>
        {"#" + index}
      </div>
    );
    for (let key in obj) {
      let value = obj[key];
      const reactKey = `${key}-${Date.now()}-${index}`;
      switch (typeof value) {
        case "number":
          elements.push(
            <Input key={reactKey} jsonKey={key} type="number" value={value} />
          );
          break;
        case "boolean":
          elements.push(
            <Input key={reactKey} jsonKey={key} type="checkbox" value={value} />
          );
          break;
        case "object":
          continue;
        default:
          if (isDate(value)) {
            elements.push(
              <Input
                key={reactKey}
                jsonKey={key}
                type="date"
                value={formatedDate(value)}
              />
            );
          } else {
            elements.push(
              value.length < 55 ? (
                isIdField(key) ? (
                  <div className="input-wrap">
                    <label>{key}</label>
                    <span>{value}</span>
                  </div>
                ) : (
                  <Input
                    type={value.includes("@") ? "email" : "text"}
                    value={value}
                    key={reactKey}
                    jsonKey={key}
                  />
                )
              ) : (
                <Textarea key={reactKey} jsonKey={key} value={value} />
              )
            );
            break;
          }
      }
    }
  });

  return (
    <div className="app">
      <form>{elements}</form>
    </div>
  );
}

interface InputProps {
  type: string;
  jsonKey: any;
  value: any;
}

const Input: React.FC<InputProps> = (props) => {
  const handleChange = (e: any): void => {
    setShownValue(e.currentTarget.value);
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

interface TextareaProps {
  jsonKey: any;
  value: any;
}

const Textarea: React.FC<TextareaProps> = (props) => {
  const handleChange = (e: any): void => {
    setShownValue(e.currentTarget.value);
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

export default App;
