
import { useState } from 'react';
import Header from './shared/Header.jsx';
import TodosPage from './features/Todos/TodosPage.jsx';
import Logon from './features/Logon.jsx';
import './App.css';


function App() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  return (
    <div>
      <Header token={token} onSetToken={setToken} onSetEmail={setEmail}/>
      {token ? (
        <TodosPage token={token} /> 
      ) : (
        <Logon onSetEmail={setEmail} onSetToken={setToken} />
      )}
    </div>
  );
}

export default App
