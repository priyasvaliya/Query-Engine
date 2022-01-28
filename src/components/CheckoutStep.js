import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckOutStep({step1, step2, step3, step4}) {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>)
                    :
                    (
                        <Nav.Link disabled>Login</Nav.Link>
                    )
                }
            </Nav.Item>

            
            
        </Nav>
    )
}

export default CheckOutStep
