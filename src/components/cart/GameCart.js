import styled from 'styled-components';
import { CgTrashEmpty } from "react-icons/cg"
export default function GameCart({title,img,price,id,discount,cartList,setCartList}) {
    async function FinishPurchase(){
        alert('vai comprar')
      }
      async function DeleteFromCart(){
        
        let newArray=[];
        newArray=cartList.filter(item=>item.id!==id)
        setCartList(newArray)
      }
    return(
        <Game>
        <GameInfo>
          <img src={img}/>
          <GameName>{title}</GameName>
        </GameInfo>

        <PriceBox>
            {discount>0?
                (<div className="discount">
                    <p>-{discount}%</p>
                </div>):''}
            <span className={discount > 0 ? "original-price" : "current-price"}>
                R$ {(price / 100).toFixed(2)}
            </span>
            {discount > 0 ? (
                <span className="current-price">
                    R$ {((price / 100) * (1 - discount / 100)).toFixed(2)}
                </span>) : ("")}
          <CgTrashEmpty className="icon" onClick={DeleteFromCart}/>
        </PriceBox>
       </Game>
    )
};
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