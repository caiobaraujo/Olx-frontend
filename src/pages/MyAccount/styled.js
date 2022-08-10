import styled from 'styled-components';

export const PageArea = styled.div`
  .user-area {
    background-color: #fff;
    border-radius: 3px;
    padding: 20px;
    box-shadow: 0px 0px 3px #999;

    .user-info {
      align-items: center;
      padding-bottom: 10px;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid #777;
      margin-bottom: 30px;
    }

    .area-title {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      font-size: 16px;
    }
    .button {
      
        margin: 10px;
        background-color: #d71;
        width: 200px;
        height: 30px;
        border-radius: 25px;
        cursor: pointer;
        border: 1px solid #ccc;
        font-weight: bold;
        &:hover {
          background-color: #a71;
          border: 2px solid #ccc;
        };
      
    }

   

    .ads-area {
      

      
        h2 {
          font-size: 20px;
        };
        .list {
          display: flex;
          flex-direction: column;
          .aditem {
            width: 100%;
          };
        };
      

    }
    
  };
`;
