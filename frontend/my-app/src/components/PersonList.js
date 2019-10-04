import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    title: '',
    description:'',
    completed: false
  }

  // handleChange = event => {
  //   this.setState({ title: event.target.value });
  // }
  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const item = { title: this.state.title , description: this.state.description , completed: false }
    console.log(item)

    axios.post(`http://127.0.0.1:8000/api/todos/`, item)
      .then(res => {
        console.log(res);
        console.log(res.data);
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person title:
            <input 
              type="text" 
              name="title" 
              value={this.state.title}
              onChange={this.handle_change}/>
          </label>
          <label>
            Description:
            <input 
              type="text" 
              name="description"
              value={this.state.description}
              onChange={this.handle_change}/>
          </label>
          <button variant="primary" type="submit">
          Submit
        </button>
        </form>
      </div>
    )
  }
}