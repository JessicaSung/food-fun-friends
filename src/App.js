import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  state = {
    currentItem: '',
    username: ''
  }
  handleChange = (e) => {
    // console.log(e, e.target.name, e.target.value);

    // The e.persist(); is necessary with an updater function for setState because otherwise SyntheticEvent is pooled.
    e.persist();
    this.setState(() => ({ [e.target.name]: e.target.value }));
    // this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.username
    }
    itemsRef.push(item);
    this.setState(() => ({
      currentItem: '',
      username: ''
    }));
  }
  render() {
    return (
      <div className='app'>
        <header>
          <h1>Fun Food Friends</h1>
        </header>
        <div className='container'>
          <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
              <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
              <button>Add Item</button>
            </form>
          </section>
          <section className='display-item'>
            <ul></ul>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
