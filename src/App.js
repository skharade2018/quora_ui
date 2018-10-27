import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyNavbar from "./MyNavbar"
import Reflux from "reflux"
import MyStore from "./store/MyStore"
import Body from "./body/Body"

const listenerMixin = Reflux.ListenerMixin

class App extends Component {
  constructor() {
    super()
    this.state = {
      showLoader: true,
      showLogin: false,
      isUserLoggedIn:false
    }
    this.onAppStore = this.onAppStore.bind(this)
    listenerMixin.listenTo(MyStore, this.onAppStore)
  }
  onAppStore(triggerObj) {
    if (triggerObj.action == "goToHome") {
      console.log("called came in onAppStore for goToHome action", triggerObj.data)
      return alert("You clicked on home...")
    }
    if (triggerObj.action == "userClick") {
      console.log("called came in onAppStore for userClick action", triggerObj.data)
      const state = this.state
      state.showLogin = true;
      this.setState({ state })
    }
    if (triggerObj.action === "loadFeeds") {
      console.log("trigger came in App for loadFeeds action")
      const state = this.state
      state.showLoader = false
      this.setState(state)
    }
    if (triggerObj.action === "login") {
      console.log("login trigger came in App", triggerObj)
      if (triggerObj.data.success == true) {
        alert("login successfull..." + triggerObj.data.user.firstName)
        const state = this.state
        state.showLogin = false
        state.isUserLoggedIn = triggerObj.data.user.firstName
        this.setState(state)
      }
    }
    if (triggerObj.action === "signup") {
      if (triggerObj.data.success == true) {
        alert("signup successfull..")
      }
    }
    if (triggerObj.action === "closeModal") {
      console.log("close modale inside App")
      const state = this.state
      state.showLogin = false;
      this.setState({ state })
    }
  }
  render() {
    return <div>
      <MyNavbar isUserLoggedIn={this.state.isUserLoggedIn}/>
      <Body showLoader={this.state.showLoader} showLogin={this.state.showLogin} />
      {/* <MyFooter /> */}
    </div>
  }
}

export default App;
