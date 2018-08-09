import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

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
  }
  render() {
    return (
      <div className='app'>
        <header>
          <div className='wrapper'>
            <h1>Fun Food Friends</h1>
          </div>
        </header>
        <div className='container'>
          <section className='add-item'>
            <form>
              <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
              <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
              <button>Add Item</button>
            </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>

              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
