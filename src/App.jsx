import { useState } from "react";
import "./App.css";

async function fetchData() {
  const response = await fetch("https://api.example.com/data");

  useEffect(() => {
    fetchData();
  }, []);
}

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div></div>
    </>
  );
}

export default App;
