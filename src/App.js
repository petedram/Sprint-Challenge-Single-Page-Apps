import React from "react";
import Header from "./components/Header.js";
import {Route} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import CharacterList from './components/CharacterList';
import CharacterCard from './components/CharacterCard';




export default function App() {
  return (
    <main>
      <Header />
      <Route exact path='/' component={CharacterList} />
      <Route exact path='/:id' component={CharacterCard} />

    </main>
  );
}
