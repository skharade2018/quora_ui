const signup = (user) => {
    console.log(user, "inside signup service")
    return new Promise((resolve, reject) => {
        let url = "userservice/user"
        const promise = fetch(url, {
            method: 'POST',
            catch: 'no-cache',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'same-origin'
        });
        promise.then((response) => {
            const dataPromise = response.json();
            dataPromise.then((data) => {
                resolve(data)
            })
        }).catch((error) => {
            reject(error)
        })
        // setTimeout(()=>{
        //     resolve({success:true})
        // }, 2000)
    })
}
export default signup;/*  */