const sendCode = ()=>{
    const email = document.getElementById("email").value

    fetch("/sendcode",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                emailaddress: email
            })
        })
}


const verifyCode = () =>{
    const enteredCode = document.getElementById("verify").value

    fetch("/verify",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            code : enteredCode
        })
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        if(data.verify){
            window.alert("VERIFIED")
        }
        else{
            window.alert("INCORRECT CODE")
        }
    }) 
}