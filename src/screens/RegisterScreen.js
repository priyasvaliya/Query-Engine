import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
// import 'react-dropdown-now/style.css';
import {  useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import UserPool from "../UserPool";
import {USER_REGISTER_SUCCESS} from '../constants/constatnts'
import db from '../firebase.config'
import { doc, collection, query, where, onSnapshot } from "firebase/firestore";

function RegisterScreen({location, history}) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setname] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setmessage] = useState('')
    const [que1, setque1] = useState('')
    const [ans1, setans1] = useState('')
    const [que2, setque2] = useState('')
    const [ans2, setans2] = useState('')
    const [cipher_key, setkey] = useState('')
    const [box_num, setbox] = useState('')
    let i=0
    let label='A'
    

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(()=>{

    },[history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        i=i+1; 
        if (i==4){
            i=0;
            let charcode = (label.charCodeAt(0)) + 1;
            label = String.fromCharCode(charcode);
        }
        console.log("label is here", label);
        localStorage.setItem('box number', label);
        UserPool.signUp(email, password, [], null, async (err, data) => {
            if (err) {
              console.error(err);
              setmessage(err.message);
              return;
            }
            console.log(data);

            const userRef =  await db.collection("user").doc(email).set({
                que1,
                que2,
                ans1,
                ans2,
                box_num:label,
                cipher_key,
              });  

            dispatch({type:USER_REGISTER_SUCCESS,payload:data.user});
            history.push('/codeverify');
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
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your Name'
                        value={name}
                        onChange={(e)=> setname(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e)=> setemail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e)=> setpassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required 
                        type='password'
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={(e)=> setconfirmPassword(e.target.value)}
                    />
                </Form.Group>

            
                <Form.Group controlId='que1'> 
                    <Form.Label>Security Question 1</Form.Label>
                    <Form.Control
                        as='select'
                        value={que1}
                        onChange={(e)=>setque1(e.target.value)}
                    >
                        <option value=''>Select</option>
                        <option value='Who is your favorite childhood hero?'>Who is your favorite childhood hero?</option>
                        <option value='What is yout favorite subject in school?'>What is yout favorite subject in school?</option>
                        <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                                         
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="ans1">
                    <Form.Label>Security Answer 1</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your Answer'
                        value={ans1}
                        onChange={(e)=> setans1(e.target.value)}
                    />
                </Form.Group>
             
                <Form.Group controlId='que2'> 
                    <Form.Label>Security Question 2</Form.Label>
                    <Form.Control
                        as='select'
                        value={que2}
                        onChange={(e)=>setque2(e.target.value)}
                    >
                        <option value=''>Select</option>
                        <option value='Who is your favorite childhood hero?'>Who is your favorite childhood hero?</option>
                        <option value='What is yout favorite subject in school?'>What is yout favorite subject in school?</option>
                        <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                                         
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="ans2">
                    <Form.Label>Security Answer 1</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your Answer'
                        value={ans2}
                        onChange={(e)=> setans2(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="cipher_key">
                    <Form.Label>Enter Cipher key</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your Answer'
                        value={cipher_key}
                        onChange={(e)=> setkey(e.target.value)}
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

export default RegisterScreen
