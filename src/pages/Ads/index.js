import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageArea, SearchArea } from './styled';
import useAPI from '../../helpers/OlxAPI';

import { PageContainer } from '../../components/MainComponents';
import { Link } from 'react-router-dom';

import AdItem from '../../components/partials/AdItem';

let timer;

const Page = () => {
    const api = useAPI();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const navigate = useNavigate();
      

    const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '');
    const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');
    const [state, setState] = useState(query.get('state') != null ? query.get('state') : '');

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);
    const [adsTotal, setAdsTotal] = useState(0);
    const [pagination, setPagination] = useState([]);
    const [lastPageDisplay, setLastPageDisplay] = useState(false);
    const [nextPageDisplay, setNextPageDisplay] = useState(false);
    const [currentPage, setCurrentPage] = useState(null);
    const [resultOpacity, setResultOpacity] = useState(1);
    const [warningMessage, setWarningMessage] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const getAdsList = async () => {
      
  
      const json = await api.getAds({
        sort: 'desc',
        limit: 8,
        q,
        cat,
        state
        
      });
      if (json.error) {
        const jsonErrors = [];
        for (let err in json.error) {
          jsonErrors.push(json.error[err].msg);
        };
  
        setError(true);
        setWarningMessage(jsonErrors.join(', '));
      } else {
        setAdList(json.ads);
        setAdsTotal(json.total);
        setResultOpacity(1);
        setWarningMessage('');
        setError(false);
      };
    };

    useEffect(() => {
      let queryString = []

      if(q){
        queryString.push(`q=${q}`)
      }
      if(cat){
        queryString.push(`cat=${cat}`)
      }
      if(state){
        queryString.push(`state=${state}`)
      }

      navigate(`?${queryString.join('&')}`, {replace:true})

      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(getAdsList, 1000);
      setResultOpacity(0.3);   

      
  }, [q, cat, state]);
    

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
          
        };
        getRecentAds();   
        
      }, []);

     

    return (
       <PageContainer>
          <PageArea>
            <div className="leftSide">
              <form  method="get">
                <input 
                  type="text" 
                  name="q" 
                  placeholder='O que você procura?'
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  />
                <div className='filterName'>Estado</div> 
                  <select 
                    name="state" 
                    value={state} 
                    onChange={(e) => setState(e.target.value)}
                    >
                    <option></option>
                    {stateList.map((i,k) => 
                      <option key={k} value={i.name}>{i.name}</option>
                    )}
                    </select>

                <div className='filterName'>Categoria</div> 
                <ul>
                  {categories.map((i,k) =>
                    <li 
                      key={k}
                      className={cat == i.slug?'categoryItem active':'categoryItem'}
                      onClick={() => {setCat(i.slug)}}
                      >
                      <img src={i.img} alt=""/>
                      <span>{i.name}</span>

                    </li>
                  )}
                </ul>
              </form>
            </div>
            <div className="rightSide">
              <h2>Resultados:</h2>
              <div className="list" style={{opacity: resultOpacity}}>
                {adList.map((i,k) =>
                  <AdItem key={k} data={i}/>
                )}

              </div>
            </div>
          </PageArea>
       </PageContainer>
    )
    }
   
    
export default Page;