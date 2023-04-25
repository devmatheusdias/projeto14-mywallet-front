import axios from "axios";
import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useContext, useState } from "react";
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from "react-router-dom";


export default function HomePage() {

  const navigate = useNavigate();

  const { token, setTransactionType } = useContext(UserContext)
  const [user, setUser] = useState({})
  const [transactions, setTransactions] = useState([]);
  const [saldo, setSaldo] = useState([]);


  function goToTransactionPage(type) {
    setTransactionType(type);
    navigate(`/nova-transacao/${type}`);
  }

  function calculateBalance(transactions){
      let negativeBalance = 0;
      let positiveBalance = 0;

      for (let index = 0; index < transactions.length; index++) {
          if(transactions[index].tipo === 'entrada'){
            positiveBalance += transactions[index].value
          }else{
            negativeBalance += transactions[index].value
          }       
      }

      return positiveBalance - negativeBalance;
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.get("http://localhost:5000/home", config)
      .then((res) => {
        // setUser(res.data.name)
        setTransactions(res.data)
        let saldo = calculateBalance(res.data)
        setSaldo(saldo)
      })
      .catch((err) => alert(err))
  }, [])

  return (
    <HomeContainer>
      <Header>
        <h1>{user.name}</h1>
        <BiExit onClick={() => navigate('/')}/>
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map(transaction =>
            <ListItemContainer>
              <div>
                <span>{transaction.currentDate}</span>
                <strong>{transaction.description}</strong>
              </div>
              <Value color={transaction.tipo === "saida" ? "negativo" : "positivo"}>{`R$${transaction.value},00`}</Value>
            </ListItemContainer>)}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>{`R$ ${saldo},00`}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => goToTransactionPage('entrada')}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>

        <button onClick={() => goToTransactionPage('saida')}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`