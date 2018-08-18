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
  // User form input saved in state
  handleChange = (e) => {
    /* console.log(e, e.target.name, e.target.value);

    The e.persist(); is necessary with an updater function for setState because otherwise SyntheticEvent is pooled. */
    e.persist();
    this.setState(() => ({ [e.target.name]: e.target.value }));
    /* this.setState({ [e.target.name]: e.target.value });
    console.log(this.state); */
  }
  // User form input saved to firebase
  handleSubmit = (e) => {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.displayName || this.state.user.email // no longer uses user input 'username' but displayName or email from Google authentication
    }
    itemsRef.push(item);
    this.setState(() => ({
      currentItem: '',
      username: ''
    }));
  }
  // Logs user out of app
  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState(() => ({ user: null }));
      });
  }
  // Logs user into app
  login = async () => {
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    this.setState(() => ({ user }));
    /*
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState(() => ({ user }));
      });
    */
  }
  // Removes item from firebase
  removeItem = (itemId) => {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  componentDidMount() {
    // Displays items from firebase on the page
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
    // Persists login across refresh
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState(() => ({ user }));
      }
    });
  }
  render() {
    return (
      <div className='app'>
        <header>
          <h1>Food Fun Friends</h1>
          {/* Update UI to reflect user's login */}
          {this.state.user ?
            <button onClick={this.logout} className="authentication-button">Log Out</button>
            :
            <button onClick={this.login} className="authentication-button">Log In</button>
          }
        </header>
        {/* Show user photo if logged in, otherwise, prompt user to log in */}
        {this.state.user ?
          <div>
            <div className="user-profile">
              <img src={this.state.user.photoURL} />
            </div>
            <div className="container">
              <section className="add-item">
                {/* User and item form */}
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Your name"
                    value={this.state.user.displayName || this.state.user.email}
                  />
                  <input
                    type="text"
                    name="currentItem"
                    placeholder="Your item"
                    onChange={this.handleChange}
                    value={this.state.currentItem}
                  />
                  <button>Add Item</button>
                </form>
              </section>
            </div>
          </div>
          :
          <div className="wrapper">
            <p>You must be logged in to see the potluck list and add an item.</p>
          </div>
        }
      </div >
    );
  }
}

export default App;
