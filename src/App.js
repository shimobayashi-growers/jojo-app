import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const apiUrl = "https://stand-by-me.herokuapp.com/api/v1/characters";

    const result = await axios.get(apiUrl);
    setCharacters(result.data);
    console.log(result);
  };
  return (
    <div className="container">
      <main>
        <div className="cards-container">
          {characters.map((character) => {
            return (
              <div className="card" key={character.id}>
                <img
                  src={
                    character.image != null
                      ? `https://jojos-bizarre-api.netlify.app/assets/${character.image}`
                      : `dummy.png`
                  }
                  alt="character"
                  className="card-image"
                ></img>
                <div className="card-content">
                  <h3 className="card-title">{character.japaneseName}</h3>
                  <p className="card-description">
                    {character.catchphrase != null
                      ? character.catchphrase
                      : "なし"}
                  </p>
                  <div className="card-footer">
                    <span className="affiliation">
                      {character.chapter != null ? character.chapter : "なし"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
