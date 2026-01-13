// signup controller 
function register(req , res){
    res.json({message :"register"})
}

// signin controller 
function login(req , res){
    res.json({message : "login"})
}


module.exports = {register , login}
