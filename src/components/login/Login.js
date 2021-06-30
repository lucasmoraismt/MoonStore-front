import styled from "styled-components"
import Logo from "../assets/Logo.png"
import {Redirect,Button,Form,Title,Container,Box} from "../styles/signUpAndSignIn"
import { Link,useHistory } from "react-router-dom";
import axios from "axios"
import {useState} from "react";

export default function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  let history=useHistory();
  const [disabler,setDisabler]=useState(false);

  async function signIn(e){
    e.preventDefault();
    setDisabler(true)
    const body={email,password};
    try{
        const response=await axios.post("http://localhost:4000/login",body)
        console.log(response.data);
        setDisabler(false)
        history.push('/')
        
    }catch(err){
        setDisabler(false)
        console.log('err')
    }
}
  return(
    <Container>
      <Box>
        <Title>
          <img src={Logo}/>
          <p>MoonStore</p> 
        </Title>
        <Form onSubmit={signIn}>
          <p>Email</p>
          <input type='email' value={email} onChange={e => setEmail(e.target.value)} ></input>
          <p>Password</p>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} ></input>
          <Button>Sign In</Button>
        </Form>
        <Link to={`/sign-up`}>
        <Redirect>First time? Create an account!</Redirect>
        </Link>
      </Box>
    </Container>
  )
}
