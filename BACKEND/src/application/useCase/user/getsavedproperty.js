
const getsavedproperty = async (userId, repositories) => {
    console.log(userId);
 
    try {

        const saved =await repositories.userSavedproperty(userId)
        console.log(saved );

        return { status: true, saved }

    } catch {   
        return { message: 'Error getting user profile', status: false };

    }
}
export default getsavedproperty