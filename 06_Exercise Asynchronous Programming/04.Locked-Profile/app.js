async function lockedProfile() {

    const url = `http://localhost:3030/jsonstore/advanced/profiles`;

    const res = await fetch(url);
    const data = await res.json();

    const main = document.querySelector('main');
    main.innerHTML = '';


    //Object.values(await data).forEach(pr => console.log(pr.username, pr.email, pr.age));

    Object.values(data).forEach((pr, index) => main.appendChild(getProfile(pr, index + 1)));


}

function getProfile({ username, email, age }, index) {

    const profile = document.createElement('div');
    profile.className = 'profile';
    profile.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
    <label>Lock</label>
    <input type="radio" name="user${index}Locked" value="lock" checked>
    <label>Unlock</label>
    <input type="radio" name="user${index}Locked" value="unlock"><br>
    <hr>
    <label>Username</label>
    <input type="text" name="user${index}Username" value=${username} disabled readonly />
    <div id="user${index}HiddenFields">
    <hr>
    <label>Email:</label>
    <input type="email" name="user${index}Email" value=${email} disabled readonly />
    <label>Age:</label>
    <input type="email" name="user${index}Age" value=${age} disabled readonly />
    </div>`;


    const btn = document.createElement('button');
    btn.textContent = 'Show more';

    btn.addEventListener('click', () => {
        const checked = profile.querySelector('input[type=radio]:checked');
        if (checked != undefined && checked.value == 'unlock') {

            if (btn.textContent == 'Show more') {
                profile.querySelector(`#user${index}HiddenFields`).style.display = 'block';
                btn.textContent = 'Hide it';

            } else {
                profile.querySelector(`#user${index}HiddenFields`).style.display = 'none';
                btn.textContent = 'Show more';
            }
        }
    })

    profile.appendChild(btn);

    return profile;

}
