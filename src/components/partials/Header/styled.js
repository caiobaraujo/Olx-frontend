import styled from 'styled-components';

export const HeaderArea = styled.header`
  background-color: #fff;
  height: 60px;
  border-bottom: 1px solid #ccc;
  
  .container {
    max-width: 1000px;
    margin: auto;
    display: flex;
  };
  a {
    text-decoration: none;
  };
  .logo {
    
    flex: 1;
    
    img {
      height: 50px;
      width: 200px;
      object-fit: contain;
      float: left;
    }
  
  };
  nav {
    padding: 10px 0;
    ul, li {
      margin: 0;
      padding: 0;
      list-style: none;
    };
    ul {
      display: flex;
      align-items: center;
      height: 40px;
    };
    li {
      margin: 0 20px;
      a, button {
        border: 0;
        background: none;
        cursor: pointer;
        outline: 0;
        color: #000;
        font-size: 14px;
        transition: all 0.2s ease-in-out 0s;
        &:hover {
          color: #999;
        };
        &.button {
          background-color: #ff8100;
          border-radius: 4px;
          color: #fff;
          padding: 5px 10px;
          transition: all 0.2s ease-in-out 0s;
          &:hover {
            background-color: #e57706;
          };
        };
      };
    };
  };
  @media (max-width: 600px){
    & {
      height: auto;
    };
    .container {
      flex-flow: column;
    };
    .logo {
      justify-content: center;
      margin-top: 20px;
    };
    nav ul {
      flex-direction: column;
      height: auto;
    };
    nav li {
      margin: 10px 0;
    };
  };
`;