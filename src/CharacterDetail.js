import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./CharacterDetail.css";

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
    <div className="detail">
      <img
        src={
          character.image != null
            ? `https://jojos-bizarre-api.netlify.app/assets/${character.image}`
            : `dummy.png`
        }
        alt="character"
        className="detail-image"
      />
      <div className="detail-content">
        <h1 className="detail-title">{character.japaneseName}</h1>
        <p className="detail-description">
          {character.catchphrase != null ? character.catchphrase : "なし"}
        </p>
        <div className="detail-footer">
          <span className="detail-affiliation">
            {character.chapter != null ? character.chapter : "なし"}
          </span>
        </div>
        <Link to="/" className="back-button">
          戻る
        </Link>
      </div>
    </div>
  );
}

export default CharacterDetail;
