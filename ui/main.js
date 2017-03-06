
var submit= document.getElementById('submit_btn');
submit.onclick= function () {
   
    var request=new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        
        if (request.readyState === XMLHttpRequest.DONE){
            
            if(request.status===200){
              console.log('user logged in');
              alert('logged in succesfully');
              
            } else if(request.status===403){
               alert('incorrent password/username');

            } else if(request.status===500){
                alert('something went wrong on the server');
            }
            
        }
    };
    var username= document.getElementById('username').value;
    var password= document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST', 'http://gunhawk2314.imad.hasura-app.io/login' + name, true );
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
    

    
  
};