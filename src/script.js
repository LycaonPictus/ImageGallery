
let favs = window.localStorage.getItem("image_gallery_favs");
if (!favs)
	favs = [];
console.log(favs);

function login()
{
	window.open("https://unsplash.com/oauth/authorize?client_id=W5On_0L6r4sWh0FbbMaV4Wo_sQrwYHpA5R9z9fkGKVs&redirect_uri=https://image-gallery-eosin-one.vercel.app&response_type=code&scope=public read_photos");
}

let token = "";
let auth_rq = new XMLHttpRequest();
auth_rq.open("GET","https://api.unsplash.com/photos/?client_id="+token, true);
auth_rq.onreadystatechange = function()
{
	console.log(auth_rq.status);
	if (auth_rq.readyState == 4 && auth_rq.status == 200)
	{
		console.log("Bien");
	}
	else
		console.log("Cagaste");
	console.log(auth_rq.response);
};
auth_rq.send();

let query_rq = new XMLHttpRequest();
query_rq.open("GET","https://api.unsplash.com/search/photos?page=1&query=office", true);
query_rq.onreadystatechange = function()
{
	if (query_rq.readyState == 4 && query_rq.status == 200)
	{
		console.log("Bien");
	}
	else
		console.log("Cagaste");
};
query_rq.send();