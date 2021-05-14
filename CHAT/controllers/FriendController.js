


let friendLists = (req, res) => {
    
    return res.status(200).json(friends);
}

module.exports = {
    friendLists,
}