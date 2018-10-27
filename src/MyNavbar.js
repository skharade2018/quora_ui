import React from "react"
import { Navbar, NavItem, Icon } from "react-materialize"
import MyActions from "./actions/AppActions"
import {Modal, Row, Input, Button } from "react-materialize"

export default class MyNavbar extends React.Component {
    onHomeClicked() {
        console.log("clicked on onHomeClicked")
        MyActions.goToHome()
    }
    onAccount() {
        console.log("clicked on onAccount")
        MyActions.userClick()
        return <div>
            <Modal open="true">
                <Row>
                    <Input type="email" label="Email" s={12} id="email" />
                    <Input type="password" label="password" s={12} id="pass" />
                </Row>
            </Modal>
        </div>
    }
    getUserDetails(){
        if(this.props.isUserLoggedIn){
            console.log("call came in getUserDetails function")
            return this.props.isUserLoggedIn
        }else{
            return <Icon>account_circle</Icon>
        }
    }
    render() {
        return <div className="center">
            <Navbar brand='Quora' right>
                <NavItem onClick={this.onHomeClicked}><Icon>home</Icon></NavItem>
                <NavItem onClick={this.onAccount}>
                {this.getUserDetails()}
                </NavItem>                
            </Navbar>
        </div>
    }
}