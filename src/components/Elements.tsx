import React from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import InputDate from "./InputDate";

interface ElementsProps {
  elements: any[];
}

const Elements: React.FC<ElementsProps> = ({ elements }) => {
  const shortTextMax = 55;

  const isIdField = (key: string): boolean =>
    ["id","_id","guid", "userId"].includes(key);

  const isDate = (value: string): boolean => {
    const d = new Date(value);
    // return d.getTime() === d.getTime();
    return d instanceof Date && !isNaN(d.valueOf());
  };

  return (
    <form>
      {elements?.map((obj: any, index: number) => {
        let element: any[] = [];
        element.push(
          <div className="index" key={index}>
            {"#" + index}
          </div>
        );
        for (let key in obj) {
          let value: string = obj[key];
          const reactKey: string = `${key}-${index}`;
          switch (typeof value) {
            case "number":
              element.push(
                <Input
                  key={reactKey}
                  jsonKey={key}
                  type="number"
                  value={value}
                />
              );
              break;
            case "boolean":
              element.push(
                <Input
                  key={reactKey}
                  jsonKey={key}
                  type="checkbox"
                  value={value}
                />
              );
              break;
            case "object":
              continue;
            default:
              if (isDate(value)) {
                element.push(
                  <InputDate key={reactKey} jsonKey={key} value={value} />
                );
              } else {
                element.push(
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
        return element;
      })}
    </form>
  );
};

export default Elements;
