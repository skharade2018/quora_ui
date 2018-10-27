const login = (username, password) => {
    console.log("Inside Login service -",username," ",password)

    return new Promise((resolve, reject)=>{
        const requestData = {
            username:username,
            password:password,
            deviceId:"something.."
        };
        const promise = fetch("/userservice/login", {
            method:'POST',
            catch:'no-cache',
            body:JSON.stringify(requestData),
            headers:{
                'content-type':'application/json'
            },
            credentials:'same-origin'
        });
        promise.then((response)=>{
            const dataPromise = response.json();
            dataPromise.then((data)=>{
                resolve(data);
                console.log("data in login....", data)                
            }).catch((err)=>{
                reject(err)
            })
        })
    })    
}
export default login;