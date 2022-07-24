import {useSelector, useDispatch} from 'react-redux';
import {setEmail} from './redux/reducers/userReducer';
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';



const App = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  
  const handleEmailInput = (e) => {
    dispatch(setEmail(e.target.value));
  }

  

  return (
    
    <div>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <hr/>
      <h1>Parte do redux</h1>
      Meu email é: {user.email} <br/>
     
    <hr/>
    <input type="text" value={user.email} onChange={handleEmailInput} />
   
    
    </div>
    
  );
}

  

export default App;
