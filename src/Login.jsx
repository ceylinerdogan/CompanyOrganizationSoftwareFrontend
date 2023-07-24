import React, {useState} from 'react';


const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                />
            </div>
            <button onClick={handleSubmit} type="submit">Sign In</button>
        </form>
    );
};

export default Login;
    