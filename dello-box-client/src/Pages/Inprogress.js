import React from 'react'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Inprogress() {
    return (
        <div>
            <h1>
                In progress
            </h1>
            <Link to ="/home" >
            <Button variant="primary" type="submit"> 
            Progress we made if you had an account
            </Button>
            </Link>
        </div>
    )
}
