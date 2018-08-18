import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';

class App extends Component {
  state = {
    currentItem: '',
    username: '',
    items: [],
    user: null
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
  removeItem = (itemId) => {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState(() => ({
        items: newState
      }));
    });
  }
  render() {
    return (
      <div className='app'>
        <header>
          <h1>Food Fun Friends</h1>
        </header>
        <div className="container">
          <section className='add-item side'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="username" placeholder="Your name" onChange={this.handleChange} value={this.state.username} />
              <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
              <button>Add Item</button>
            </form>
          </section>
          <section className='display-item side'>
            <ul>
              {this.state.items.map((item) =>
                <li key={item.id}>
                  <h3>{item.title}</h3>
                  <p>brought by: {item.user}</p>
                  <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                  {/* This triggers error message: Cannot update during an existing state transition (such as within `render` or another component's constructor). */}
                  {/* <button onClick={this.removeItem(item.id)}>Remove Item</button> */}
                </li>
              )}
            </ul>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
