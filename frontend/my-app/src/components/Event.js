import React from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import NavBar from './NavBar'
import Image from 'react-bootstrap/Image'
import CheckOut from './CheckOut'


// var markers = [];

const coverImageStyle = {

    flex: '1 1 0%',
      display: 'grid',
      overflow: 'hidden',
      height: '40%',
      width: '90%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
  
  }

let eventLat;
let eventLng;


const AnyReactComponent = ({ text }) => <div>{text}</div>;

const handleApiLoaded = (map, maps) => {
    // var pos;
    // var infoWindow = new maps.InfoWindow;

    function addMarker(location) {
        var marker = new maps.Marker({
            position: location,
            map: map,
            title: 'selected_point',
        });
        map.setCenter(location)
    } 
  
    addMarker({lat:eventLat,lng:eventLng});

    
  };



function getLasLng(str){
    const l = str.indexOf('(');
    const r = str.indexOf(')');
    const location = str.slice(l+1,r);
    const data = location.split(" ")
    return data;
}

export default class Event extends React.Component{

    constructor(props){
        super(props);
      
        this.state = {
            content: null,
            picture:null
        };
      }
      

      //get info from api here
      componentDidMount(){
        (async () => {
            const { eventid } = this.props.match.params
            const [contentRes, pictureRes] = await Promise.all([
              axios.get(`http://localhost:8000/api/event/${eventid}`),
              axios.get(`http://localhost:8000/api/event/picture?eventid=${eventid}`)
            ]);
          
            // do something with both responses
            this.setState({ 
                content:contentRes,
                picture:pictureRes
                });
          })();
        // const { eventid } = this.props.match.params
        // axios.all([
        //     axios.get('http://localhost:8000/api/event/${eventid}'),
        //     axios.get('http://localhost:8000/api/event/picture?eventid=${eventid}')
        //   ])
        //   .then(axios.spread((contentRes, pictureRes) => {
        //     this.setState({ 
        //         content:contentRes,
        //         picture:pictureRes
        //      });
        //   });
        


        // axios.get(`http://localhost:8000/api/event/${eventid}`)
        //   .then(res => {
        //     const item = res.data;
        //     console.log(item);
        //     this.setState({ content:item });
        //   })
        
        // axios.get(`http://localhost:8000/api/event/picture?eventid=${eventid}`)
        // .then(res => {
        // const items = res.data;
        // this.setState({ picture:items });
        // })
         
      }


    render() {
        let props = {
            picture: this.state.picture,
            content: this.state.content
        }
        const EventDetail = () => (
            <>
                <EventDetailPage {...props}></EventDetailPage>
            </>
          ); 
        return(
            <>
                { this.state && this.state.content && this.state.picture && <EventDetail></EventDetail> }
            </>
            

        )
    }    
}


class EventDetailPage extends React.Component {

    constructor(props) {
        super(props)
        console.log(this.props.content.data)
        this.state={
            eventId:0,
            joined:false
        }
    }

    handleSubmit = e =>{
        e.preventDefault();
        const { eventid } = this.props.content.data.id;
        
        const data = localStorage.getItem('userid');

        const url = 'http://127.0.0.1:8000/api/event/'+ {eventid} +'/add-user';
        console.log(url)
        axios.put(url, 1)
        .then(response => {
          console.log(response);
          this.setState({
            joined:true
          })
          
        }).catch(err => {
          console.log(err.response)
        //   this.setState({
        //     error_msg: err.response.data
        //   })
        });
      }

    render(){
        const addrs = this.props.content.data.address;
        const lat = parseFloat(getLasLng(addrs)[0]);
        
        const lng = parseFloat(getLasLng(addrs)[1]);
        let username = localStorage.getItem("username");
        eventLat = lat;
        eventLng = lng;

        const zoom = 11;
        const center = {lat:40,lng:-79}


        console.log("the location of this event is " + lat + " and "+ lng);
        let checkout;
        let props={
            price: this.props.content.data.price,
            id: this.props.content.data.id
        }
        if(username){
          checkout = <CheckOut  props={props}></CheckOut>
        }else{
          checkout = <a href="/">Log in to participate</a>
        }

        
        return(

            <>
            <Row style={{marginBottom:'100px'}}>
                <NavBar></NavBar>
                <Image style={coverImageStyle} src={require('./static/background_profile.jpeg')}></Image>
                </Row>
            <Row style={{marginBottom:'100px'}}>
                <Col xs={2} md={2}> </Col>
                <Col xs={10} md={10}>
                    <h1>{this.props.content.data.name}</h1>
                </Col>

            </Row>
            <Row>
              <Col xs={2} md={2}>
              
              </Col>
              <Col xs={6} md={6}>
               
                {/* <Image variant="top" src={this.props.picture.data[0].picture} /> */}
                {this.props.picture.data.map(picture => (
                    <Image style={{maxWidth:'80%'}}variant="top" key={picture.id} src={picture.picture} />
                    ))}

              <div>
                   
       
                   <div>
                       {/* <div.Title>{this.props.props.name} </Card.Title> */}
                       <p style={{marginTop:"100px"}}>{this.props.content.data.description}</p>
                       <p>Start Time: {this.props.content.data.start_date} {this.props.content.data.start_time}</p>
                       <p>End Time: {this.props.content.data.end_date} {this.props.content.data.end_time}</p>
                       <p>Address: {this.props.content.data.address_readable}</p>

                       <p style={{marginBottom:"100px"}}>Price: ${this.props.content.data.price}</p>
                       {checkout}
                       
                   </div>
                   <p>If you are the host of this event and you wish to update any information, please contact the admin at admin@eventapp.com</p>


               </div>
              </Col>
              <Col xs={3} md={3}>
              <div>
                <div style={{ height: '60vh', width: '100%' }}>

                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCIPWXdq4trWPRiU_wR_fy6Tb-bZTfpeMo&libraries=drawing,places' }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
                    <AnyReactComponent
                    lat={lat}
                    lng={lng}
                    text=""
                    />
                </GoogleMapReact>
                </div>
            </div> 
              </Col>
              <Col xs={1} md={1}></Col>
            </Row>
            <div>
   </div>
           
            </>
        )
    }
}

