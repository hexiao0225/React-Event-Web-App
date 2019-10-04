import React from "react";
// import DateInput from './DateInput'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import NavBar from './NavBar';
// import axios from 'axios';
// import ImageUploader from 'react-images-upload';




const coverImageStyle = {
  flex: '1 1 0%',
    display: 'grid',
    height: '40%',
    width: '90%',
    overflow:'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}

const centerTextStyle={
  fontFamily:'Lato',
  fontSize:'70px',
  fontWeight:'600',
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color:'white',
  transitionDelay: '2s'
}

const whiteSpaceStyle = {
  height:'100px'
}



export default class CreateProfile extends React.Component {

  constructor(props){
    super(props);
  
    this.state = {
      bio : '',
      city : '',
      picture:null,
    };

    // this.onDrop = this.onDrop.bind(this);

  }

  handleChangeFile(event) {
    const file = event.target.files[0];
    this.setState({
      picture: file,
    });
  }

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

//   onDrop(picture) {
//     this.setState({
//         picture: this.state.picture.concat(picture),
//     });
//   }

  handleSubmit = e =>{

    let formData = new FormData();
    formData.append('bio', this.state.bio);
    formData.append('city', this.state.city);
    formData.append('user', localStorage.getItem('userid'));
    formData.append('picture', this.state.picture);
    // for(var i = 0; i < this.state.picture.length; i++) {
    //     formData.append('picture', this.state.picture[i]);
    // }
    console.log(formData);
    fetch('http://127.0.0.1:8000/api/profile/create/', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Authorization': 'Token ' + localStorage.getItem('token')
      },
      body: formData,
    }).then(res => res.json())
    .then((data) => {
      console.log(data);
    }).catch(err => console.log(err));
    
  }
  render(){
    // let uploadImageSucceedText;
    // if (this.state.picture.length > 0){
    //   uploadImageSucceedText = <h3>Your Image is Uploaded</h3>
    // }
    return (
      <div>
        <Row>
            <NavBar></NavBar>
              <Image style={coverImageStyle} src={require('./static/craft.jpg')}></Image>
              <div style={centerTextStyle}>Create Your Profile</div>
        </Row>
        <Row style={whiteSpaceStyle}></Row>

        <Row>
            <Col xs={4} md={4}>
            
            </Col>
            <Col xs={4} md={4}>
            <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTitle">
                          <Form.Label>Bio</Form.Label>
                          <Form.Control type="name" 
                              name="bio" 
                              placeholder="share your interests!"
                              value={this.state.bio}
                              onChange={this.handle_change}
                              required
                              />
                        </Form.Group>
                    </Form.Row>
                    
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTitle">
                          <Form.Label>City</Form.Label>
                          <Form.Control type="name" 
                              name="city" 
                              placeholder="city"
                              value={this.state.city}
                              onChange={this.handle_change}
                              required
                              />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDescription">
                          {/* <ImageUploader
                              withIcon={true}
                              buttonText='Choose images'
                              onChange={this.onDrop}
                              imgExtension={['.jpg', '.gif', '.png', '.gif']}
                              maxFileSize={5242880}
                          />
                          {uploadImageSucceedText} */}
                          <input type = "file" onChange = {this.handleChangeFile.bind(this) }accept=".jpg,.jpeg,.png"></input>

                        </Form.Group>
                    </Form.Row>
    
                    <Button variant="primary" type="submit">
                        Create New Event
                    </Button>
                    </Form>
            </Col>
            <Col xs={4} md={4}>
              
            </Col>
        </Row>
              
      </div>
      )
  }
};


