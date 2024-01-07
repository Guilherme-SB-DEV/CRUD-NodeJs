const express = require("express");

const server = express();


const uuid = require("uuid")
server.use(express.json());



const users = []
const port = 3000;


//Middleware intercepta e tem poder de alterar dados
const Middleware = (request, response, next) =>{
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)
    if(index<0){
        return response.status(404).json({message: "user not found"})
    }
    request.userIndex = index;
    request.userId = id
    next()

}

server.get('/users',  (request, response) => {
    return response.json(users)
})

server.post('/users', (request, response) => {
    const {name, age} = request.body
    
    const user = { id:uuid.v4(), name , age}    
    users.push(user)
    console.log(user)
    return response.status(201).json(user)
    
})

server.put('/users/:id', Middleware, (request, response) => {
    const id = request.userId
    const {name, age} = request.body
    const index = request.userIndex
    
    const updatedUser = {id, name, age}
        
    users[index] = updatedUser
    
    return response.json(updatedUser)
});

server.delete('/users/:id', Middleware, (request, response)=>{
    const index = request.userIndex;
    users.splice(index, 1);
    return response.status(204).json()
})













server.listen(port, () => {
    console.log('server started at port', port);
});    




// const port = 3000

// const express = require("express")
// const server = express()

// server.get("/user",(request, response) => {
//     const {name, age} = request.query

//     return express.response.json({name, age})
// })
// server.listen(port, () =>{
//     console.log(`server no ar porta: ${port}`)})




// const port = 3000

// const express = require("express")
// const server = express()

// server.get("/user/:id",(request, response) => {
//     console.log(id)

//     return express.response.json()
// })
// server.listen(port, () =>{
//     console.log(`server no ar porta: ${port}`)})


// const express = require("express");
// const port = 3000;

// const server = express();
// server.use(express.json());



// server.get('/users',  (request, response) => {
    //     const {name, age} = request.body    
    //     return response.json({name, age})
    // })
    // server.listen(port, () => {
        //     console.log('server started at port', port);    
        // });
        



