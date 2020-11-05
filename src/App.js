import React from 'react';
import './App.scss';
import Header from "./components/partials/Header";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
   return (
      <Router>
         <div className="App">
            <Header />
         </div>
      </Router>
   );
}

export default App;
