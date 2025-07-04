import MapView from "./components/MapView";
import { courts } from "./data/courts";
import "./App.css";
import { FaBars, FaMapMarkedAlt, FaFilter } from "react-icons/fa";

function App() {
  return (
    <div className="app">
      {/* Title */}
      <div className="map-title">Court Finder</div>

      {/* Desktop Menu Button (Top Right) */}
      <div className="menu-desktop">
        <FaBars size={24} />
      </div>

      {/* Mobile Menu (Bottom Nav) */}
      <div className="menu-mobile">
        <FaMapMarkedAlt />
        <FaFilter />
        <FaBars />
      </div>

      <MapView courts={courts} />
    </div>
  );
}

export default App;
