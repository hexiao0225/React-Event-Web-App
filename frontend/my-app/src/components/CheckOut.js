import React from "react";
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import InputGroup from 'react-bootstrap/InputGroup'
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';


export default class CheckOut extends React.Component {
  constructor(props){
    super()
  }

    //Name of Card Owner
    nameChange(n) {
      this.setState({
        name: n.target.value
      });
    }
    //Card Number
    numberChange(c) {
      this.setState({
        number: c.target.value
      });
    }
    //Expiration
    monthChange(m) {
      this.setState({
       month: m.target.value
      });
    }
    dayChange(d) {
      this.setState({
       day: d.target.value
      });
    }
    //CCV 
    ccvChange(v) {
      this.setState({
       ccv: v.target.value
      });
    }
    
    
    render() {
      return (
          <StripeProvider apiKey="pk_test_xGGTHJVULuZ2ZRkLec70h3Uh00h2w0BZ60">
            <div className="example">
              <div></div>
              {/* <h4 style={{'fontFamily':'Lato'}}>Check Out Here</h4> */}
              <h4 style={{'fontFamily':'Lato'}}>Buy Ticket Here</h4>
              <Elements>
                <CheckoutForm props={this.props.props}></CheckoutForm>
              </Elements>
            </div>
          </StripeProvider>
       
      );                   
    }
  }

