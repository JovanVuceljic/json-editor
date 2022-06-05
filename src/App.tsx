import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
// import json from "./random.json";

const Elements = React.lazy(() => import("./components/Elements"));

const App: React.FC = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    fetch("https://api.publicapis.org/entries")
      .then((response) => response.json())
      .then((json) => {
        setElements(json.entries);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <Elements elements={elements} />
        {/* <Elements elements={json} /> */}
      </Suspense>
    </div>
  );
};

export default App;
