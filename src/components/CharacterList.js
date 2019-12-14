import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container, Row, Card, CardText, CardBody, CardHeader, Col, CardImg
} from 'reactstrap';

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

/// Search box:
// array of names
// state for searchTerm and searchResults
// useEffect for searchTerm
// handlechange 
// return input onchange and value
// return map of searchResults

//array of name
var listCharacterNames;
listCharacterNames = characters.map(item => item.name);

var listSpecies;
listSpecies = characters.map(item => item.species);

// state for searchTerm and searchResults
const [searchTerm, setSearchTerm] = useState("");
const [searchTermSpecies, setSearchTermSpecies] = useState("");
const [searchResults, setSearchResults] = useState(listCharacterNames);
const [searchResultsSpecies, setSearchResultsSpecies] = useState(listSpecies);


// useEffect for searchTerm
useEffect(() => {}, [searchTerm]);

// handlechange 
  const handleChange = event => {
    setSearchTerm(event.target.value);

    const results = listCharacterNames.filter(character => {
      return character.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setSearchResults(results);
  };

  const handleChangeSpecies = event => {
    setSearchTermSpecies(event.target.value);

    const results = listSpecies.filter(character => {
      return character.toLowerCase().includes(searchTermSpecies.toLowerCase());
    });

    setSearchResultsSpecies(results);
  };


  console.log("search term", searchTerm);
  console.log('newNames', listCharacterNames);
  console.log('searchresults', searchResults);
  console.log('searchresultsSpeccies', searchResultsSpecies);


  function firstLoad (item) {
    if(searchTerm.length === 0) {
      return <CharacterDetails key={item.id} character={item} />
    } else {
      return searchResults.includes(item.name, 0) && <CharacterDetails key={item.id} character={item} /> 
    }
  };


  return (
    <div className="character-list">
      <form>
        <label htmlFor="name">Search Name:</label>
          <input
            id="name"
            type="text"
            name="textfield"
            placeholder="Search Name"
            onChange={handleChange}
            value={searchTerm}
          />
      </form>

      <form>
        <label htmlFor="name">Search Species:</label>
          <input
            id="species"
            type="text"
            name="textfield"
            placeholder="Search Species"
            onChange={handleChangeSpecies}
            value={searchTermSpecies}
          />
      </form>

      {console.log('slength', searchTerm.length)}

      {characters.map(item => (

        // //if searchterm.length = 0 
        // searchResults.includes(item.name, 0) && <CharacterDetails key={item.id} character={item} />
        
        firstLoad(item)

      ))}

    </div>
  );
};

function CharacterDetails({ character }) {
  const { id, name, status, species, image } = character;
  console.log("checking props", character);
  return (
      <div className="contain">
      <Container className='character-card'>
        <Row xs='2'>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Card>
                    <Link to={`/${id}`}>  
                    <CardHeader>Name: {name}</CardHeader>
                    <CardImg  src={image} alt={name} />
                    </Link>
                    <CardBody><CardText>Status: {status}</CardText></CardBody>
                    <CardBody><CardText>Species: {species}</CardText></CardBody>
                </Card>
            </Col>
        </Row>
      </Container>
      </div>
  );
}

export default CharacterList;
