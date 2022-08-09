import React from "react";
import { Link } from 'react-router-dom';
import { Item, AdImage } from './styled';

export default (props) => {

    let price = '';
    let imagem = '';

    if(props.data.priceNegotiable) {
        price = 'Preço Negociável';
    } else {
        price = `R$ ${props.data.price}`;
    }

     if(props.data.images) {
        imagem = `http://localhost:5000/media/${props.data.images[0].url}`
        
       
       
    }
     
       

    return (
        <Item className="aditem">
          <div className="itemGeneral">
          <Link to={`/ad/${props.data.id}`}>
            
           
            <div className="itemName">
              {props.data.title}
            </div>
            <div className="itemPrice">{price}</div>
            <div className="itemImage">
              <img src={imagem  ? imagem: props.data.image } alt="" />
            </div>
          </Link>
          <div className="buttons">
          <button className="btn-2"  onClick={() => props.onEdit(props.data.id)}>Editar</button>
          <button className="btn-1" onClick={() => props.onDelete(props.data.id)}>Excluir</button>
          
          </div>
          </div>
        </Item>
      );
}