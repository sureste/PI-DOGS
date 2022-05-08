import './App.css';
import {Route , Switch} from 'react-router-dom'
import Nav from './Components/Nav'
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home';
import DogDetail from './Components/DogDetail'
import CreateDog from './Components/createDog';
function App() {
  return (
    <div className="App">
    {/* <Nav/>  */}
    <Switch>
      <Route path="/" exact component={LandingPage}/>
      <Route path="/home" exact component={Home}/>
      <Route path="/home/:id"  component={DogDetail} />
      <Route path="/dogs" component={CreateDog} />
    </Switch>
    
    </div>
  );
}

export default App;
