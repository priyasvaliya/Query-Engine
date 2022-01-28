import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
// import 'react-dropdown-now/style.css';
import {  useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import db from '../firebase.config'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from '../constants/constatnts'
import xtype from 'xtypejs'
import {  
    hashString
  } from 'react-hash-string'

function CipherScreen({location, history}) {
    const [message, setmessage] = useState('')
    const [caesar, setcaesar] = useState(0)
    const [clueans, setclueans] = useState('')
    const [clueQue, setClueQue] = useState('')
    const crypto = require('crypto')
    
    let key;
    let hashdatabasekey; 
    // const { authenticate } = useContext(AccountContext);
    let cipher_string= ["serverless", "computing", "programing"];

    const random = Math.floor(Math.random() * cipher_string.length);
    
  
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo,} = userLogin

    useEffect(async ()=>{
        console.log("we are here")
        setClueQue(cipher_string[random])
        const getDataFromFireStore = async () => {
            const data = db.collection("user").doc(userInfo.payload.email);
            
            const doc = await data.get();
            
            if (!doc.exists) {
            console.log('No such document!');
            } else {
            
                key=doc.get("cipher_key");
                key=key + ''
                hashdatabasekey = hashString(key);  
                setcaesar(hashdatabasekey);
                console.log(hashdatabasekey);
                
                return doc;
            }
        };

        if(userInfo){
           getDataFromFireStore();
        }
        else{
            history.push("/login")
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        
        let actual_answer = '';
        let charcode = 0;
        let hashuserkey;
        for (let i = 0; i < clueQue.length; i++) {
            // debugger;
            charcode = parseInt((clueans[i].charCodeAt(0))) - parseInt((clueQue[i].charCodeAt(0)));
            charcode=charcode + ''
            hashuserkey=hashString(charcode);  
            actual_answer += String.fromCharCode(charcode);
            console.log("actual answer",charcode);
        }
        console.log("hash user key"+hashuserkey);
        console.log("hash database key"+caesar);
        

       
        
       
        if(hashuserkey==caesar){
            console.log(" string matched")
            
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            localStorage.setItem('securityCheck', true);
            dispatch({type:USER_LOGIN_SUCCESS, payload:userInfo});
            
            history.push('/');
        }
        else{
            setmessage("Check answer one more time")
        }
        
    }

    return (
        <FormContainer>
            <h1>Enter a correct answer to login</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId="cipherans">
                    <Form.Label>{clueQue}</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your Name'
                        value={clueans}
                        onChange={(e)=> setclueans(e.target.value)}
                    />
                </Form.Group>


            <Button type='submit' variant='primary'>Login</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                Already Have An Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default CipherScreen
