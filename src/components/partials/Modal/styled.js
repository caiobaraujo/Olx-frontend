import styled from "styled-components";

export const ModalPage = styled.div`
    .modalBackground {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        display: flex;
        z-index: 1;

        
    }
    .modalContainer {
        width: 500px;
        height: auto;
        background-color: #fff;
        border-radius: 3px;
        padding: 20px;
        box-shadow: 0px 0px 3px #999;
        display: flex;
        flex-direction: column;
       
        
    }
    .titleCloseBtn {
        display: flex;
        justify-content: flex-end;
        float: right;
   
    }

    .titleEdit {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        align-self: center;
    }

    .form {
        
        
        

        .area {
          display: flex;
          align-items: center;
          padding: 10px;
          max-width: 500px;
          .area--title {
            width: 120px;
            text-align: right;
            margin-right: 10px;
            font-weight: bold;
            font-size: 14px;
          };
          .area--input {
            display: flex;
            flex: 1;
            input {
              width: 100%;
              font-size: 14px;
              
              padding: 5px;
              border: 1px solid #ddd;
              border-radius: 3px;
              outline: 0;
              transition: all 0.4s ease-in-out 0s;
              &:focus{
                border: 1px solid #333;
                color: #333;
              };
            };
            input[type="checkbox"]{
              width: unset;
              margin: 0;
              align-self: flex-start;
              float: left;
            };
            button {
              background-color: #0089ff;
              border: 0;
              outline: 0;
              padding: 5px 10px;
              border-radius: 4px;
              color: #fff;
              font-size: 15px;
              cursor: pointer;
              transition: all 0.2s ease-in-out 0s;
              &:hover {
                background-color: #006fce;
              };
            };
          };
        };
      };


`;