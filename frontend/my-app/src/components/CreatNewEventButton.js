import React from "react";
import Button from 'react-bootstrap/Button'

const buttonStyle={
    color: '#fff',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: '1px',
    borderRadius: '20px',
    fontFamily:'Lato',
    fontSize:'15px',
    paddingLeft:'10px',
    paddingRight:'10px',
    paddingTop:'5px',
    paddingBottom:'5px',
    marginRight:'10px'
}



function CreateNewEventButton(){
    return(
        <Button style={buttonStyle} href="/create-event">Creat New Event</Button>
  )
}

export default CreateNewEventButton

