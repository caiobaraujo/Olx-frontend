import React from 'react'
import { Link } from 'react-router-dom';
import { HeaderArea } from './styled'
import logo from './logoSite.png';

import { doLogout, isLogged } from '../../../helpers/AuthHandler';  

const Header = () => {
    const logged = isLogged();

    const handleLogout = () => {
        doLogout();
        window.location.href = '/';
    }
    
    return (
        <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to="/">
            
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <nav>
          <ul>
            {logged
              ?
              <>
                <li><Link to="/my-account">Minha Conta</Link></li>
                <li><button onClick={handleLogout}>Sair</button></li>
                <li><Link to="/post-an-ad" className="button">Poste um anúncio +</Link></li>
                
              </>
              :
              <>
                <li><Link to="/signin">Login</Link></li>
                <li><Link to="/signup">Cadastre-se</Link></li>
                <li><Link to="/post-an-ad" className="button">Poste um anúncio +</Link></li>
                
                
              </>
            }
            
          </ul>
        </nav>

        </div>
        </HeaderArea>
    );
}

export default Header;