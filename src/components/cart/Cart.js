import Header from "../Header";
import styled from "styled-components";

export default function Cart() {
  return(
    <>
    <Header/>
    <Container>
      <BoxCart>
       <Game>

       </Game>
      </BoxCart>
    </Container>
    </>
  )
}

const BoxCart=styled.div`
  background-color: #0F4C75;
  width: 50%;
  height: 500px;
`
const Container=styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
`
const Game=styled.div`
  width: 90%;
  height: 50px;
  background-color: white;
  
`
