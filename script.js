var form = document.getElementById('form');
form.addEventListener('submit', function(event){
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone_no = document.getElementById('phone_no').value;

    axios.post('https://crudcrud.com/api/f68e283fd33f4434827d077bd7a73352/users', {
        name: name,
        email: email,
        phone_no: phone_no
    })
    .then(function (response) {
        console.log(response);
        // Store the data in localStorage
        localStorage.setItem('userData', JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
});

// Retrieve the data from localStorage on page load
window.addEventListener('load', function() {
    var userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        document.getElementById('name').value = userData.name;
        document.getElementById('email').value = userData.email;
        document.getElementById('phone_no').value = userData.phone_no;
        axios.post('https://crudcrud.com/api/f68e283fd33f4434827d077bd7a73352/users', userData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});

var deleteBtn = document.getElementById('delete');
deleteBtn.addEventListener('click', function(event) {
    // Implement code to delete data from CRUD API here
    // Remove the data from localStorage
    var userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        axios.delete('https://crudcrud.com/api/f68e283fd33f4434827d077bd7a73352/users/' + userData._id)
            .then(function (response) {
                console.log(response);
                localStorage.removeItem('userData');
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});

var editBtn = document.getElementById('edit');
editBtn.addEventListener('click', function(event) {
    // Implement code to edit data from CRUD API here
    // Store the edited data in localStorage
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone_no = document.getElementById('phone_no').value;
    var userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        userData.name = name;
        userData.email = email;
        userData.phone_no = phone_no;
        axios.put('https://crudcrud.com/api/f68e283fd33f4434827d077bd7a73352/users/' + userData._id, userData)
            .then(function (response) {
                console.log(response);
                localStorage.setItem('userData', JSON.stringify(userData));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});
