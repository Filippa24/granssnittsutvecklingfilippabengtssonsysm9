import UseFetch from "../../hooks/useFetch";
import { useState } from "react";
import "./FilterCard.css";

function FilterCard({ onSelectMake, selectedMake }) {
  const [showFilter, setShowFilter] = useState(false);

  //variabel för url
  const url = "http://localhost:5000/products";

  const { data: products, loading, error } = UseFetch(url);

  if (loading) return <p>Loading filter.</p>;
  if (error) return <p>Error loading filter.</p>;
  if (!products) return <p>Filter could not be found.</p>;

  return (
    <div className="filter__container">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="filter__btn"
        style={{ visibility: showFilter ? "hidden" : "visible" }}
      >
        Filter
      </button>
      {/* visa filter och sortera i alfabetisk ordning */}
      {showFilter && (
        <ul className="filter__list">
          {/* visa alla produkter: */}
          <li
            className="filter__li"
            onClick={() => {
              onSelectMake(null);
              setShowFilter(false);
            }} // null = visa alla
          >
            Show all
          </li>

          {/* plocka ut bara make via map, make läggs i en ny array som direkt skickas in i new set där dubletter tas bort, sen sprids de ut i en ny array, sorteras och skrivs ut */}
          {/* 1. [... new set] sprider ut setvärdena i en ny array. 2. new set tar bort dubletter, ett set kan bara innehålla unika värden. 3. plocka ut bara make via map 4. sort() sorterar alfabetiskt. 5. map() renderar varje make osm en li*/}
          {[...new Set(products.map((p) => p.make))].sort().map((make) => (
            <li
              key={make}
              className="filter__li"
              onClick={() => {
                onSelectMake(make);
                setShowFilter(false);
              }}
            >
              {make}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterCard;
