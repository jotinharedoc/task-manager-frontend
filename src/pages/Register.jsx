import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import './Login.css';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro('');

    if (password.length < 8) {
      setErro('Senha deve ter ao menos 8 caracteres');
      return;
    }

    try {
      await registerUser(name, email, password);
      navigate('/');
    } catch {
      setErro('Erro ao criar conta. Tente outro email.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo" />
        <h1 className="login-heading">Criar conta</h1>
        <p className="login-sub">Preencha os dados para se cadastrar</p>

        <div className="login-card">
          {erro && <p className="login-error">{erro}</p>}

          <form onSubmit={handleRegister}>
            <div className="login-field">
              <label>Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="login-btn">Criar conta</button>
          </form>
        </div>

        <p className="login-footer">
          Já tem conta? <Link to="/">Entrar</Link>
        </p>
      </div>
    </div>
  );
}