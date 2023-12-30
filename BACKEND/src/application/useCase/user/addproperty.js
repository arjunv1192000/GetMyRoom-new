import propertydata from "../../../entities/property.js"

const adduserproperty = async (userId,tilte,type,location,bathrooms,bedrooms,features,image,description,price,floorplans,seller,repositories) => {
   

    try {
        const property = propertydata(userId,tilte,type,location,bathrooms,bedrooms,features,image,description,price,floorplans,seller)
        console.log(property);

        const userproperty = await repositories.create(property)
        console.log(property,"keriiii");

        return { status: true,userproperty }

    } catch {
        return { message: 'Error creating user property', status: false };

    }






}
export default adduserproperty