import React from "react"
import { Tab, Tabs, Input, Row, ProgressBar, Preloader, Modal, Button } from "react-materialize"
import Myactions from "../actions/AppActions"

export default class Body extends React.Component {
    constructor() {
        super()
        this.state ={
            popupError:{
                show:true,
                message:""    
            }
        };
        this.getBody = this.getBody.bind(this)
        // this.getLoader = this.getLoader.bind(this)
        this.getLoginPopup = this.getLoginPopup.bind(this)
        this.getErrorMessage = this.getErrorMessage.bind(this)
        this.signUpClicked = this.signUpClicked.bind(this)
    }
    componentDidMount() {
        Myactions.loadFeeds()
    }
    getBody() {
        if (!this.props.showLoader) {
            return <div className="center">
                <h3>Here are my Feeds</h3>
            </div>
        }
        else {
            return null
        }
    }
    // getLoader() {
    //     if (this.props.showLoader) {
    //         return <div className="body">
    //             <Row>
    //                 <ProgressBar />
    //             </Row>
    //         </div>
    //     }
    //     else {
    //         return null
    //     }
    // }
    loginClick() {
        const email = document.getElementById("loginUsername").value
        const pass = document.getElementById("pass").value
        Myactions.login(email, pass)
    }
    signUpClicked(){
        const username = document.getElementById("sUsername").value
        const password = document.getElementById("sPassword").value
        const confirm_password = document.getElementById("confirm_password").value

        const first_name = document.getElementById("FirstName").value
        const middle_name = document.getElementById("MiddleName").value
        const last_name = document.getElementById("LastName").value

        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value
        const city = document.getElementById("city").value
        
        const malegender = document.getElementById("male").checked
        const gender = malegender ? "male" : "female"
        console.log(gender)
        const user = {
            username,
            password,
            first_name,
            middle_name,
            last_name,
            email,
            phone,
            city,
            gender
        }
        if(password !== confirm_password){
            const state = this.state;
            state.popupError.show=true;
            state.popupError.message="password and confirm password doen't match"
            this.setState(state)
        }else{
        Myactions.signUp(user);            
        }
    }
    closeModal(){
        Myactions.closeModal();
    }
    getErrorMessage(){
        const error = this.state.popupError;
        if(error.show){
            return <font color="red">{this.state.popupError.message}</font>
        }else{
            return <font color="red">Success</font>
        }
    }
    getLoginPopup() {
        return <div className="body">
            <Modal open={this.props.showLogin} actions={
                <div>
                    <Button waves="light" className="red darken-2" onClick={this.closeModal}>Close</Button>
                </div>
            }>
            {
                this.getErrorMessage()
            }
                <Tabs className='tab-demo z-depth-1'>
                    <Tab title="Login" active>
                        <Row>
                            <Input type="text" label="Email" s={12} id="loginUsername" />
                            <Input type="password" label="password" s={12} id="pass" />
                        </Row>
                        <Row>
                            <Button onClick={this.loginClick}>Login</Button>
                        </Row>
                    </Tab>
                    <Tab title="Sign Up">
                        <Row>
                            <Input label="username" s={4} id="sUsername" />
                            <Input label="password" s={4} id="sPassword" />
                            <Input label="Confirm_password" s={4} id="confirm_password" />
                            
                            <Input label="First_name" s={4} id="FirstName" />
                            <Input label="Middle_name" s={4} id="MiddleName" />
                            <Input label="Last_name" s={4} id="LastName" />
                            
                            <Input label="email" s={4} id="email" />
                            <Input label="Phone" s={4} id="phone" />
                            <Input label="City" s={4} id="city" />

                            <Input type="radio" name="gender" label="Male" id="male" />
                            <Input type="radio" name="gender" label="Female" id="female" />
                        </Row>
                        <Row>
                            <Button onClick={this.signUpClicked}>Sign Up</Button>
                        </Row>
                    </Tab>
                </Tabs>
            </Modal>
        </div>
    }
    render() {
        return <div>
            {/* {this.getLoader()} */}
            {this.getBody()}
            {this.getLoginPopup()}
        </div>

    }
}