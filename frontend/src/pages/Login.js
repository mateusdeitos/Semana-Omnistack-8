import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import './Login.css';
import api from '../services/Api';



const Login = ({ history }) => {

    const [username, setUsername] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/devs', {
            username
        });

        const { _id: id } = response.data;

        console.log(id);

        history.push(`/dev/${id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                <input
                    type="text"
                    placeholder="Digite seu usuário no Github"
                    onChange={e => setUsername(e.target.value)}
                />
                <button>Enviar</button>
            </form>

        </div>
    );
}
export default Login;