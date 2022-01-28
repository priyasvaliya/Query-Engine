import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { AccountContext } from "../components/Account";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SECURITY, USER_LOGIN_SUCCESS } from '../constants/constatnts'
import Chatbot from '../components/Chatbot';

function LoginScreen({location, history}) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const { authenticate } = useContext(AccountContext);

   const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(()=>{
        if(userInfo && userInfo.securityCheck){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch({type:USER_LOGIN_REQUEST})
        authenticate(email, password)
        .then((data) => {
            console.log("Logged in!", data);
            dispatch({type:USER_LOGIN_SECURITY, payload:data.idToken})
            history.push("/loginsecurity");
        })
        .catch((err) => {
            console.error("Failed to login", err);
            dispatch({type:USER_LOGIN_FAIL, payload:err.message})
            // setmessage(err.message);
        });
            // dispatch(login(email,password))
        }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e)=> setemail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e)=> setpassword(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                New User? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
            <Chatbot/>
        </FormContainer>
    )
}

export default LoginScreen
