import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;
  
  componentDidMount() {
    const {setCurrentUser} = this.props;

    // The onAuthStateChanged method from auth automatically updates authentication when user changes.
    // It also keeps the user logged in. The subscription below to auth is always open so it needs to be closed.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // onSnapshot is a reference method in order to get a view of the data.
        userRef.onSnapshot(snapShot => {
          // .data() allows the data to come in as an object and not unusable data.
          // console.log(snapShot.data());

        setCurrentUser({
            id: snapShot.id,
            // spread operator automatically concatenates the object to the current state.
            ...snapShot.data()
          });
        });
      }

      // The below is triggered when userAuth is null from auth.onAuthStateChanged
      setCurrentUser(userAuth);
    });
  }
  componentWillUnmount() {
    // Called again when component is unmounting to prevent any memory leaks.
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

// dispatch is a way for redux to know that whatever object your passing me is going to be an action that will be passed to every reducer.
// You are dispatching the object returned by setCurrentUser
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

// The null below is because we don't state to props
export default connect(null, mapDispatchToProps)(App);
