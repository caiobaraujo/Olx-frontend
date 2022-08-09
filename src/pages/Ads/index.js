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

    const [adsTotal, setAdsTotal] = useState(0);
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    
    const [lastPageDisplay, setLastPageDisplay] = useState(false);
    const [nextPageDisplay, setNextPageDisplay] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultOpacity, setResultOpacity] = useState(1);
    
    const [error, setError] = useState(false);
    

    const getAdsList = async () => {
      
      let offset = (currentPage -1 ) * 2;

      const json = await api.getAds({
        sort: 'desc',
        limit: 2,
        q,
        cat,
        state,
        offset 
        
      });
      if (json.error) {
        const jsonErrors = [];
        for (let err in json.error) {
          jsonErrors.push(json.error[err].msg);
        };
  
        setError(true);
        
      } else {
        setAdList(json.ads);
        setAdsTotal(json.total);
        setResultOpacity(1);
        
        setError(false);
      };
    };

    useEffect(()=>{
      if(adList.length > 0){
      setPageCount(Math.ceil(adsTotal / adList.length));
      } else {
        setPageCount(0);
      }
    },[adsTotal])

    useEffect(()=>{
      getAdsList();
    },[currentPage])
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
      setCurrentPage(1); 

      
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

      let pagination = [];
     for(let i = 0; i < pageCount; i++){
       pagination.push(i+1)
     }

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
              {adList.length === 0 &&
              <div 
               className="listWarning"
               style={{opacity: resultOpacity}}>
                Ops! Nenhum anúncio foi encontrado.
              </div>
               }
              <div className="list" style={{opacity: resultOpacity}}>
                {adList.map((i,k) =>
                  <AdItem key={k} data={i}/>
                )}

              </div>
              <div className="pagination">
                {pagination.map((i,k) =>
                    <div
                    onClick={() => setCurrentPage(i)}
                    className={i === currentPage ? 'pagItem active' : 'pagItem'}
                    key={k}
                  >
                    {i}
                  </div>
                )}
              </div>

            </div>
          </PageArea>
       </PageContainer>
    )
    }
   
    
export default Page;