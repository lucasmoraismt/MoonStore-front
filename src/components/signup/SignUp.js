import styled from "styled-components";
import Logo from "../assets/Logo.png";
import { Link,useHistory } from "react-router-dom";
import {useState} from "react";
import {Redirect,Button,Form,Title,Container,Box} from "../styles/signUpAndSignIn"
import axios from "axios"
export default function SignUp() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [secPassword,setSecPassword]=useState("");
  let history=useHistory();
  const [disabler,setDisabler]=useState(false);

  async function signUp(e){
        e.preventDefault();
        setDisabler(true);
        if(password!=secPassword){
          alert('Please confirm your password again');
          setDisabler(false);
          return
        }
        const body={name,email,password,secPassword};
        try{
            await axios.post("http://localhost:4000/sign-up",body)
            setDisabler(false)
            history.push('/login')
        }
        catch(err){
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
        <Form onSubmit={signUp}>
          <p>Name</p>
          <input type='text' value={name} onChange={e => setName(e.target.value)}></input>
          <p>Email</p>
          <input type='email' value={email} onChange={e => setEmail(e.target.value)}></input>
          <p>Password</p>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
          <p>Confirm password</p>
          <input type='password' value={secPassword} onChange={e => setSecPassword(e.target.value)}></input>
          <Button>Sign Up</Button>
        </Form>
        <Link to={`/login`}>
        <Redirect>Switch back to log in</Redirect>
        </Link>
      </Box>
    </Container>
  );
}


