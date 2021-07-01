import styled from "styled-components";

const Box = styled.div`
  background-color: #0f4c75;
  width: 500px;
  padding-bottom: 30px;
  border-radius: 8px;
  margin: 0px auto;
  @media (max-width: 600px) {
    width: 90%;
  }
`;
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  font-family: "Quicksand", sans-serif;
  color: white;
  font-size: 32px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px;
  img {
    width: 70px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  p {
    margin-left: 10%;
    color: white;
    margin-bottom: 7px;
    font-size: 16px;
  }
  input {
    font-family: "Inter", sans-serif;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 13px;
    border-radius: 5px;
    border: none;
    outline: none;
    height: 35px;
    background-color: #3282b8;
    color: white;
    padding-left: 5px;
    font-size: 14px;
  }
  input:disabled {
    pointer-events: none;
    filter: brightness(0.8);
  }
`;
const Button = styled.button`
  width: 33%;
  height: 32px;
  margin: 0 auto;
  margin-top: 15px;
  background-color: #3282b8;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  :hover {
    filter: brightness(1.15);
    cursor: pointer;
  }
  :disabled {
    pointer-events: none;
    filter: brightness(0.8);
  }
`;
const Redirect = styled.p`
  margin-top: 15px;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: white;
  text-align: center;
  font-size: 12px;
  text-decoration: underline;
  :hover {
    cursor: pointer;
  }
`;

export { Redirect, Button, Form, Title, Container, Box };
