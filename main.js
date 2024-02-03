

function saveToCloud(event){
    event.preventDefault();

    const username= event.target.username.value;
    const email= event.target.email.value;
    const phoneno= event.target.phoneno.value;

    const obj={
        username,
        email,
        phoneno
    }

    axios.post('https://crudcrud.com/api/49b75f701e1f4361a4171c74751acc65/AppointmentData',obj)
        .then((res)=>{
            showUserOnScreen(res.data)
            console.log(res)
        })
        .catch(err=> console.log(err))

    // localStorage.setItem(obj.username,JSON.stringify(obj))
    // showUserOnScreen(obj)
 

}

// Retrieving Data From CRUD/CRUD

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/49b75f701e1f4361a4171c74751acc65/AppointmentData')
    .then((response)=>{
        console.log(response)

        for(var i=0;i<response.data.length;i++){
            showUserOnScreen(response.data[i])
        }
    })
    .catch(err => console.log(err))
})


function showUserOnScreen(obj){
    const parentele= document.getElementById('user-list')
    const childele= document.createElement('li')
    childele.textContent= obj.username+ ' '+ obj.email + ' ' + obj.phoneno
    parentele.appendChild(childele)


    // Edit button
    const editButton= document.createElement('input')
    editButton.type='button'
    editButton.value='Edit'
    childele.appendChild(editButton)
    editButton.onclick= ()=>{
        localStorage.removeItem(obj.username)
        parentele.removeChild(childele)

        document.getElementById('username').value= obj.username;
        document.getElementById('email').value= obj.email;
        document.getElementById('password').value= obj.phoneno;

    }
    

    // Delete button
    const deletebutton= document.createElement('button')
    deletebutton.textContent='Delete'
    childele.appendChild(deletebutton)
    deletebutton.onclick=()=>{
        localStorage.removeItem(obj.username)
        parentele.removeChild(childele)
    }

    deletebutton.onclick= ()=>{
        axios.delete(`https://crudcrud.com/api/49b75f701e1f4361a4171c74751acc65/AppointmentData/${obj._id}`)
        .then(()=>{
            parentele.removeChild(childele)
        })
    
        .catch(err => console.log(err))
    }
}


