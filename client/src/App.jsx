import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h1>Henry Food</h1>
      <LandingPage />
    </div>
    </BrowserRouter>
  );
}

export default App;
