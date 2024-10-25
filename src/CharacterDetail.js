import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      const apiUrl = `https://stand-by-me.herokuapp.com/api/v1/characters/${id}`;
      const result = await axios.get(apiUrl);
      setCharacter(result.data);
      setIsLoading(false);
    };

    fetchCharacterDetail();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <Link to="/">
        <img
          src={
            character.image != null
              ? `https://jojos-bizarre-api.netlify.app/assets/${character.image}`
              : `dummy.png`
          }
          alt="character"
          className="card-image"
        />
      </Link>
      <div className="card-content">
        <h1 className="card-title">{character.japaneseName}</h1>
        <p className="card-description">
          {character.catchphrase != null ? character.catchphrase : "なし"}
        </p>
        <div className="card-footer">
          <span className="affiliation">
            {character.chapter != null ? character.chapter : "なし"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
