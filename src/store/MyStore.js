import Reflux from "reflux"
import MyActions from "../actions/AppActions"
import signup from "../service/Signup"
import login from "../service/Login"

const store = Reflux.createStore({
    listenables: [MyActions],
    onGoToHome() {
        console.log("goToHome action performed..")
        const triggerObj = {
            action: "goToHome",
            data: "--onGotoHome data--"
        }

        this.trigger(triggerObj)
    },
    onUserClick() {
        console.log("userClick action performed..")
        const triggerObj = {
            action: "userClick",
            data: "--userClick data--"
        }
        this.trigger(triggerObj)
    },
    onLoadFeeds() {
        console.log("Loaderfeeds working fine")
        const triggerObj = {
            action: "loadFeeds",
            data: []
        }
        setTimeout(() => {
            this.trigger(triggerObj)
        }, 1000)
    },
    onLogin(username, password) {
        console.log("login details came in store ==",username, password)
        const loginPromis = login(username, password)
        loginPromis.then((obj)=>{
            console.log("mystore login data", obj)
            const triggerobj = {
                action:"login",
                data:{
                    success:true,
                    user: obj.login.user 
                }
            }
            this.trigger(triggerobj)
        })
    },
    onSignUp(user){
        // signup(user)
        const signUpPromise = signup(user)
        signUpPromise.then((obj)=>{
            console.log("Response from network..", obj)
            const triggerobj = {
                action:"signup",
                data:{
                    success:true,
                }
            };
            this.trigger(triggerobj)
        }).catch((error)=>{
            console.log("error from network..",error)
            const triggerobj = {
                action : "signup",
                data:{
                    success:false
                }
            }
        })
    },
    onCloseModal(){
        console.log("close modal inside store")
        const triggerObj = {
            action: "closeModal",
            data:[]
        }
        this.trigger(triggerObj)
    }
})
export default store;