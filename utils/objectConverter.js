exports.userResponse = (users)=>{
    userResult = [];
    users.forEach(element => {
        userResult.push({
            name: element.name,
            userId: element.userId,
            email: element.email,
            userType: element.userType,
            userStatus: element.userStatus
        });
    });
    return userResult;
}