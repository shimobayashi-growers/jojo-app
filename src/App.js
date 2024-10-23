import { useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const apiUrl = "https://stand-by-me.herokuapp.com/api/v1/characters";

    const result = await axios.get(apiUrl);
    console.log(result);
  };
  return <div className="App">hello world</div>;
}

export default App;
