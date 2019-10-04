import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

const buttonStyle={
  color: 'black',
  backgroundColor: 'transparent',
  borderColor: 'black',
  borderWidth: '1px',
  borderRadius: '8px',
  fontFamily:'Lato',
  fontSize:'15px',
  paddingLeft:'10px',
  paddingRight:'10px',
  paddingTop:'5px',
  paddingBottom:'5px',
  margin:'10px',
  width:'200px'
}

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete:false,
      message:'',
      transactionId:''
    };
    this.submit = this.submit.bind(this);
    console.log(props.props)
  }
  
    
  submit = e => {
    e.preventDefault();
    const amount = parseFloat(this.props.props.price);
    const eventID = this.props.props.id;
    console.log(eventID);
    /*
    Within the context of Elements, this call to createToken knows which
    Element to tokenize, since there's only one in this group.
    */
    return this.props.stripe
      .createToken({ type: "card", name: localStorage.getItem("username") })
      .then(result => {
        if (result.error) {
          console.log("THERE IS AN ERROR IN YOUR FORM", result.error);
          return this.setState({ card_errors: result.error.message });
        } else {
          console.log(
            "Received Stripe token ---> SENDING TO SERVER: ",
            result.token
          );
          this.setState({
            transactionId:result.token.created
          })
          let formData = new FormData();
//          formData.append("description", "My form description");
//          formData.append("currency", "usd");
//          formData.append("amount", 237);
          formData.append("source", result.token.id);
          formData.append("amount",amount*100);
          formData.append('userID',localStorage.getItem('userid'));
          formData.append("eventID",eventID);
          return fetch(`http://127.0.0.1:8000/api/event/charge/`, {
            method: "POST",
            headers: {
              accept: "application/json"
            },
            body: formData
          })
            // .then(resp => console.log(resp));
            .then(resp => resp.json())
            .then(json => this.setState({ 
              message: json.message,
             }));
            console.log(this.state.message);
        }
      });
  };


//  async submit(ev) {
//    let {token} = await this.props.stripe.createToken({name: "Name"});
//     console.log(token.id+"testing");
//
//      
//    let formData = new FormData();
//    formData.append("source":token.id);
//    let response = await fetch("http://127.0.0.1:8000/charge/", {
//      method: "POST",
//      headers: {"Content-Type": "application/json"},
//      body: formData
//    });
//  }

  render() {
      
      let transactionId;
      if(this.state.transactionId) {
        transactionId = "Transaction Id: " + this.state.transactionId
      }
      if(this.state.complete) return <h1>Purchase Complete</h1>;
    //   else return <h1>Purchase Failed</h1>;
    return (
      <div className="checkout">
        <p>Your Credit Card Info Here:</p>
        <CardElement />
        <button style={buttonStyle} onClick={this.submit}>Confirm</button>
        <h3>{this.state.message} {transactionId}</h3>
        
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);