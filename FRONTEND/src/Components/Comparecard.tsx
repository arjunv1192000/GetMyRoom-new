import post from "../assets/h1 (6).webp"
import logo from "../assets/Logo.png"
const Comparecard = () => {
    return (
        <div className="w-80 h-auto bg-white border border-gray-200 rounded-lg shadow-lg items-center overflow-hidden">
            <img className="rounded-t-lg scale-1 hover:scale-[1.1] duration-300 " src={post} alt="" />
            <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700 " />
            <div className='w-full h-16 flex flex-row justify-between'>
                <div className="flex items-center w-1/2">

                    <div className="flex-1 min-w-0 ms-4">
                    <h2 className="flex font-medium text-gray-900 text-[14px] ">$4545/month</h2>

                    </div>
                </div>
                <div className="w-1/2 flex items-center gap-5">
                    <div className="flex-shrink-0 ml-3">
                        <img className="w-30 h-8 rounded-full" src={logo} alt="Neil image" />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Comparecard