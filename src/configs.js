
let base_url;

if (window.location.href.indexOf("localhost") !== -1){
    base_url = "https://solyd-floors-back-end.vercel.app/api/v1"
} else {
    base_url = "https://solyd-floors-back-end.vercel.app/api/v1"
}


export const API_ENDPOINT = base_url;
