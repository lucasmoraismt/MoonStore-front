import Modal from "react-modal";
import {useState} from "react";
import {Link,useHistory} from "react-router-dom";
import styled from "styled-components";
import "../styles/modal-styles.css";
export default function AfterPurchaseModal({modalIsOpen,setIsOpen}){
    
    Modal.setAppElement(".root");
    let history = useHistory();
    function closeModal() {
        setIsOpen(false);
      }
    function CloseAndGo(){
        setIsOpen(false);
        history.push("/")
    }
      return(
        <>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            overlayClassName="Overlay" 
            className="Modal"
            contentLabel="Final"
            shouldCloseOnOverlayClick={false}
        >

            <ContainerModal>
                
                    <h1>THANK YOU FOR YOUR PURCHASE!</h1>
                    <h2>An email confirmation was sent to you. To access your items, just visit your <strong>library</strong>  whenever you want.</h2>
                    <button onClick={CloseAndGo}>Back to the store</button>
                
            </ContainerModal>
        </Modal>
        </>
      )
}


const ContainerModal=styled.div`
    width: 100%;
    background-color: #0F4C75;
    padding-top:20px;
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 30px;
    color: white;
    text-align: center;
    h1{
        font-size: 18px;
        margin-bottom: 15px;
    }
    button{
        background-color: #5bb356;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 3px;
        font-size: 16px;
        height: 30px;
        width: 150px;
        margin-bottom: 15px;
    }
    h2{
        margin-bottom: 20px;
    }
    strong{
        text-decoration: underline;
        cursor: pointer;
    }
    @media(max-width:940px){
        
    }
`