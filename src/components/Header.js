import styled from "styled-components"
import Logo from "./assets/Logo.png";
import { IoPersonSharp } from 'react-icons/io5';
import {RiShoppingCartLine,RiLogoutBoxRLine} from 'react-icons/ri';
import {IoIosLogOut} from 'react-icons/io';
import { Link,useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext"
import {useContext, useReducer} from "react"
import axios from 'axios'
export default function Header(){
    const {user, setUser}=useContext(UserContext);
    console.log(user)

    async function Logout(){
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }
        try{
            await axios.delete("http://localhost:4000/logout",config)
            setUser(null)
        }catch(err){
            console.log(err)
        }
    }
    return(
    <TopBox>
        <Link to="/">
            <LogoBox>
            <img src={Logo} alt="Cervo"/>
            <p>MoonStore</p> 
            </LogoBox>
        </Link>
        <IconsBox>
            {user
                ?<UserBox enabled={user}>
                    <IoPersonSharp className="icon"/>
                    <p>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</p>
                    <div/>
                </UserBox>
                :<Link to="/login" >
                    <UserBox enabled={user}>
                        <IoPersonSharp className="icon"/>
                        <p>Sign In</p>
                    </UserBox>
            </Link>}
            
            <Link to="/cart">
                <CartBox >
                    <RiShoppingCartLine className="icon"/>
                    <p>0</p>
                </CartBox>
            </Link>
            {user?<RiLogoutBoxRLine className="icon" onClick={Logout}/>:''}
        </IconsBox>
    </TopBox>
    )
}

const TopBox=styled.div`
    height: 39px;
    width: 100%;
    color: black;
    background-color: #0F4C75;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
`

const LogoBox=styled.div`
  display: flex;
  align-items: center;
  img{
      width: 37px;
      margin-left: 15px;
  }  
  p{
  font-family: 'Quicksand', sans-serif;
  color: white;
  font-size: 24px;
  }
`
const IconsBox=styled.div`
    display: flex;
    align-items: center;
    color: white;
    .icon{
        font-size: 20px;
        margin-right: 15px;
        color:#BBE1FA;
        cursor: pointer;
    }
   
`
const UserBox=styled.div`
display: flex;
align-items: center;
position: relative;
max-width: 95px;
p{
    font-size:11px;
    margin-left: -12px;
    margin-right: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 12px;
}
.icon{
    color:#BBE1FA;
    
}
div{
    width: 8px;
    height:8px;
    border-radius: 50%;
    background-color: #67eb34;
    position: absolute;
    bottom: -1px;
    left: 12px;
}
`
const CartBox=styled.div`
    display: flex;
    position: relative;
     p{
        background-color:red ;
        right: 12.5px;
        font-size: 10px;
        padding: 0px 2px;
        max-width: 20px;
        border-radius: 50%;
        text-align: center;
        color: white;
        position: absolute;
        font-family: 'Inter', sans-serif;
    }
    
`