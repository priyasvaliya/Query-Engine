import React, {useEffect} from 'react';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import Chatbot from '../components/Chatbot'

function HomeScreen({history}) {

    const dispatch = useDispatch();

    let keyword = history.location.search

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo, securityCheck} = userLogin

    useEffect(() => {
        console.log(securityCheck)
        if(!userInfo || !securityCheck){
            history.push('/login')
        }

    }, [dispatch, keyword, history, userInfo, securityCheck])

    return (
        
        <div>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <h1>Welcome {userInfo && userInfo.payload.email}</h1>

            <h2>Your Box Number: {localStorage.getItem('box number')}</h2>
            
            <div>
            <iframe width="600" height="250" src="https://datastudio.google.com/embed/reporting/a4fd389c-3e39-46f3-b01f-5d69ae4b46a2/page/pVUgC" ></iframe>
            </div>
            <div style={{display:"flex",
    flexDirection:"row-reverse"}}>
            <Chatbot/>
            </div>
        </div>
        
    )
}

export default HomeScreen;