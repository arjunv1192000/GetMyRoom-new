

const getsingleproperty = async (Id,repositories) => {


    console.log(Id,"usecasse");
    
    try {

        const propertydata =await repositories.singleproperty(Id)
       

        return { status: true, propertydata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default getsingleproperty
