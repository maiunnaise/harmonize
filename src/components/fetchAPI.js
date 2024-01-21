function getAPI(request, setState){
    let token = localStorage.getItem('token');

    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    };
 
    fetch(`https://harmonize.mael-mouquet.fr/api/${request}`, requestOptions)
    .then(response => response.json())
    .then(data => {
        setState(data);
    });

}

function deleteAPI(request){
    let token = localStorage.getItem('token');

    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    };
  
    fetch(`https://harmonize.mael-mouquet.fr/api/${request}`, requestOptions);

}

function putAPI(request, body){
    let token = localStorage.getItem('token');

    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body)
    };
  
    fetch(`https://harmonize.mael-mouquet.fr/api/${request}`, requestOptions);

}

async function postAPI(request, setState, body){
    
    let token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body)
    };
    const response = await fetch(`https://harmonize.mael-mouquet.fr/api/${request}`, requestOptions)
    const data = await response.json();
    setState(data);
}

export {getAPI, postAPI, deleteAPI, putAPI};