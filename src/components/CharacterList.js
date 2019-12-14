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

// state for searchTerm and searchResults
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState(listCharacterNames);

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


  console.log("search term", searchTerm);
  console.log('newNames', listCharacterNames);
  console.log('searchresults', searchResults);


  return (
    <div className="character-list">
      <form>
        <label htmlFor="name">Search:</label>
          <input
            id="name"
            type="text"
            name="textfield"
            placeholder="Search"
            onChange={handleChange}
            value={searchTerm}
          />
      </form>
      {characters.map(item => (

        searchResults.includes(item.name, 0) && <CharacterDetails key={item.id} character={item} />
        
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
