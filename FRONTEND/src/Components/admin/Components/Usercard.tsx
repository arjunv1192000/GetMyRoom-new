import React from 'react'
import avatar from "../../../assets/avatar.png"

type Props = {
    userId: string;
    name: string;
    email: string;
    phone: string;
    image:string;
    dob:string;
    isBlock: boolean;
    fetchData: () => void
};



const Usercard: React.FC<Props> = ({ userId, name, email, phone,image,dob, }) => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-2">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg text-center" src={image} alt={name} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{phone}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{dob}</span>
               
            </div>
        </div>
    )
}

export default Usercard