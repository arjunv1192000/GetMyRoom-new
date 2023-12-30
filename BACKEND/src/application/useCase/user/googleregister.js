import usergoogledata from "../../../entities/google.js";

const googleregister = async (fullname, email, image, dbrepository, authService) => {
    const existingUser = await dbrepository.userexistemail(email);

    if (existingUser) {
        // User exists, proceed with login
        const isUser = {
            userId: existingUser._id,
            userName: existingUser.name,
            userEmail: existingUser.email,
            userimg: existingUser.image
        };

        const AccessToken = await authService.generateAccessToken(isUser);
        const RefreshToken = await authService.generatRefreshToken(isUser);

        return { status: true, isUser, AccessToken, RefreshToken };
    } else {
        // User does not exist, proceed with registration and then login
        const userdetails = usergoogledata(fullname, email, image);
        const newuser = await dbrepository.googlecreate(userdetails);

        const isUser = {
            userId: newuser._id,
            userName: newuser.name,
            userEmail: newuser.email,
            userimg: newuser.image
        };

        const AccessToken = await authService.generateAccessToken(isUser);
        const RefreshToken = await authService.generatRefreshToken(isUser);

        return { status: true, isUser, AccessToken, RefreshToken };
    }
};

export default googleregister;
