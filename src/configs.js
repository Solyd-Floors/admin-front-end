
let base_url;

if (window.location.href.indexOf("localhost") !== -1){
    base_url = "http://localhost:4000/api/v1"
} else {
    base_url = "https://solyd-floors-back.herokuapp.com/api/v1"
}


export const API_ENDPOINT = base_url;