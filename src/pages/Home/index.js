import React, { useState, useEffect } from 'react';
import { PageArea, SearchArea, PageTitle } from './styled';
import useAPI from '../../helpers/OlxAPI';

import { PageContainer } from '../../components/MainComponents';
import { Link } from 'react-router-dom';

import AdItem from '../../components/partials/AdItem';

const Page = () => {
    const api = useAPI();

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStates = async () => {
          const slist = await api.getStates();
          setStateList(slist);
        };
        getStates();
        
      }, []);

      useEffect(() => {
        const getCategories = async () => {
          const cats = await api.getCategories();
          setCategories(cats);
        };
        getCategories();   
        
      }, []);

      useEffect(() => {
        const getRecentAds = async () => {
          const json = await api.getAds({
            sort:'desc',
            limit: 8
          });
          
          setAdList(json.ads);
          console.log(json.ads);
        };
        getRecentAds();   
        
      }, []);

     

    return (
        <>
             
              
             
            <SearchArea>
                    <PageTitle>
                        <h2>O melhor site de compra e venda de Juiz de Fora e Região!</h2>
                    </PageTitle>
                <PageContainer>
                    
                <div className="searchBox">
            <form method="GET" action="/ads">
              <input type="text" name="q" placeholder="O que você procura?" />
              <select name="state">
                <option></option>
                {stateList.map((state,k) => (
                    <option key={k} value={state.name}>{state.name}</option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
                    <div className="categoryList">
                       {
                        categories.map((item, key) => (
                            <Link key={key} to={`/ads?cat=${item.slug}`} className="categoryItem">
                              <img src={item.img} alt={item.name} />
                              
                              <span>{item.name}</span>
                            </Link>
                          ))
                       }
                    </div>
                    

                </PageContainer>
            </SearchArea>

            <PageContainer>
            <PageArea>
                <h2>Anúncios Recentes</h2>
                <div className="list">
                  {
                    adList.map((i, k) => 
                      
                     <AdItem key={k} data={i}/>
                    )
                  }
                </div>
                <Link to="/ads" className="seeAllLink">Ver todos</Link>
                    <hr />
                    <div className="text">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
                    </div>
            </PageArea>
         </PageContainer>
        </>
         
    )
    }
   
    
export default Page;