import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const apiUrl = "https://stand-by-me.herokuapp.com/api/v1/characters";
    setIsLoading(true);
    const result = await axios.get(apiUrl);
    setCharacters(result.data);
    console.log(result);
    setIsLoading(false);
  };
  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  };
  return (
    <div className="container">
      {isLoading ? (
        <div className="loading">Now Loading...</div>
      ) : (
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
          <div className="pager">
            <button className="prev">Previous</button>
            <span className="page-number">{page}</span>
            <button className="next" onClick={handleNext}>
              Next
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
