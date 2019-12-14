import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CharacterList = props => {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const getCharacters = () => {
      axios
        .get("https://rickandmortyapi.com/api/character/")
        .then(response => {
          setCharacters(response.data.results);
          console.log(response.data.results);
        })
        .catch(error => {
          console.error("Server Error", error);
        });
    };

    getCharacters();
  }, []);

  return (
    <div className="character-list">
      {characters.map(item => (
        <CharacterDetails key={item.id} character={item} />
      ))}

    </div>
  );
};

function CharacterDetails({ character }) {
  const { id, name, status, species, image } = character;
  console.log("checking props", character);
  return (
    <Link to={`/${id}`}>
      <div className="character-card">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <h3>{status}</h3>
        <h3>{species}</h3>
      </div>
    </Link>
  );
}

export default CharacterList;
