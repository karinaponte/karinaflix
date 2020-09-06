const url = window.location.hostname.includes("localhost")
? "http://localhost:8080" 
: "https://karinaflix.herokuapp.com";

export default {
    url,
};