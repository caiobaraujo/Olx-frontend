import React, { useState, useEffect } from 'react';
import { PageArea } from './styled';
import useAPI from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';

const Page = () => {
    const api = useAPI();

  const [name, setName] = useState('');
  const [stateLoc, setStateLoc] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      
      setStateList(slist);
    };
    getStates();
    
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setDisabled(true);
    setError('');

    if(password !== confirmPassword) {
      setError('As senhas não conferem!');
      setDisabled(false);
      return;
    }

    if (name && stateLoc && email && password) {
      const json = await api.register(name, stateLoc, email, password);

      if (json.error) {
        setError(json.error);
      
      } else {
        doLogin(json.token);
        window.location.href = '/';
        return;
      }
    }



   

    setDisabled(false);
  };


    return (
         <PageContainer>
            <PageTitle>Cadastrar</PageTitle>
            <PageArea>
                {
                    error && <ErrorMessage>{error}</ErrorMessage>

                }
            <form onSubmit={handleSubmit}>
                <label className="area">
                    <div className="area--title">Nome Completo:</div>
                    <div className="area--input">
                        <input
                          autoFocus
                          type="text"
                          disabled={disabled}
                          value={name}
                          onChange={e => setName(e.target.value)}
                        />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">Cidade:</div>
                    <div className="area--input">
                        <select
                          value={stateLoc}
                          onChange={e => setStateLoc(e.target.value)}
                          disabled={disabled}
                          
                        >
                <option></option>
                {stateList.map((item, key) => (
                  <option value={item._id} key={key}>{item.name}</option>
                ))}
              </select>
            </div>
          </label>
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
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input 
                            type="password" 
                            disabled={disabled}
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                              />
                        </div>
                    </label>

                    

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled} >Fazer Cadastro</button>
                        </div>
                    </label>

                </form>
            </PageArea>
         </PageContainer>
    )
    }
  
   
    
export default Page;