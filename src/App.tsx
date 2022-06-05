import React from "react";
import "./App.css";
import json from "./random.json";
import Input from "./components/Input";
import Textarea from "./components/Textarea";
import InputDate from "./components/InputDate";

// TODO add scrollview or smth like that

const App: React.FC = () => {
  console.log(json);

  const isDate = (value: string): boolean => {
    const d = new Date(value);
    return d.getTime() === d.getTime();
  };

  const isIdField = (key: string): boolean =>
    key === "id" || key === "_id" || key === "guid";

  const shortTextMax = 55;
  let elements: any[] = [];

  json.forEach((obj: any, index: number) => {
    elements.push(
      <div className="index" key={index}>
        {"#" + index}
      </div>
    );
    for (let key in obj) {
      let value: string = obj[key];
      const reactKey: string = `${key}-${index}`;
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
              <InputDate key={reactKey} jsonKey={key} value={value} />
            );
          } else {
            elements.push(
              value.length < shortTextMax ? (
                isIdField(key) ? (
                  <div className="input-wrap" key={reactKey}>
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
};

export default App;
