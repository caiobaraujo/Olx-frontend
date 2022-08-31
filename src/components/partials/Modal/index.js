import React, {useState, useEffect} from "react";


import {ModalPage} from "./styled";
import useAPI from "../../../helpers/OlxAPI";
import Cookies from 'js-cookie';

function Modal({ setOpenModal }) {

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

    const token = Cookies.get('token');

    if(password !== confirmPassword) {
      setError('As senhas não conferem!');
      setDisabled(false);
      return;
    }

    if (token && name && email && password && stateLoc) {
      const json = await api.editUserInfo(token,name,email,stateLoc, password);

      if (json.error) {
        setError(json.error);
      
      } else {
        setOpenModal(false);

        
      }
    }



   

    setDisabled(false);
  };


  return (
    <ModalPage>
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="titleEdit">Edite suas Informaçôes</div>
        <form className="form" onSubmit={handleSubmit}>
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
                            <button disabled={disabled} >Alterar Informações</button>
                        </div>
                    </label>

                </form>
        
      </div>
    </div>
    </ModalPage>
   
  );
}

export default Modal;