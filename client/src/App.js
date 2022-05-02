import './App.css';
import {BrowserRouter , Route , Switch} from 'react-router-dom'
import Nav from './Components/Nav'
function App() {
  return (
    <BrowserRouter>
    <Nav/>
    
    <div className="App">
      <h1>Henry Dogs</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
