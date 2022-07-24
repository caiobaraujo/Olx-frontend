import React from "react";
import {Link} from "react-router-dom";

const Page = () => {
    return (
    <div>
        Pagina inicial
        <hr/>
    <a href="/about">About</a>
    <hr/>
    <Link to="/about">Sobre</Link>
    </div>
    );
    }
   
    
export default Page;