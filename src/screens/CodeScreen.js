import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import {  useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import UserPool from "../UserPool";

function CodeScreen({location, history}) {
    const [code, setcode] = useState('')
    const [message, setmessage] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(()=>{

    },[history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        userInfo.confirmRegistration(code, true,  (err, data) => {
            if (err) {
              console.error(err);
              setmessage(err.message);
              return;
            }
            console.log(data);
            history.push('/login');
          });

        
        
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId="name">
                    <Form.Label>code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your Name'
                        value={code}
                        onChange={(e)=> setcode(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>Register</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                Already Have An Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default CodeScreen
