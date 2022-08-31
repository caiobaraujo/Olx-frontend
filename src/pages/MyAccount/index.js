import React, { useState, useEffect } from 'react';
import { PageArea } from './styled';
import useAPI from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';
import AdItemAccount from '../../components/partials/AdItemAccount';
import Modal from '../../components/partials/Modal';

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

  const [userInfo, setUserInfo] = useState([]);
  const [adList, setAdList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const info = await api.getUserInfo();
      
      setUserInfo(info);
      setAdList(info.ads);
      
      
    };
    getUserInfo();
    
  }, []);
 
  

    return (
      
         <PageContainer>
          
            <PageTitle>Minha Conta</PageTitle>
            <PageArea>
                <div className="user-area">
                    <div className="user-info">Informaçoes do Usuario</div>
                    <div className="area-title">
                      Nome Completo: {userInfo.name}
                      </div>

                      <div className="area-title">
                      Email: {userInfo.email}
                      </div>

                      <div className="area-title">
                      Cidade: {userInfo.state}
                      </div>
                      <button
                            className="openModalBtn"
                            onClick={() => {
                              setModalOpen(true);
                            }}
                          >
                            Open
                      </button>
                      {modalOpen && <Modal setOpenModal={setModalOpen} />} 
                      <div className="ads-area">
                        <h2>Seus anúncios</h2>
                        <div className="list">
                          {adList.map((i,k) => 
                            <AdItemAccount key={k} data={i}/>
                          )}
                        </div>

                      </div>

                </div>
            </PageArea>
         </PageContainer>
    )
    }
  
   
    
export default Page;