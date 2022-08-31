import styled from 'styled-components';

export const SearchArea = styled.div`
    background-color: #ddd;
    padding:  0;
    border-bottom: 1px solid #ccc;

    .searchBox {
        background-color: #9bb83c;
        padding: 20px 15px;
        border-radius: 5px;
        box-shadow: 1px 1px 1px 0.3px rgba(0, 0, 0, 0.2);

        form {
            display: flex;
            flex: 1;

            input, select {
                height: 40px;
                border: 0;
                border-radius: 5px;
                outline: 0;
                font-size: 15px;
                color: #000;
                margin: 0 10px;
              };

            input {
                flex: 1;
                padding: 0 10px;
            }

            select {
                background-color: #fff;
                width: 100px;
              };

              button {
                background-color: #49aeef;
                font-size: 15px;
                border: 0;
                border-radius: 5px;
                color: #fff;
                height: 40px;
                padding: 0 20px;
                cursor: pointer;
                margin: 0 10px;
              };  
        }
    }

    .categoryList {
        max-width: 1000px;
        margin: auto;
        display: flex;
        flex-flow: wrap;
        margin-top: 10px;
        .categoryItem {
          width: 25%;
          justify-content: center;
          display: flex;
          align-items: center;
          color: #000;
          text-decoration: none;
          height: 50px;
          margin: 10px 0;
          transition: all 0.2s ease-in-out 0s;
          &:hover {
            color: #999;
          };
          img {
            width: 45px;
            height: 45px;
            margin: 10px;
          };
        };
      };
`;

export const PageArea = styled.div`
h2 {
  font-size: 20px;
};
.list {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;

  .aditem {
    width: 25%;
  }
}
.seeAllLink {
    color: #000;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    margin-top: 10px;
}
`;

export const PageTitle = styled.div`

  background-color: #ff8c00;
  padding: 5px;
  margin-bottom: 20px;
  h2{
    margin: 0;
    padding: 0;
    color:  #000;
    text-align: center;
  }

`;


