import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GenreRecomender from "../GenreRecommender";
import GenreRecommender from "../GenreRecommender";
import RatingsRecommender from "../RatingsRecommender";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <h1>Movie Recommender</h1>
        <Navigation />
        <Routes>
          <Route path="/genre-recommender" element={<GenreRecomender />} />
          <Route path="/ratings-recommender" element={<RatingsRecommender />} />
        </Routes>
      </Router>
    </div>
  );
};

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="genre-recommender">System 1</Nav.Link>
            <Nav.Link href="ratings-recommender">System 2</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default App;
