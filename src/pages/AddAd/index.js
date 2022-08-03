import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageArea } from './styled';
import useAPI from '../../helpers/OlxAPI';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';



const Page = () => {
    const api = useAPI();
    const fileField = useRef();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false)
    const [desc, setDesc] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>{
       const getCategories = async () => {
            const categories = await api.getCategories();
            setCategories(categories);
       }
        getCategories();
    },[]);

  const handleSubmit = async e => {
    e.preventDefault();
    
    setError('');
    let errors = [];

    if(!title.trim()) {
        errors.push('Title is required');
    }
    if(!category) {
        errors.push('Category is required');
    }

    if(errors.length === 0) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('cat', category);
      formData.append('price', price);
      formData.append('priceneg', priceNegotiable);
      formData.append('desc', desc);
      
      if(fileField.current.files.length > 0) {
        for(let i = 0; i < fileField.current.files.length; i++) {
          formData.append('img', fileField.current.files[i]);
        }
      }

      setDisabled(true);

      const json = await api.addAd(formData);

      if (json.error) {
        const jsonErrors = [];
        for(let err in json.error){
          console.log(err.msg);
          jsonErrors.push(json.error[err].msg);
        };

        setError(jsonErrors.join(', '));
      } else {
        navigate(`/ad/${json.id}`);
        return;
      };
    } else {
      setError('Preencha todos os campos.')
    };

    setDisabled(false);
  };

    return (
         <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <PageArea>
                {
                    error && <ErrorMessage>Email ou senha estao errados!</ErrorMessage>

                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Titulo</div>
                        <div className="area--input">
                            <input 
                            type="text" 
                            disabled={disabled}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                             />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select
                            disabled={disabled}
                            onChange={e => setCategory(e.target.value)}
                            required
                            >
                              <option></option>
                              {categories && categories.map((i) => 
                                <option key={i._id} value={i._id}>{i.name}</option>
                              )}
                            </select>
                        </div>
                    </label>

                    

                    <label className="area">
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                            <input
                            disabled={disabled}
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                            placeholder='Ex: 150'
                            
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Preço Negociável</div>
                        <div className="area--input">
                            <input
                             type={"checkbox"} 
                             disabled={disabled}
                              checked={priceNegotiable}
                              onChange={e => setPriceNegotiable(!priceNegotiable)}
                               />

                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Descrição:</div>
                        <div className="area--input">
                          <textarea
                            disabled={disabled}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                          ></textarea>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Imagens (1 ou mais):</div>
                        <div className="area--input">
                          <input
                            type="file"
                            disabled={disabled}
                            ref={fileField}
                            multiple
                            accept="image/jpg, image/jpeg, image/png, image/webp"
                          />
                        </div>
                   </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled} >Adicionar Anúncio</button>
                        </div>
                    </label>

                </form>
            </PageArea>
         </PageContainer>
    )
    }
   
    
export default Page;