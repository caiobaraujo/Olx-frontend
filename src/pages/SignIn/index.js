import React, { useState } from 'react';
import { PageArea } from './styled';
import useAPI from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';
import { PageContainer, PageTitle, ErrorMessage, LoginMessage } from '../../components/MainComponents';
import { useLocation } from 'react-router-dom';

const Page = () => {
    const api = useAPI();
    

    const { state } = useLocation();
    

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (email && password) {
      setDisabled(true);
      const json = await api.login(email, password);

      if (json.error) {
        const jsonErrors = [];
        for(let err in json.error){
            
            console.log("O erro 2 é:",json.error[err].msg);
          
          jsonErrors.push(json.error[err].msg);
        };

        setError(jsonErrors);
      } else {
        doLogin(json.token, rememberPassword);
        window.location.href = '/';
        return;
      };
    } else {
      setError('Preencha todos os campos.')
    };

    setDisabled(false);
  };

    return (
         <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                {
                    error && <ErrorMessage>Email ou senha estao errados!</ErrorMessage>

                }
                {
                    state && !error && <LoginMessage>{state.txt}</LoginMessage>

                }
                
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">E-mail:</div>
                        <div className="area--input">
                            <input 
                            type="email" 
                            disabled={disabled}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                             />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input 
                            type="password" 
                            disabled={disabled}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                              />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Lembra senha</div>
                        <div className="area--input">
                        <input
                            type="checkbox"
                            disabled={disabled}
                            checked={rememberPassword}
                            onChange={() => setRememberPassword(!rememberPassword)}
                        />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled} >Fazer Login</button>
                        </div>
                    </label>

                </form>
            </PageArea>
         </PageContainer>
    )
    }
   
    
export default Page;