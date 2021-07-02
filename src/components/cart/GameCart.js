import styled from "styled-components";
import { CgTrashEmpty } from "react-icons/cg";
export default function GameCart({ title, img, price, id, discount }) {
  async function FinishPurchase() {
    alert("vai comprar");
  }
  async function DeleteFromCart() {
    alert("vai deletar");
  }
  return (
    <Game>
      <GameInfo>
        <img src={img} />
        <GameName>{title}</GameName>
      </GameInfo>

      <PriceBox>
        {discount > 0 ? (
          <div className="discount">
            <p>-{discount}%</p>
          </div>
        ) : (
          ""
        )}
        <span className={discount > 0 ? "original-price" : "current-price"}>
          R$ {(price / 100).toFixed(2)}
        </span>
        {discount > 0 ? (
          <span className="current-price">
            R$ {((price / 100) * (1 - discount / 100)).toFixed(2)}
          </span>
        ) : (
          ""
        )}
        <CgTrashEmpty className="icon" onClick={DeleteFromCart} />
      </PriceBox>
    </Game>
  );
}
const Game = styled.div`
  width: 90%;
  height: 85px;
  background-color: #3282b8;
  display: flex;
  justify-content: space-between;
  border-radius: 3px;
  margin: 0 auto;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 64px;
    height: 85px;
    margin-right: 10px;
  }
  :hover {
    background-color: #3c9cdd;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 150px;

    img {
      height: 110px;
      width: 80px;
    }
  }
`;
const GameInfo = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    margin-bottom: 0px;
  }
`;
const PriceBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  font-size: 14px;
  .discount {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 40px;
    border-radius: 4px;
    background-color: #0f4c75;
    filter: brightness(1.15);
    color: white;
    margin-right: 8px;
  }
  .original-price {
    color: white;
    text-decoration: line-through;
    opacity: 0.5;
    margin-right: 8px;
  }
  .current-price {
    color: white;
    margin-right: 8px;
  }
  .icon {
    font-size: 20px;
    color: #bbe1fa;
    margin-bottom: 3px;
    cursor: pointer;
    :hover {
      color: #a12727;
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
    margin: 0px;
    padding-top: 8px;
    border-top: 1px solid #0f4c75;
  }
`;
const GameName = styled.p`
  color: #bbe1fa;
  font-size: 16px;
  margin-right: 20px;
`;
