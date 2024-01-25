const sessionIdToUserMap = new Map();

function setUser(id,user){
    sessionIdToUserMap.set(id,user);
}

function getUser(id){
    const user = sessionIdToUserMap.get(id)
    return user;
}


module.exports = {
    setUser,
    getUser
}