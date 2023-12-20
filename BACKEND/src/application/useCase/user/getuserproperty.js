
const Getuserproperty = async (userId, repositories) => {
 

    try {

        const userlist =await repositories.userproperties(userId)

        return { status: true, userlist }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Getuserproperty