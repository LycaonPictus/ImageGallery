
/* let favs = window.localStorage.getItem("image_gallery_favs");
if (!favs)
	favs = [];
console.log(favs); */

let onclickf;
let log;
let header_right = document.getElementById("header_right");
let last_query;

if (localStorage.getItem("unsplash_username"))
{
	header_right.innerHTML = `<span>${localStorage.getItem("unsplash_username")}</span>`;
	onclickf = "logout()";
	log = "Logout";
}
else
{
	onclickf = "try_login()";
	log = "Login";
}
header_right.innerHTML += `<input type="button" id="login" onclick="${onclickf}" value =${log}>`;

function logout()
{
	if (localStorage.getItem("unsplash_access_token") || localStorage.getItem("unsplash_user_id") || localStorage.getItem("unsplash_username"))
	{
		localStorage.removeItem("unsplash_access_token");
		localStorage.removeItem("unsplash_user_id");
		localStorage.removeItem("unsplash_username");
		document.location = "http://localhost:8080";
	}
}

function try_login(response)
{
	let client_id = "W5On_0L6r4sWh0FbbMaV4Wo_sQrwYHpA5R9z9fkGKVs";
	let redirect_uri = "http://localhost:8080/callback";
	if (!response || response.status == 401)
		window.location = `https://unsplash.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=public`;
	else
		console.log("Already logged");
}


function getImages(query, page) {
	if (query == "")
		return ;
	last_query = query;
    let accessToken = localStorage.getItem("unsplash_access_token");

    fetch(`https://api.unsplash.com/search/photos?query=${query.replaceAll(" ", "+")}&page=${page}&per_page=10`, {
        headers: {
            Authorization: "Bearer " + accessToken
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
		document.getElementById("gallery").innerHTML = "";
		if (data.errors)
		{
			document.getElementById("gallery").style.flexDirection = "column";
			document.getElementById("gallery").style.alignItems = "center";
			document.getElementById("gallery").innerHTML += '<h3>You need to be logged in your Unsplash account</h3>';
			document.getElementById("gallery").innerHTML += `<h5>${data.errors[0]}</h5>`;
			document.getElementById("gallery").innerHTML += '<input type="button" onclick="try_login();" value = "Login"></input>';
			return ;
		}
		else if (data.results)
			data.results.forEach(element => {
				document.getElementById("gallery").innerHTML += `<div class="gallery-item"><img class="star" src="star.png"><img src="${element.urls.full}" alt="${element.alt_description || ''}"></div>`;
			});
    })
    .catch(error => console.error('Error:', error));
}

function navSelect(index, max)
{
	function s(id){return document.getElementById(id);}
	if (index < 1)
		s("navigation").style.opacity = 0;
	else
		s("navigation").style.opacity = 1;
	if (s("nav-current").value == index && s("search_input").value == last_query)
		return;
	index = parseInt(index);
	s("nav-current").value = index;
	s("nav-prev").value = index - 1;
	s("nav-next").value = index + 1;

	s("nav-prev").style.display = index == 1 ? "none" : "";
	s("nav-next").style.display = index == max ? "none" : "";
	s("nav-second").style.display = index < 4 ? "none" : "";
	s("nav-first").style.display = index < 3 ? "none" : "";
	s("nav-last-prev").style.display = index > max - 3 ? "none" : "";
	s("nav-last").style.display = index > max - 2 ? "none" : "";
	s("navetc1").style.display = index < 5 ? "none" : "";
	s("navetc2").style.display = index > max - 4 ? "none" : "";
	if (index > 0)
		getImages(s("search_input").value, index);
}

navSelect(0, 30);