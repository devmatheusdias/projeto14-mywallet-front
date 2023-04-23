import axios from 'axios';
import { Link, Navigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import { useNavigate } from "react-router-dom";



export default function SignUpPage() {

  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function signUp(e) {

    e.preventDefault();

    if (passwordConfirm !== password) {
      setPasswordConfirm("");
      return alert("insira um password valido!")
    }

    axios.post("http://localhost:5000/cadastro", {name, email, password})
      .then(res => navigate("/"))
      .catch(err => alert('insira os dados corretamente'));

  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" value={name} onChange={e => setName(e.target.value)} required />

        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <input placeholder="Senha" type="password" autocomplete="new-password" value={password} onChange={e => setPassword(e.target.value)} minLength={3} required />

        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} minLength={3} required />

        <button type="submit">Cadastrar</button>

      </form>

      <Link>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
