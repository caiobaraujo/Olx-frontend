import styled from 'styled-components';


export const Item = styled.div`
     
    .itemGeneral {
        display: flex;
        justify-content: center;
        align-items: center;

    
    
  a {
    display: flex;
    border: 1px solid #fff;
    margin: 10px;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    color: #000;
    background-color: #fff;
    flex:2;
    
    

    .itemImage img {
      
      width: 40px;
      height: 40px;
      border-radius: 5px;
      flex: 1;
    };
    
    &:hover {
      background-color: #eee;
      border: 2px solid #ccc;
    };
    .itemName {
      font-weight: bold;
      flex: 3;
    };
    .itemPrice {
      flex: 1;
    };
   
  };

  .buttons{
    flex: 1;
    
    
    text-align: right;
    
   
    .btn-1 {
      margin: 10px;
      background-color: #d22;
      width: 100px;
      height: 30px;
      border-radius: 25px;
      cursor: pointer;
      border: 1px solid #ccc;
      font-weight: bold;
      &:hover {
        background-color: #b11;
        border: 2px solid #ccc;
      };
    };
    .btn-2 {
      margin: 10px;
      background-color: #2d2;
      width: 100px;
      height: 30px;
      border-radius: 25px;
      cursor: pointer;
      border: 1px solid #ccc;
      font-weight: bold;
      &:hover {
        background-color: #1b1;
        border: 2px solid #ccc;
      };
    };
  }
`;

