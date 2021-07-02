import styled from "styled-components";
import Logo from "../assets/Logo.png";
import {
  Redirect,
  Button,
  Form,
  Title,
  Container,
  Box,
} from "../styles/signUpAndSignIn";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const [disabler, setDisabler] = useState(false);
  const { setUser } = useContext(UserContext);

  async function signIn(e) {
    e.preventDefault();
    setDisabler(true);
    const body = { email, password };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        body
      );
      setUser({
        id: response.data.userid,
        name: response.data.username,
        token: response.data.token,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.userid,
          name: response.data.username,
          token: response.data.token,
        })
      );
      history.push("/");
    } catch (err) {
      alert("Email or password incorrect.");
      setDisabler(false);
      console.log("err");
    }
  }
  return (
    <Container>
      <Box>
        <Title>
          <img src={Logo} alt="Cervo" />
          <p>MoonStore</p>
        </Title>
        <Form onSubmit={signIn}>
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={disabler}
          />
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={disabler}
          />
          <Button disabled={disabler}>Sign In</Button>
        </Form>
        <Link to={`/sign-up`}>
          <Redirect>First time? Create an account!</Redirect>
        </Link>
      </Box>
    </Container>
  );
}
