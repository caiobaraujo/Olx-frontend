import styled from 'styled-components';


export const Item = styled.div`
  a {
    display: block;
    border: 1px solid #fff;
    margin: 10px;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    color: #000;
    background-color: #fff;
    
    

    .itemImage img {
      width: 100%;
      border-radius: 5px;
    };
    
    &:hover {
      background-color: #eee;
      border: 2px solid #ccc;
    };
    .itemName {
      font-weight: bold;
    };
   
  };
`;

