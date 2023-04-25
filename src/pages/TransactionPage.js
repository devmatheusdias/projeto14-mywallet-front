import { useContext, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"

export default function TransactionsPage() {

  const navigate = useNavigate();

  const { token } = useContext(UserContext)

  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  function novaTransacao(e) {
     e.preventDefault();
   
     const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.post('http://localhost:5000/nova-transacao/saida',{value, description}, config)
    .then((res) => {
      console.log(res.data)
      navigate('/home')
    })
    .catch(err => alert(err))

  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={novaTransacao}>
        <input placeholder="Valor" type="text" value={value} onChange={e => setValue(e.target.value)} required/>
        <input placeholder="Descrição" type="text" value={description} onChange={e => setDescription(e.target.value)} required/>
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
