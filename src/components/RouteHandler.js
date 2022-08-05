import react, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLogged } from '../helpers/AuthHandler'
export default ({ children, ...rest }) => {
    let logged = isLogged();
    const navigate = useNavigate();
    let authorized = (rest.private && !logged) ? false : true;

    if(authorized) {
        return children;
    } else {
        useEffect(() => {
            navigate('/signin', {state:{txt: 'Faça Login para postar um anúncio'}});
        } , []);

    }
}