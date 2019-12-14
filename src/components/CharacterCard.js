import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const CharacterCard = (props) => {
  const [character, setCharacter] = useState();
  console.log('in item');
  console.log(props.match.params.id);
  const paramItemId = props.match.params.id;
  console.log('param id is this: ',paramItemId);
  console.log('param id is ',typeof(Number(paramItemId)));
  
 
  useEffect(() => {
    const id = props.match.params.id;

       axios
        .get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => {
          setCharacter(response.data);
          console.log('in item', response.data )
        })
        .catch(error => {
          console.error(error);
        });

  },[]);
  

  if (!character) {
    return <div>Loading movie information...</div>;
  }

  const { id, name, status, species, image } = character;

  console.log('char id', character.id);



  return (
    <div className="character-card">
    <img src={image} alt={name} />
    <h2>{name}</h2>
    <h3>{status}</h3>
    <h3>{species}</h3>
    <Link to={`/`}>Home</Link>
  </div>
  );
}

export default CharacterCard;