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
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS , USER_LOGIN_CIPHER} from '../constants/constatnts'


function SecurityQuestion({location, history}) {
    const [message, setmessage] = useState('')
    const [que1, setque1] = useState('')
    const [ans1, setans1] = useState('')
    const [que2, setque2] = useState('')
    const [ans2, setans2] = useState('')
    const [suppliedAns1, setSuppliedAns1] = useState('')
    const [suppliedAns2, setSuppliedAns2] = useState('') 
    

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo,} = userLogin

    

    useEffect(async ()=>{

        const getDataFromFireStore = async () => {
            const data = db.collection("user").doc(userInfo.payload.email);
            const doc = await data.get();
            if (!doc.exists) {
            console.log('No such document!');
            } else {
                //console.log(doc.get("ans1"));
                setque1(doc.get("que1"));
                setque2(doc.get("que2"));
                setSuppliedAns1(doc.get("ans1"));
                setSuppliedAns2(doc.get("ans2"));
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
        
        if(suppliedAns1===ans1 && suppliedAns2===ans2){
            //dispatch({type:USER_LOGIN_SUCCESS, payload:userInfo});
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            localStorage.setItem('securityCheck', true);
            //dispatch({type:USER_LOGIN_SECURITY, payload:userInfo})
            history.push('/ciphersecurity');
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

                <Form.Group controlId="name">
                    <Form.Label>{que1}</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your Name'
                        value={ans1}
                        onChange={(e)=> setans1(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>{que2}</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your email'
                        value={ans2}
                        onChange={(e)=> setans2(e.target.value)}
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

export default SecurityQuestion
