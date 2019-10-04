import React from 'react';
import EventThumbNail from './EventThumbNail'
import axios from 'axios';

const eventCardStyle ={
  margin: '20px',
  width:'200px'
}

export default class EventList extends React.Component {
  constructor(props) {
    console.log(props)
    super()
    this.state = {
      items: [],
    }
}


  componentDidMount() {
      axios.get(`http://localhost:8000/api/event`)
      .then(res => {
        const items = res.data;
        // const eventIds = items.map(items => items.id);
        this.setState({ 
          items,
          // ids:eventIds
         });
      })


      

  }

  componentDidUpdate(prevProps) {
    if(this.props.props.lat !== prevProps.props.lat || this.props.props.lng !== prevProps.props.lng || this.props.props.dis !== prevProps.props.dis) {
      console.log(prevProps.props.lat + "," + prevProps.props.lng + ": " + prevProps.props.dis)
      console.log(this.props.props.lat + "," + this.props.props.lng + ": " + this.props.props.dis)
      axios.get(`http://localhost:8000/api/event/filter?longitude=` + this.props.props.lng + `&latitude=` + this.props.props.lat +`&radius=` + this.props.props.dis)
      .then(res => {
        const items = res.data;
        this.setState({ items });
      })
    }
  }

  

  render() {
    const Event = () => (
      <>
        {/* {this.state.items.map(item => (
          <EventThumbNail style={eventCardStyle} props={item}></EventThumbNail>
        ))} */}

        {this.state.items.map(item => (
          <EventThumbNail style={eventCardStyle} key={item.id} props={item}></EventThumbNail>
        ))}
      </>
    ); 
    return (

      <>
        <Event></Event>
      </>
    )
  }
}