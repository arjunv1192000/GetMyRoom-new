


const UserpropertyrepositoryInt=(dbrepository)=>{

    const create=(property)=>dbrepository.create(property);
    const userproperties=(userId)=>dbrepository.userproperties(userId);
    const properties=(location,type)=>dbrepository.properties(location,type)
    const singleproperty=(Id)=>dbrepository.singleproperty(Id);
    const listedproperty=()=>dbrepository.listedproperty()
    const unlistedproperty=()=>dbrepository.unlistedproperty()
    const verification=(postId)=>dbrepository.verification(postId)
    const removlisteproperty=(postId)=>dbrepository.removlisteproperty(postId)

    return{
        create,
        userproperties,
        properties,
        singleproperty,
        listedproperty,
        unlistedproperty,
        verification,
        removlisteproperty

    }

}
export default UserpropertyrepositoryInt