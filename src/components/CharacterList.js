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
      <div className="contain">
      <Container className='character-card'>
        <Row xs='2'>
            <Col>
                <Card>
                    <Link to={`/${id}`}>  
                    <CardHeader>Name: {name}</CardHeader>
                    <CardImg width='300px' src={image} alt={name} />
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
