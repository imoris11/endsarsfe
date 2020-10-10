import React, { useState, useEffect } from 'react';
import TwitterLogin from 'react-twitter-auth';
const url = 'https://endsarsapi.herokuapp.com/api/v1'

export const Form = () => {
    const [loading, setLoading] = useState(false)
    const [authorizedUsers, setAuthorizedUser] = useState(0)
    useEffect(()=> {
        fetch(`${url}/summary`)
        .then(res =>res.json())
        .then(result => {
           setAuthorizedUser(result.value)
        })
    }, [])

    const onSuccess = (response) => {
        response.json().then(body => {
          
          setLoading(true)
          const tweet = 
          `
|￣￣￣￣￣￣￣￣￣￣￣￣|  
    #EndSarsProtests
    #EndPoliceBrutality
|＿＿＿＿＿＿＿＿＿＿＿＿| 
        \\  (•◡•)  /`;

            const data = {
                oauth_token: body.oauth_token,
                oauth_token_secret: body.oauth_token_secret,
                post: tweet
            }
          fetch(`${url}/status`,
          {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                  'Content-Type': 'application/json'
              }
          }).then(res => res.json()).then(data => {
            setLoading(false);
            setAuthorizedUser(authorizedUsers + 1)
            alert("Thank you, successfully tweeted!")
          }).catch(error => {
              alert(error);
              setLoading(false);
        })
        
       });
      }
    
     const onFailed = (error) => {
        alert("An error occurred");
        console.log(error);
      }
        return (
            <div>
                <div style={{marginBottom:200, }}></div>
                <TwitterLogin loginUrl={`${url}/auth/twitter`}
                      onFailure={onFailed}
                      onSuccess={onSuccess}
                      showIcon={true}
                      disabled={loading}
                      requestTokenUrl={`${url}/auth/twitter/reverse`}
                      style={{backgroundColor:'transparent', borderWidth:0}}
                      >
                   <p className="button" >Authorize</p>
             </TwitterLogin>
             <p style={{margin:30}}>Authorize the #EndSARSNow bot to tweet on your behalf every 30 minutes to a gov handle to ensure they're aware of our concerns and do something about it. We'd send an initial tweet too!</p>
            <h3>Total Authorized Users: {authorizedUsers}</h3>

            </div>
        )
}