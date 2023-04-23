import axios from 'axios';
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";

export default function SignInPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function signIn(e){

    e.preventDefault();

    axios.post("http://localhost:5000/", {email, password})
    .then(res => navigate("/home"))    
    .catch(err => alert('insira os dados corretamente'))
  }


  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
        <input placeholder="Senha" type="password" autocomplete="new-password" value={password} onChange={e => setPassword(e.target.value)} required/>
        <button type='submit'>Entrar</button>
      </form>

      <Link to={'/cadastro'}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
