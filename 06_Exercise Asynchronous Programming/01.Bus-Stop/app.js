async function getInfo() {

    // read input value
    // make request to server : 

    /* const url = `http://localhost:3030/jsonstore/bus/businfo/1308`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data); */

    // parse response data
    // display data
    // error checking for request


    const stopNameElement = document.getElementById('stopName');
    const timeTableElement = document.getElementById('buses');
    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try {
        stopNameElement.textContent = 'Loading ...';
        //timeTableElement.innerHTML = '';
        timeTableElement.replaceChildren();

        const res = await fetch(url);
        //console.log(res);

        if (res.status != 200) {
            throw new Error('Stop ID not found');
        }

        const data = await res.json();

        stopNameElement.textContent = data.name;
        //console.log(data);

        Object.entries(data.buses).forEach(b => {
            const liEl = document.createElement('li');
            liEl.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;

            timeTableElement.appendChild(liEl);
        });


    } catch (error) {
        stopNameElement.textContent = 'Error';
        //alert(error.message);
    }

}