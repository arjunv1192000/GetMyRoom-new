const userdataupdation = async (fullname, email, image, dob, userId, dbrepository, authService) => {
    try {
        const userupdate = await dbrepository.userupdate(fullname, email, image, dob, userId);

        console.log(userupdate, "iiii");

        const isUser = {
            userId: userupdate._id,
            userName: userupdate.name,
            userEmail: userupdate.email,
            userphone: userupdate.phone,
            userdob: userupdate.dob,
            userimg: userupdate.image
        };

        console.log(isUser);

        const AccessToken = await authService.generateAccessToken(isUser);
        // const RefreshToken = await authService.generateRefreshToken(isUser);

        return { status: true, isUser, AccessToken};
    } catch (error) {
        console.error('Error updating user data:', error);
        return { message: 'Error updating user data', status: false };
    }
};

export default userdataupdation;
