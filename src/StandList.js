import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./StandList.css";

function StandList() {
  const [stands, setStands] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchStands();
  }, []);

  const fetchStands = async () => {
    const apiUrl = `https://stand-by-me.herokuapp.com/api/v1/stands`; // スタンドのAPIエンドポイント
    setIsLoading(true);
    const result = await axios.get(apiUrl);
    setStands(result.data);
    setIsLoading(false);
  };

  const getPaginatedStands = () => {
    const startIndex = (page - 1) * 9;
    const endIndex = startIndex + 9;
    return stands.slice(startIndex, endIndex);
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
            {getPaginatedStands().map((stand) => {
              return (
                <Link to={`/stand/${stand.id}`} key={stand.id}>
                  <div className="card">
                    <img
                      src={
                        stand.image != null
                          ? `https://jojos-bizarre-api.netlify.app/assets/${stand.image}`
                          : `dummy.png`
                      }
                      alt="stand"
                      className="card-image"
                    ></img>
                    <div className="card-content">
                      <h3 className="card-title">{stand.name}</h3>
                      <p className="card-description">
                        {stand.ability != null ? stand.ability : "なし"}
                      </p>
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

export default StandList;
