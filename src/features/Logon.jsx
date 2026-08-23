
import { useState } from 'react';

function Logon({ onSetEmail, onSetToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingOn, setIsLoggingOn] = useState(false);
    
    const handleSubmit = async(e) => {
      e.preventDefault();
      setIsLoggingOn(true); 

      try {
        const resp = await fetch('/api/users/logon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });
        const data = await resp.json();

        if(resp.status === 200 && data.name && data.csrfToken) {
            onSetEmail(data.name);
            onSetToken(data.csrfToken);
        } else {
            setAuthError(`Authentication failed: ${data?.message}`);
        }
      } catch (error) {
        setAuthError(`Error: ${error.name} | ${error.message}`);
      } finally {
        setIsLoggingOn(false);
      }
    };
    return (
        <form onSubmit={handleSubmit}>
            {authError && <p className='error'>{authError}</p>}

            <div>
                <label htmlFor='email'>Email</label>
                <input 
                    id='email'
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor='password'>Password</label>
                <input 
                    id='password'
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type='submit' disabled={isLoggingOn}>
                {isLoggingOn ? 'Logging in...' : 'Log On'}
            </button>
        </form>
    );
}

export default Logon;
