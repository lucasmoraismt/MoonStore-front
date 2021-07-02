import styled from "styled-components";
import { Link } from "react-router-dom";
import GameCart from "./GameCart";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";

export default function Cart({ cartList, setCartList }) {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.user && !user?.token) {
      const userStorage = JSON.parse(localStorage.user);
      setUser(userStorage);
    }
  }, []);

  async function FinishPurchase() {}
  async function DeleteFromCart() {}
  return (
    <Container>
      <BoxCart>
        {cartList.length > 0
          ? cartList.map((e) => {
              return (
                <GameCart
                  title={e.title}
                  img={e.poster}
                  price={e.price}
                  id={e.id}
                  discount={e.discount}
                />
              );
            })
          : "You have no items on your cart"}

        <LowInfos>
          <TotalValue>
            <p> Total</p>
            <p> R$ 200.00</p>
          </TotalValue>
          <Link to="/">
            <KeepBuying>Continue shopping</KeepBuying>
          </Link>
          <Finish onClick={FinishPurchase}>Checkout</Finish>
        </LowInfos>
      </BoxCart>
    </Container>
  );
}

const BoxCart = styled.div`
  background-color: #0f4c75;
  width: 800px;
  border-radius: 2px;
  padding: 25px 0px 15px;
`;
const Container = styled.div`
  height: calc(100vh - 60px);
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px 40px;

  @media (max-width: 400px) {
    padding: 0px 20px;
  }
`;
const Finish = styled.button`
  background-color: #5bb356;
  border: none;
  cursor: pointer;
  color: #1b262c;
  border-radius: 3px;
  font-size: 12px;
  height: 30px;
  width: 80px;
  position: absolute;
  bottom: 15px;
  right: 5%;
`;

const KeepBuying = styled.button`
  cursor: pointer;
  background-color: #1b262c;
  border: none;
  color: #bbe1fa;
  border-radius: 3px;
  font-size: 12px;
  height: 30px;
  width: 140px;
  position: absolute;
  bottom: 15px;
  right: calc(5% + 100px);
`;
const TotalValue = styled.div`
  font-size: 14px;
  display: flex;
  color: white;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  position: absolute;
  bottom: 50px;
  right: 5%;
`;
const LowInfos = styled.div`
  position: relative;
  height: 70px;
`;
