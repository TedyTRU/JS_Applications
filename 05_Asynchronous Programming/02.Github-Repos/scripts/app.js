function loadRepos() {

	const list = document.getElementById('repos');
	const userName = document.getElementById('username').value;
	const url = `https://api.github.com/users/${userName}/repos`;

	// fetch(url)
	// 	.then(res => res.json())
	// 	.then(data => console.log(data));


	// fetch(url)
	// 	.then(res => {
	// 		if (res.ok == false) {
	// 			throw new Error(`${res.status} ${res.statusText}`);
	// 		}
	// 		return res.json()
	// 	})
	// 	.then(data => console.log(data))
	// 	.catch(error => console.log(error));

	fetch(url)
		.then(res => {
			if (res.ok == false) {
				throw new Error(`${res.status} ${res.statusText}`);
			}
			return res.json();
		})
		.then(handleResponse)
		.catch(handleError);

	function handleResponse(data) {
		list.innerHTML = '';

		for (let repo of data) {
			const liElement = document.createElement('li');
			liElement.innerHTML = `<a href="${repo.html_url}">
                ${repo.full_name}
            </a>`;

			list.appendChild(liElement);

			//console.log(repo.full_name, repo.html_url);
		}
	}

	function handleError(error) {
		list.innerHTML = '';
		//list.replaceChildren();
		list.textContent = `${error.message}`;

	}
}