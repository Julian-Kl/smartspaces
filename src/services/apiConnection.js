class BaseApi {
    _baseUrl = "https://api2.arduino.cc/iot/";
    _corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
}

export class Token extends BaseApi {
    tokenUrl = `${this._corsAnywhereUrl}${this._baseUrl}v1/clients/token`;
    clientData = new URLSearchParams({
        "grant_type": "client_credentials",
        "client_id": "buwGgTfrnOngcVmDyHG6Epf3VdJHDhDg",
        "client_secret": "Bcn3xJfyHmK8lREa4pnnS4Kqo03nXvyizrsOO80sRogay5Bx7ilUGKbLO7847rY8",
        "audience": "https://api2.arduino.cc/iot"
    })

    async requestToken() {
        let options = {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Credentials": "true"
            },
            body: this.clientData
        }

        await fetch(this.tokenUrl, options)
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
                return (error);
            });
    }

    async loadToken() {
        console.log("Token loading...");
        let localTokenSet = false;
        let localTokenExpired = false;
        if (localStorage.getItem("access_token")) {
            localTokenSet = true;
            const expiringTime = +(localStorage.getItem("expires_in"));
            const requestTimestamp = +(localStorage.getItem("request_time"));
            const expiringTimestamp = requestTimestamp + (expiringTime * 100);
            const currentTimestamp = Date.now();

            console.log("Saved token found in localstorage");

            if (expiringTimestamp <= currentTimestamp) {
                localTokenExpired = true;

                console.log("Saved token in localstorage is expired.")
            }
        }

        if (!localTokenSet || localTokenExpired) {
            console.log("New token loading.");
            await this.requestToken();
        }
    }
}

export class Things extends BaseApi {
    accessToken = localStorage.getItem("access_token");
    tokenType = localStorage.getItem("token_type");
    id = "4f61da74-8f51-4258-b846-33f3bdd96c97";
    thingsUrl = `${this._corsAnywhereUrl}${this._baseUrl}v2/things/${this.id}`;

    async showThings() {
        console.log("Things loading...");
        let options = {
            credentials: 'same-origin',
            method: "GET",
            headers: {
                "Authorization": `${this.tokenType} ${this.accessToken}`,
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Credentials": "true"
            }
        }

        await fetch(this.thingsUrl, options)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                localStorage.setItem('light', data.properties[0].last_value);
                localStorage.setItem('axis', data.properties[1].last_value);
                localStorage.setItem('air', data.properties[2].last_value);
            })
            .catch((error) => {
                console.error('Error:', error);
                return (error);
            });
    }
}