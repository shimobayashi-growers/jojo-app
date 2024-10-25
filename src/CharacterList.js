import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CharacterList.css";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const apiUrl = `https://stand-by-me.herokuapp.com/api/v1/characters`;
    setIsLoading(true);
    const result = await axios.get(apiUrl);
    setCharacters(result.data);
    setIsLoading(false);
  };

  const getPaginatedCharacters = () => {
    const startIndex = (page - 1) * 9;
    const endIndex = startIndex + 9;
    return characters.slice(startIndex, endIndex);
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        <div className="loading">Now Loading...</div>
      ) : (
        <main>
          <div className="pager">
            <button className="prev" onClick={handlePrev} disabled={page === 1}>
              Previous
            </button>
            <span className="page-number">{page}</span>
            <button className="next" onClick={handleNext}>
              Next
            </button>
          </div>
          <div className="cards-container">
            {getPaginatedCharacters().map((character) => {
              return (
                <Link to={`/character/${character.id}`} key={character.id}>
                  <div className="card">
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
                          {character.chapter != null
                            ? character.chapter
                            : "なし"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="pager">
            <button className="prev" onClick={handlePrev} disabled={page === 1}>
              Previous
            </button>
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

export default CharacterList;
