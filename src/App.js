import './App.css';
import CharacterDetails from './CharacterDetails';
import CharacterListing from './CharacterListing';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route path="/" element={<CharacterListing />} />
          <Route path="/:name" element={<CharacterDetails />} />

        </Routes>
      </Router>
      {/* // <CharacterDetails /> */}
    </div>
  );
}

export default App;
