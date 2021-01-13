class BaseApi {
    _baseUrl = "https://api2.arduino.cc/iot/";
}

export class Token extends BaseApi {
    tokenUrl = `${this._baseUrl}v1/clients/token`;
    clientData = new URLSearchParams({
        "grant_type": "client_credentials",
        "client_id": "buwGgTfrnOngcVmDyHG6Epf3VdJHDhDg",
        "client_secret": "Bcn3xJfyHmK8lREa4pnnS4Kqo03nXvyizrsOO80sRogay5Bx7ilUGKbLO7847rY8",
        "audience": "https://api2.arduino.cc/iot"
    })

    async requestToken() {
        var options = {
            method: "POST",
            credentials: 'same-origin',
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Credentials": "true"
            },
            body: this.clientData
        }

        await fetch("https://cors-anywhere.herokuapp.com/https://api2.arduino.cc/iot/v1/clients/token", options)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                const timestamp = Date.now();
                localStorage.setItem('request_time', timestamp);
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('expires_in', data.expires_in);
                localStorage.setItem('token_type', data.token_type);
            })
            .catch((error) => {
                console.error('Error:', error);
                return(error);
            });
    }


    async loadToken() {
        console.log("Token loading...");
        let localTokenSet = false;
        let localTokenExpired = false;
        if(localStorage.getItem("access_token")){
          localTokenSet = true;
          const expiringTime = +(localStorage.getItem("expires_in"));
          const requestTimestamp = +(localStorage.getItem("request_time"));
          const expiringTimestamp = requestTimestamp + (expiringTime * 100);
          const currentTimestamp = Date.now();
  
          console.log("Saved token found in localstorage");
  
          if(expiringTimestamp <= currentTimestamp){
            localTokenExpired = true;
  
            console.log("Saved token in localstorage is expired.")
          }
        }
  
        if(!localTokenSet || localTokenExpired){
          console.log("New token loading.");
          await this.requestToken();
        }
    }
}