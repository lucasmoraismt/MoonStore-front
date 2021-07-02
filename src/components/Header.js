import styled from "styled-components";
import Logo from "./assets/Logo.png";
import { IoPersonSharp } from "react-icons/io5";
import { RiShoppingCartLine, RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import axios from "axios";

export default function Header({ cartList }) {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.user && !user?.token) {
      const userStorage = JSON.parse(localStorage.user);
      setUser(userStorage);
    }
  }, []);

  async function Logout() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}logout`, config);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <TopBox>
      <Link to="/">
        <LogoBox>
          <img src={Logo} alt="Cervo" />
          <p>MoonStore</p>
        </LogoBox>
      </Link>
      <IconsBox>
        {user ? (
          <UserBox enabled={user}>
            <IoPersonSharp className="icon" />
            <p className="username">
              {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}
            </p>
            <div />
          </UserBox>
        ) : (
          <Link to="/login">
            <UserBox enabled={user}>
              <IoPersonSharp className="icon" />
              <p>Sign In</p>
            </UserBox>
          </Link>
        )}

        <Link to="/cart">
          <CartBox>
            <RiShoppingCartLine className="icon" />
            <p>{cartList?.length}</p>
          </CartBox>
        </Link>
        {user ? <RiLogoutBoxRLine className="icon" onClick={Logout} /> : ""}
      </IconsBox>
    </TopBox>
  );
}

const TopBox = styled.div`
  height: 60px;
  width: 100%;
  color: black;
  background-color: #0f4c75;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  z-index: 2;

  @media (max-width: 500px) {
    padding: 0px;
  }
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 55px;
    margin-left: 15px;
  }
  p {
    font-family: "Quicksand", sans-serif;
    color: white;
    font-size: 24px;
  }
  @media (max-width: 500px) {
    img {
      margin-left: 5px;
    }
    p {
      font-size: 22px;
    }
  }
`;
const IconsBox = styled.div`
  display: flex;
  align-items: center;
  color: white;
  .icon {
    font-size: 26px;
    margin-right: 15px;
    color: #bbe1fa;
    cursor: pointer;
  }
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  max-width: 100px;
  margin-right: 10px;
  p {
    font-size: 12px;
    margin-left: -12px;
    margin-right: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 14px;
  }
  .icon {
    color: #bbe1fa;
  }
  div {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #67eb34;
    position: absolute;
    bottom: -1px;
    left: 12px;
  }

  @media (max-width: 500px) {
    margin-right: 0px;
    .username {
      display: none;
    }
  }
`;
const CartBox = styled.div`
  display: flex;
  position: relative;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
    right: 12.5px;
    font-size: 12px;
    padding: 0px 2px;
    width: 15px;
    height: 15px;
    max-width: 20px;
    border-radius: 50%;
    text-align: center;
    color: white;
    position: absolute;
    font-family: "Inter", sans-serif;
  }
`;
