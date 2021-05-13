


let friendLists = (req, res) => {
   
    
    // Lưu ý khi làm thực tế thì việc lấy danh sách này là query tới DB để lấy nhé. Ở đây mình chỉ mock thôi.
    const friends = [
        {
            name: "Cat: Russian Blue",
        },
        {
            name: "Cat: Maine Coon",
        },
        {
            name: "Cat: Balinese",
        },
    ];
    return res.status(200).json(friends);
}

module.exports = {
    friendLists,
}