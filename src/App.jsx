import { useState } from "react";
import "./App.css";
import Counter from "./Components/Counter";
import Poke from "./Components/Poke";

function App() {
  const [id, setId] = useState();
  return (
    <>
      <Poke id={id} />
      <Counter id={id} setId={setId} />
    </>
  );
}

export default App;
