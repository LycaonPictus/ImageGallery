import {CLIENT_ID} from config.js
import {CLIENT_SECRET} from config.js
const REDIRECT_URI = 'http://localhost:8080/callback';

function getCode()
{
	let urlParams = new URLSearchParams(window.location.search);
	let error = urlParams.get("error");
	if (error)
	{
		document.body.innerHTML = "<h3>"+error+"</h3><h4>"+urlParams.get("error_description")+"</h4>";
		return ;
	}
	let code = urlParams.get("code");
	return (code);
}

async function getToken(code)
{
	if (localStorage.getItem("token"))
		return ;
	if (!code)
		return;
	let token_response = await fetch("https://unsplash.com/oauth/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			redirect_uri: REDIRECT_URI,
			code: code,
			grant_type: "authorization_code",
		}),
	});
	if (token_response.ok)
	{
		let obj = await token_response.json();
		console.log(obj);
		localStorage.setItem("unsplash_access_token",obj.access_token);
		localStorage.setItem("unsplash_user_id",obj.user_id);
		localStorage.setItem("unsplash_username",obj.username);
		document.location = "http://localhost:8080";
	}
	else
		document.body.innerHTML = `<h1>${token_response.statusText}</h1><h1>${token_response.text}</h1>`;
}

getToken(getCode());
