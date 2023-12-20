import authRouter from "./user/userauth.js"
import commonservice from "./commonservice.js"
import propertyRouter from "./user/property.js"
import authRouterAdmin from "./admin/adminauth.js"




const  routes=( app,express)=>{
    app.use('/api/v1/user',authRouter(express))
    app.use('/api/v1/service',commonservice(express))
    app.use('/api/v1/property',propertyRouter(express))
    app.use('/api/v1/admin',authRouterAdmin(express))

}
export default routes