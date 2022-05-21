import './App.css';
import NavBar from './Components/NavBar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar/>
        <Routes>
          
          <Route path='/' exact element={<Movies/>} /> 
        
        <Route path='/favourites' element={<Favourites/>} />
        
        </Routes>
    
    </Router>
  );
}

export default App;
