import React from "react";
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import axios from 'axios';




const imageStyle = {
    maxWidth:'100px',
    maxHeight:'100px',
    textAlign:'center'
}

const joinButtonStyle = {
    maxWidth:'100px',
    maxHeight:'100px',
    float:'left'
}

const cardStyle = {
    borderRadius:'25px',
    display:'inline-block',
    width:'28%',
    height:'28%',
    maxWidth:'400px',
    margin:'20px',
    height:'600px !important',
    overflow:'hidden',
}


export default class EventThumbNail extends React.Component{
    constructor(props) {
        super()
        // console.log(props)
        this.state = {
            content: null,
            picture : null
          };
          
        

    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/event/picture?eventid=` + this.props.props.id)
        .then(res => {
          const pictures = res.data;
          // const eventIds = items.map(items => items.id);
          this.setState({ 
            picture: pictures[0].picture
           });
        })
    }

    /* Actually useless now. Just in case needed for future */
    componentDidUpdate(prevProps) {
        if(this.props.props.id != prevProps.props.id) {
            axios.get(`http://localhost:8000/api/event/picture?eventid=` + this.props.props.id)
            .then(res => {
              const pictures = res.data;
              // const eventIds = items.map(items => items.id);
              this.setState({ 
                picture: res.data[0].picutre
               });
            })
        }
    }
  
    render(){
    
        // console.log(this.state.picture)
        
        // const id = this.props.props.id
        // console.log(id)

        // const Card = () => (            
        // )
        // console.log(this.state.picture)
        return(
            <>
            <Card style={cardStyle}>
            {/* <Card.Img variant="top" src={require('./static/' + imgurl)} /> */}
            { this.state && this.state.picture && <Card.Img variant="top" src={this.state.picture}/>}
          
            <Card.Body>
                <Card.Title style={{fontWeight:'600px',fontSize:'18px'}}>{this.props.props.name}</Card.Title>
                <Card.Text style={{fontWeight:'400px',fontSize:'12px'}}><span> ${this.props.props.price} </span>{this.props.props.start_date} </Card.Text>
                {/* <Card.Text style={{fontSize:'12px'}}>
                    {this.props.props.description}
                </Card.Text> */}
                <Button style={{textAlign:'center',borderRadius:'25px',fontFamily:'Lato'}} variant="outline-info" href={"/event/" + this.props.props.id}>Learn More</Button>
            </Card.Body>
            </Card>
            </>
            
            
      )
    }
}


// export default EventThumbNail

