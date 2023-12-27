import Property from "../../models/PropertyModel.js"


const userpropertyrepositoryImp = () => {

  const create = async (property) => {

    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();

      const newuserproperty = new Property({
        userId: property?.getuserid(),
        title: property?.gettitle(),
        type: property?.gettype(),
        location: property?.getlocation(),
        room: property?.getroom(),
        bathrooms: property?.getbathrooms(),
        bedrooms: property?.getbedrooms(),
        buildYear: property?.getbuildYear(),
        features: property?.getfeatures(),
        image: property?.getimage(),
        video: property?.getvideo(),
        description: property?.getdescription(),
        price: property?.getprice(),
        date: formattedDate,
        approve: false,
        floorplans: property?.getfloorplans(),
        sellertype: property?.getseller()

      })
      const savedProperty = await newuserproperty.save();
      console.log(savedProperty, "sss");
      return savedProperty;

    } catch (error) {
      console.error('Error saving property:', error);
      throw error;
    }




  }

  const userproperties = async (userId) => {

    try {

      const properties = await Property.find({ userId: userId }).exec();
      console.log(properties, "User Properties");
      return properties;
    } catch (error) {
      console.error('Error retrieving user properties:', error);
      throw error;
    }



  }

  const properties = async (locationName, type) => {
    try {
      const totalCount = await Property.countDocuments({
        'location.locationName': new RegExp(locationName.split(' ').join('|'), 'i'),
         type: type,
        approve: true,
      });
      if(type=="AllType"){
        const allproperty = await Property.find({
          'location.locationName': new RegExp(locationName.split(' ').join('|'), 'i'),
          approve: true,
        }).populate('userId', 'name email phone image');
  
        return { totalCount, allproperty };

      }else{
        const allproperty = await Property.find({
          'location.locationName': new RegExp(locationName.split(' ').join('|'), 'i'),
          type: type,
          approve: true,
        }).populate('userId', 'name email phone image');
  
        return { totalCount, allproperty };

      }

     
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  };



  const singleproperty = async (Id) => {

    try {
      const properties = await Property.find({ _id: Id }).populate('userId', 'name email phone image');;
      console.log(properties, "single Properties");
      return properties;
    } catch (error) {
      console.error('Error retrieving  properties:', error);
      throw error;
    }

  }

  const listedproperty = async () => {

    try {

      const properties = await Property.find({ approve: true }).populate('userId', 'name email phone image');
      console.log(properties, "User Properties");
      return properties;
    } catch (error) {
      console.error('Error retrieving user properties:', error);
      throw error;
    }



  }
  const unlistedproperty = async () => {

    try {

      const properties = await Property.find({ approve: false }).populate('userId', 'name email phone image');
      console.log(properties, "User Properties");
      return properties;
    } catch (error) {
      console.error('Error retrieving user properties:', error);
      throw error;
    }



  }

  const verification = async (postId) => {
    console.log(postId, "oooooo");
    try {
       
        const existingProperty = await Property.findOne({ _id: postId }).exec();

        if (!existingProperty) {
            console.log(`No property found with postId ${postId}.`);
            return false;
        }

       
        existingProperty.approve = true;
        const updatedProperty = await existingProperty.save();

        console.log(`Property with postId ${postId} has been approved.`);
        return true;
    } catch (error) {
        console.error('Error during verification:', error);
        return false;
    }
};

  


  return {
    create,
    userproperties,
    properties,
    singleproperty,
    listedproperty,
    unlistedproperty,
    verification

  }
}
export default userpropertyrepositoryImp