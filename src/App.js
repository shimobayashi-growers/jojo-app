import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import CharacterDetail from "./CharacterDetail";
import StandList from "./StandList";
import CharacterList from "./CharacterList"; // 追加
import StandDetail from "./StandDetail"; // 追加

function App() {
  return (
    <Router>
      <div className="container">
        <div className="header">
          <div className="header-content">
            <Link to="/">
              <img
                src="jojo-logo.jpg"
                alt="logo"
                className="logo"
                style={{ height: "auto", maxHeight: "100px" }}
              ></img>
            </Link>
            <div className="header-navi">
              <Link to="/characters" className="nav-link button-link">
                Characters
              </Link>
              <Link to="/stands" className="nav-link button-link">
                Stands
              </Link>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/stands" element={<StandList />} />
          <Route path="/stand/:id" element={<StandDetail />} /> {/* 追加 */}
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h1>Welcome to JoJo's Bizarre Adventure App</h1>
      <p>Select a category to explore:</p>
      <nav>
        <Link to="/characters" className="nav-link button-link">
          Characters
        </Link>
        <Link to="/stands" className="nav-link button-link">
          Stands
        </Link>
      </nav>
    </div>
  );
}

export default App;
