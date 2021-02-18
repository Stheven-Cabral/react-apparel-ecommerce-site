import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
        // onSnapshot is a reference method in order to get a view of the data. The snapshot itself won't give your the property data such as 'displayName'.
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
    // What's happening here is that when we pass our callback to auth.onAuthStateChanged, we are instantiating a new listener to auth state changes with our function that our auth code will manage. Whenever we want to stop listening though, we need to call that function that we got back in order for us to close that listener! This is what's called the observer pattern and is central to the use of observables (which we'll go into detail about in the observer pattern lesson later on in the course.
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          {/* render allows you to render a component but talso use JavaScript */}
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />)  : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

// You can destructor user because the redux store is being provided to all components in index.js
const mapStateToProps = ({ user }) => ({
  currenUser: user.currentUser
})

// Dispatch is a function of the Redux store. You call store.dispatch to dispatch an action. This is the only way to trigger a state change.
// You are dispatching the object returned by setCurrentUser
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

// The null below is because we don't state to props
export default connect(mapStateToProps, mapDispatchToProps)(App);


// setCurrentUser is an imported action
// mapDispatchtoProps sets setCurrentUser inside the component props.
// it goes throuch the user.actions
// Then the reducer is triggered which changes the redux store