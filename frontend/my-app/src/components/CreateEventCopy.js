import React from "react";
// import DateInput from './DateInput'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import NavBar from './NavBar';
import axios from 'axios';

import GoogleMapReact from 'google-map-react';
import ImageUploader from 'react-images-upload';




const coverImageStyle = {
  // maxWidth: '1000px',
  // height: 'auto',
  flex: '1 1 0%',
    // position: 'relative',
    display: 'grid',
    overflow: 'hidden',
    height: '40%',
    width: '90%',
    // maxHeight:'600px',
    overflow:'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // opacity: '0.8',
    

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

const labelStyle={
        display: 'inline-block',
        marginBottom: '0.5rem',
        fontSize: '20px',
        fontFamily: 'Lato',
        fontWeight: '600'
      }
const inputStyle={
        marginBottom:'1em',
        display: 'block',
          width: '100%',
          marginBottom: '30px',
          fontSize: '15px',
          fontFamily: 'Lato',
          lineHeight: '1.5',
          color: '#495057',
          backgroundColor: '#fff',
          backgroundClip: 'padding-box',
          border: 'none',
          // borderBottom: '1px solid #607D8B',
          transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'
      }

var markers = [];

let lasValue = 0;
let lngValue = 0;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const handleApiLoaded = (map, maps) => {
    var pos;
    var infoWindow = new maps.InfoWindow;
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
            // this.setState({
            //   lat:pos.lat,
            //   lng:pos.lng
            // })
            lasValue = pos.lat;
            lngValue = pos.lng;
            console.log(pos.lat, pos.lng);
        }, function() {
            infoWindow.setPosition(pos);
            infoWindow.setContent('Error: The Geolocation service failed.');
            infoWindow.open(map);
        });
    } else {
        infoWindow.setPosition(pos);
        infoWindow.setContent('Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    maps.event.addListener(map, 'click', function(event) {
      var latitute = event.latLng.lat();
      var longitude = event.latLng.lng();
      deleteMarkers();
      addMarker(event.latLng);
      lasValue = latitute;
      lngValue = longitude;
      console.log(latitute + ', ' + longitude);
  });

  // Adds a marker to the map and push to the array.
  function addMarker(location) {
      var marker = new maps.Marker({
        position: location,
        map: map,
        title: 'selected_point',
      });
      markers.push(marker);
    }

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
      setMapOnAll(null);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
      clearMarkers();
      markers = [];
    }

  //   var request = {
  //     query: 'Carnegie Mellon University',
  //     fields: ['name', 'geometry'],
  //   };

  //   var service = new maps.places.PlacesService(map);

  //   service.findPlaceFromQuery(request, function(results, status) {
  //       if(status === maps.places.PlacesServiceStatus.OK) {
  //           for(var i = 0; i < results.length; i++) {
  //               addMarker(results[i].geometry.location);
  //           }
  //       }

  //       map.setCenter(results[0].geometry.location);
  //   })

  var input = document.getElementById('pos-input');
  var searchBox = new maps.places.SearchBox(input);
  map.controls[maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
          return;
      }
      
      // Clear old markers
      deleteMarkers();

      // For each place, get the icon, name and location.
      var bounds = new maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new maps.Size(71, 71),
          origin: new maps.Point(0, 0),
          anchor: new maps.Point(17, 34),
          scaledSize: new maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));
        console.log(place.geometry.location.lat() + ", " + place.geometry.location.lng())

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
  });
};




export default class CreateEvent extends React.Component {
  static defaultProps = {
    center: {
      lat: 40.440624,
      lng: -79.995888
    },
    zoom: 11
  };

  constructor(props){
    super(props);
  
    this.state = {
      name : '',
      description : '',
      address:'',
      start_date:'',
      start_time:'',
      end_date:'',
      end_time:'',
      address1:'',
      address2:'',
      city:'',
      state:'',
      zip:'',
      lat:40.440624,
      lng:-79.995888,
      picture:null,
      video:null,
      price:'',
      pictures: []

    };

    this.onDrop = this.onDrop.bind(this);




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

  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
  }

  handleSubmit = e =>{
    const addr = this.state.address1 + ", " + this.state.address2 +", " + this.state.city+ ", " + this.state.state + ", " + this.state.zip ;

    const pointAddr = "SRID=4326;POINT (" + lasValue + " " + lngValue + ")";

    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('address_readable', addr);
    formData.append('address', pointAddr);
    formData.append('start_date', this.state.start_date);
    formData.append('start_time', this.state.start_time);
    formData.append('end_date', this.state.end_date);
    formData.append('end_time', this.state.end_time);
    formData.append('status', 0);
    formData.append('rating', 5.0);
    formData.append('price', this.state.price);
    for(var i = 0; i < this.state.pictures.length; i++) {
        formData.append('pictures', this.state.pictures[i]);
    }
    console.log(formData);
    fetch('http://127.0.0.1:8000/api/event/create/', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
      body: formData,
    }).then(res => res.json())
    .then((data) => {
      console.log(data);
    }).catch(err => console.log(err));

    
  }
  render(){
    let uploadImageSucceedText;
    if (this.state.pictures.length > 0){
      uploadImageSucceedText = <h3>Your Image is Uploaded</h3>
    }
    return (
      <div>
        <Row>
            <NavBar></NavBar>
              <Image style={coverImageStyle} src={require('./static/craft.jpg')}></Image>
              <div style={centerTextStyle}>Create New Event</div>
        </Row>
        <Row style={whiteSpaceStyle}></Row>

        <Row>
            <Col xs={4} md={4}>
            
            </Col>
            <Col xs={4} md={4}>
            <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTitle">
                          <Form.Label style={labelStyle}>Title</Form.Label>
                          <Form.Control style={{inputStyle}} type="name" 
                              name="name" 
                              placeholder="title"
                              value={this.state.name}
                              onChange={this.handle_change}
                              required
                              />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDate">
                          <Form.Label style={labelStyle}>Start Date</Form.Label>
                          <Form.Control style={{inputStyle}} 
                            type="date" 
                            placeholder="02/25/2019" 
                            name="start_date"
                            value={this.state.start_date}
                            onChange={this.handle_change} 
                            required/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridTime">
                          <Form.Label style={labelStyle}>Start Time</Form.Label>
                          <Form.Control style={{inputStyle}} 
                            type="time" 
                            placeholder="14:00PM" 
                            name="start_time"
                            value={this.state.start_time}
                            onChange={this.handle_change}
                            required/>
                        </Form.Group>
                    </Form.Row>


                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDate">
                          <Form.Label style={labelStyle}>End Date</Form.Label>
                          <Form.Control style={{inputStyle}} 
                            type="date" 
                            name="end_date"
                            value={this.state.end_date}
                            onChange={this.handle_change}
                            required
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridTime">
                          <Form.Label style={labelStyle}>End Time</Form.Label>
                          <Form.Control style={{inputStyle}} 
                            type="time" 
                            name="end_time"
                            value={this.state.end_time}
                            onChange={this.handle_change}
                            required
                          />
                        </Form.Group>
                    </Form.Row>
    
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label style={labelStyle}>Price</Form.Label>
                          <Form.Control style={{inputStyle}} 
                            type="number" 
                            placeholder="if free, put 0"
                            name="price"
                            value={this.state.price}
                            onChange={this.handle_change}
                            required
                            />
                            {/* <NumericInput 
                            min={0} 
                            value={this.state.price} 
                            name="price"
                            // placeholder="if free,put 0"
                            onChange={this.handle_change}
                            required
                            /> */}
                        </Form.Group>
                    </Form.Row>
    
                    <Form.Group>
                        <Form.Label style={labelStyle}>Find the location on Map</Form.Label>
                        <Form.Control style={{inputStyle}} 
                          id="pos-input"
                          placeholder="1234 Main St" 
                          />
                    </Form.Group>
    
                    
                    
                    <div>
                {/* <input id="pos-input" type="text" placeholder="Search places..."></input> */}
                <div style={{ height: '60vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCIPWXdq4trWPRiU_wR_fy6Tb-bZTfpeMo&libraries=drawing,places' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
                    <AnyReactComponent
                    lat={40.440624}
                    lng={-79.995888}
                    text=""
                    />
                </GoogleMapReact>
                </div>

                
            </div>

            <Form.Group>
                    <Form.Label style={labelStyle}>Location 1</Form.Label>
                    <Form.Control style={{inputStyle}} 
                      name="address1"
                      placeholder="1234 Main St" 
                      value={this.state.address1}
                      onChange={this.handle_change}
                      required
                      />

                    <Form.Label style={labelStyle}>Location 2</Form.Label>
                        <Form.Control style={{inputStyle}} 
                          placeholder="Apartment, studio, or floor"
                          name="address2"
                          value={this.state.address2}
                          onChange={this.handle_change}/>

            </Form.Group>
            <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Label style={labelStyle}>City</Form.Label>
                          <Form.Control style={{inputStyle}} 
                            name="city"
                            placeholder="city" 
                            value={this.state.city}
                            onChange={this.handle_change}
                          />
                        </Form.Group>
    
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label style={labelStyle}>State</Form.Label>
                          <Form.Control style={{inputStyle}} 
                          // as="select" 
                            name="state"
                            placeholder="state" 
                            value={this.state.state}
                            onChange={this.handle_change} >

                          </Form.Control>
                        </Form.Group>
    
                        <Form.Group as={Col} controlId="formGridZip">
                          <Form.Label style={labelStyle}>Zip</Form.Label>
                          <Form.Control style={{inputStyle}} 
                          name="zip"
                          placeholder="zip" 
                          value={this.state.zip}
                          onChange={this.handle_change}
                          
                          />
                        </Form.Group>
                    </Form.Row>

            

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDescription">
                          <Form.Label style={labelStyle}>Description</Form.Label>
                          <Form.Control style={{inputStyle}} style={{height: '200px'}} type="text" type="name" 
                              name="description"
                              placeholder="description"
                              value={this.state.description}
                              onChange={this.handle_change}
                              placeholder="Describe your event here... " 
                              required
                              />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDescription">
                          {/* <Form.Label style={labelStyle}>Description</Form.Label>
                          <Form.Control style={{inputStyle}} style={{height: '200px'}} type="text" placeholder="Describe your event here... " /> */}
                          {/* <Button style={{margin: '10px'}} variant="outline-primary" type="submit">
                            Add Image
                          </Button> */}
                          <ImageUploader
                              withIcon={true}
                              buttonText='Choose images'
                              onChange={this.onDrop}
                              imgExtension={['.jpg', '.gif', '.png', '.gif']}
                              maxFileSize={5242880}
                          />
                          {uploadImageSucceedText}
                          {/* <input type = "file" onChange = {this.handleChangeFile.bind(this) }accept=".jpg,.jpeg,.png"></input> */}



                        </Form.Group>
                    </Form.Row>
    
                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="I have read and agree with the terms" />
                    </Form.Group>
    
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


