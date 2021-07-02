import Header from "../Header";
import styled from "styled-components";
import { CgTrashEmpty } from "react-icons/cg"
import {Link} from "react-router-dom"
import GameCart from "./GameCart"

export default function Cart({cartList,setCartList}) {
  async function FinishPurchase(){
    console.log(cartList)
    alert('vai comprar')
  }
  async function DeleteFromCart(){
    alert('vai deletar')
  }
  console.log(cartList)
  return(
    <>
    <Header/>
    <Container>
      <BoxCart>
        {cartList.length>0?cartList.map((e)=>{
          return <GameCart title={e.title} img={e.poster} price={e.price} id={e.id} discount={e.discount}/>
        })
        :'You have no items on your cart'}
       
       <LowInfos>
        <TotalValue>
            <p> Total</p>
            <p> R$ 200.00</p>
        </TotalValue>
        <Link to="/">
          <KeepBuying>
            Continue shopping
          </KeepBuying>
        </Link>
        <Finish onClick={FinishPurchase}>
          Checkout
        </Finish>
       </LowInfos>
      </BoxCart>
    </Container>
    </>
  )
}

const BoxCart=styled.div`
  background-color: #0F4C75;
  width: 60%;
  border-radius: 2px;
  padding-top: 10px;
  

`
const Container=styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
  padding-bottom: 30px;
`
const Game=styled.div`
  width: 90%;
  height: 85px;
  background-color: #3282B8;
  display: flex;
  justify-content: space-between;
  border-radius: 3px;
  margin: 0 auto;
  align-items: center;
  margin-bottom: 10px;
  img{
    width: 64px;
    height: 85px;
    margin-right: 10px;
  }
  :hover{
    filter: brightness(1.2);
  }

`
const GameInfo=styled.div`
  display: flex;
  align-items: center;
`
const PriceBox=styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  .discount{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 35px;
    border-radius: 4px;
    background-color: #0F4C75;
    filter: brightness(1.15);
    font-size: 10px;
    color: white;
    margin-right: 8px;
  }
  .original-price{
    font-size: 10px;
    color: white;
    text-decoration: line-through;
    opacity: 0.5;
    margin-right: 8px;
  }
  .current-price{
    font-size: 10px;
    color: white;
    margin-right: 8px;
  }
  .icon{
    color:#BBE1FA;
    margin-bottom: 3px;
    cursor: pointer;
    :hover{
      color: #a12727;
    }
  }
`
const GameName=styled.p`
  color: #BBE1FA;
  font-size: 15px;
  margin-right: 20px;
 
`
const Discount=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 35px;
    border-radius: 4px;
    margin-right: 10px;
    background-color: #0f4c75;
    filter:brightness(1.2);
    font-size: 10px;
    color: white;
  
`
const Finish=styled.button`
  background-color:#5bb356 ;
  border: none;
  cursor: pointer;
  color: #1B262C;
  border-radius: 3px;
  font-size: 12px;
  height: 25px;
  position: absolute;
  bottom: 15px;
  right: 5%;
`

const KeepBuying=styled.button`
  cursor: pointer;
  background-color: #1B262C;
  border: none;
  color: #BBE1FA;
  border-radius: 3px;
  font-size: 12px;
  height: 25px;
  position: absolute;
  bottom: 15px;
  right: calc(5% + 80px);
`
const TotalValue=styled.div`
  font-size: 13px;
  display: flex;
  color: white;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  position: absolute;
  bottom:50px;
  right: 5%;
`
const LowInfos=styled.div`
  position: relative;
  height: 70px;

`