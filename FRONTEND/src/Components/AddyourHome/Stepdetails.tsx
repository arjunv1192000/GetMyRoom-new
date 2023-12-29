
import img1 from '../../assets/formimg.png'
import img2 from '../../assets/illustration_login.png'
import img3 from '../../assets/contact-img.png'
import img4 from '../../assets/img2.webp'

const Stepdetails = () => {
    return (
        <div className="mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8  flex flex-col sm:flex-row mb-20  ">
            <div className='w-full sm:w-1/2 h-auto sm:flex flex-col'>
                <h2 className="font-semibold text-gray-900 text-[38px] sm:text-[38px] md:text-4xl lg:text-5xl xl:text-[48px] text-center">It’s easy to get <br></br>started on GetMyRoom</h2>

            </div>
            <div className='w-full sm:w-1/2 h-auto sm:flex flex-col'>
                <div className='flex flex-col items-center  shadow md:flex-row  h-38 bg-white w-full'  >
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900  text-start">1Tell us about your place</h5>
                      
                    </div>
                    <img className="object-cover  rounded-t-lg h-20 md:h-24 md:w-28 md:rounded-none md:rounded-s-lg" src={img1} alt=""></img>

                </div>
                <hr className="border-t border-gray-300  " />
                <div className='flex flex-col items-center  shadow md:flex-row  h-38 bg-white w-full'  >
                <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2">2 Make it stand out the property</h5>
                        
                    </div>
                    <img className="object-cover  rounded-t-lg h-20 md:h-24 md:w-28 md:rounded-none md:rounded-s-lg" src={img4} alt=""></img>

                </div>
                <hr className="border-t border-gray-300  " />
                <div className='flex flex-col items-center  shadow md:flex-row  h-38 bg-white w-full'  >
                <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2">3  Tell us about your features</h5>
                      
                    </div>
                    <img className="object-cover  rounded-t-lg h-20 md:h-24 md:w-28 md:rounded-none md:rounded-s-lg" src={img3} alt=""></img>

                </div>
                <hr className="border-t border-gray-300  " />
                <div className='flex flex-col items-center  shadow md:flex-row  h-38 bg-white w-full'  >
                <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2">4 Finish up and publish</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ml-2">Choose if you'd like to start with an experienced guest, set a starting price and publish your listing.</p>
                    </div>
                    <img className="object-cover  rounded-t-lg h-20 md:h-24 md:w-28 md:rounded-none md:rounded-s-lg" src={img2} alt=""></img>

                </div>
                <hr className="border-t border-gray-300  " />
            </div>
           
            
        </div>
    )
}

export default Stepdetails