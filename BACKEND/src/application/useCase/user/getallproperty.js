const getallproperty = async (location,type,repositories) => {

    console.log(location,type,"usecase");
   

    try {

        const propertydata =await repositories.properties(location,type)

        console.log(propertydata.allproperty);
        return { status: true,propertydata};

    } catch (err) {
        return { message: 'Error getting selection of all jobs', status: false, err };
    }
};

export default getallproperty;