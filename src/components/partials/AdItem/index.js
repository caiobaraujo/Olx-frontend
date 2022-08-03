import React from "react";
import { Link } from 'react-router-dom';
import { AdItem, AdImage } from './styled';

export default (props) => {
    return (
        <AdItem className="aditem">
          <Link to={`/ad/${props.data.id}`}>
            <div className="itemImage">
              <AdImage defaultImage={props.data.image}/>
            </div>
            <div className="itemName">
              {props.data.title}
            </div>
            <div className="itemPrice">...</div>
          </Link>
        </AdItem>
      );
}