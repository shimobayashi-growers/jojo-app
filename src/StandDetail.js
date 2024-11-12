import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./StandDetail.css";

function StandDetail() {
  const { id } = useParams();
  const [stand, setStand] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStandDetail = async () => {
      const apiUrl = `https://stand-by-me.herokuapp.com/api/v1/stands/${id}`;
      const result = await axios.get(apiUrl);
      setStand(result.data);
      setIsLoading(false);
    };

    fetchStandDetail();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail">
      <img
        src={
          stand.image != null
            ? `https://jojos-bizarre-api.netlify.app/assets/${stand.image}`
            : `dummy.png`
        }
        alt="stand"
        className="detail-image"
      />
      <div className="detail-content">
        <h1 className="detail-title">{stand.name}</h1>
        <p className="detail-description">
          {stand.abilities != null ? stand.abilities : "なし"}
        </p>
        <p className="detail-description">
          {stand.battlecry != null ? stand.battlecry : "なし"}
        </p>
        <p className="detail-description">
          {stand.standUser != null ? (
            <Link to={`/character/${stand.standUser}`}>キャラクター</Link>
          ) : (
            "なし"
          )}
        </p>
        <div className="detail-footer">
          <span className="detail-affiliation">
            {stand.chapter != null ? stand.chapter : "なし"}
          </span>
        </div>
        <Link to="/stands" className="back-button">
          戻る
        </Link>
      </div>
    </div>
  );
}

export default StandDetail;
