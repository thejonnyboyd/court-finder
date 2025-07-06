import React, { useState } from "react";
import MapView from "./components/MapView";
import { courts as allCourts } from "./data/courts";
import "./App.css";
import { FaFilter, FaSearch, FaMapMarkerAlt } from "react-icons/fa";

function App() {
  const [query, setQuery] = useState("");

  const [tempSurface, setTempSurface] = useState("all");
  const [tempIndoorOutdoor, setTempIndoorOutdoor] = useState("all");
  const [tempOpeningHours, setTempOpeningHours] = useState("all");

  const [surfaceFilter, setSurfaceFilter] = useState("all");
  const [indoorOutdoorFilter, setIndoorOutdoorFilter] = useState("all");
  const [openingHoursFilter, setOpeningHoursFilter] = useState("all");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchPlace, setActiveSearchPlace] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);

  const filteredCourts = allCourts.filter((court) => {
    const matchesQuery =
      query === "" ||
      court.name.toLowerCase().includes(query.toLowerCase()) ||
      court.place.toLowerCase().includes(query.toLowerCase()) ||
      court.address.toLowerCase().includes(query.toLowerCase());

    const matchesSurface =
      surfaceFilter === "all" ||
      court.surface.toLowerCase().includes(surfaceFilter.toLowerCase());

    const matchesIndoorOutdoor =
      indoorOutdoorFilter === "all" ||
      court.indoorOutdoor.toLowerCase() === indoorOutdoorFilter.toLowerCase();

    const matchesOpeningHours =
      openingHoursFilter === "all" ||
      (openingHoursFilter === "morning" && court.openingHours.includes("am")) ||
      (openingHoursFilter === "afternoon" && court.openingHours.includes("12pm")) ||
      (openingHoursFilter === "evening" && court.openingHours.includes("pm"));

    const matchesPlace =
      activeSearchPlace === "" ||
      court.place.toLowerCase() === activeSearchPlace.toLowerCase();

    return (
      matchesQuery &&
      matchesSurface &&
      matchesIndoorOutdoor &&
      matchesOpeningHours &&
      matchesPlace
    );
  });

  return (
    <div className="app">
      <div className="map-title">Court Finder</div>

      <div className="desktop-toolbar">
        <button
          onClick={() => {
            setFilterOpen(!filterOpen);
            setSearchPanelOpen(false);
          }}
        >
          <FaFilter />
        </button>
        <button
          onClick={() => {
            setSearchPanelOpen(!searchPanelOpen);
            setFilterOpen(false);
          }}
        >
          <FaSearch />
        </button>
        <button>
          <FaMapMarkerAlt />
        </button>
      </div>

      <div className="menu-mobile">
        <button
          onClick={() => {
            setFilterOpen(!filterOpen);
            setSearchPanelOpen(false);
          }}
        >
          <FaFilter />
        </button>
        <button
          onClick={() => {
            setSearchPanelOpen(!searchPanelOpen);
            setFilterOpen(false);
          }}
        >
          <FaSearch />
        </button>
        <button>
          <FaMapMarkerAlt />
        </button>
      </div>

      {filterOpen && (
        <div className="menu-panel">
          <button className="close-btn" onClick={() => setFilterOpen(false)}>
            Close ✕
          </button>

          <label>Surface</label>
          <select
            value={tempSurface}
            onChange={(e) => setTempSurface(e.target.value)}
          >
            <option value="all">All Surfaces</option>
            <option value="wood">Wood</option>
            <option value="hard">Hard</option>
            <option value="synthetic">Synthetic</option>
          </select>

          <label>Indoor / Outdoor</label>
          <select
            value={tempIndoorOutdoor}
            onChange={(e) => setTempIndoorOutdoor(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
          </select>

          <label>Opening Hours</label>
          <select
            value={tempOpeningHours}
            onChange={(e) => setTempOpeningHours(e.target.value)}
          >
            <option value="all">All Day</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>

          <button
            className="apply-btn"
            onClick={() => {
              setSurfaceFilter(tempSurface);
              setIndoorOutdoorFilter(tempIndoorOutdoor);
              setOpeningHoursFilter(tempOpeningHours);
              setFilterOpen(false);
            }}
          >
            Apply
          </button>
        </div>
      )}

      {searchPanelOpen && (
        <div className="search-panel">
          <button className="close-btn" onClick={() => setSearchPanelOpen(false)}>
            Close ✕
          </button>
          <input
            type="text"
            placeholder="Search by place (e.g. Belfast)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="apply-btn"
            onClick={() => {
              setActiveSearchPlace(searchQuery);
              setSearchPanelOpen(false);
            }}
          >
            Search
          </button>
        </div>
      )}

      <div className="map-wrapper">
        <MapView courts={filteredCourts} />
      </div>
    </div>
  );
}

export default App;
