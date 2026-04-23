import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch {
      setErro('Email ou senha inválidos');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo" />
        <h1 className="login-heading">Bem-vindo de volta</h1>
        <p className="login-sub">Entre na sua conta para continuar</p>

        <div className="login-card">
          {erro && <p className="login-error">{erro}</p>}

          <form onSubmit={handleLogin}>
            <div className="login-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-field">
              <label>Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="login-btn">Entrar</button>
          </form>
        </div>

        <p className="login-footer">
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}