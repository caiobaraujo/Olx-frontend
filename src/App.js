import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import './App.css';
import {Templates} from './components/MainComponents';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';


const App = () => {

  

  

  return (
    
    <div>
      <BrowserRouter>
      <Templates>
        <Header/>
        <Routes />
        <Footer/>
      </Templates>
        
      </BrowserRouter>
     
    </div>
    
  );
}

  

export default App;
