import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx"
import Home from './components/Home.jsx';
import DogCreate from "./components/DogCreate.jsx"
import Detail from './components/Detail';
import React from 'react';

function App() {
  return (
     <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/dogcreate" element={<DogCreate/>}/>
        <Route path="/home/:id" element={<Detail/>}/>
      </Routes>
    
    </div>
    );
}

export default App;

