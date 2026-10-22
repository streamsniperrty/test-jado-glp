import logo from './logo.svg';
import './App.css';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router";

import Login from "./pages/Login";
import "./styles/global.css";
import SpaceOps from "./pages/SpaceOps"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/space-ops" element={<SpaceOps />} />

        <Route
            path="*"
            element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
