import React, { useEffect, useState } from 'react'
import Savedcard from './Savedcard'
import axios from "../Components/Utils/user/axios";
import { useSelector } from "react-redux";

type RootState = {
    user: {
        value: {
            image: string | undefined;
            id: string | null;
            name: string | null;
            email: string | null;
            phone: string | null;
            access_token: string;
        };
    };
};


type property = {
    Id: string;
    id: string;
    title: string;
    location: {
        coordinates: {
            lat: number;
            lng: number;
        }
        locationName: string;
    };
    room: number;
    document: string;
    floorplans: string;
    bathrooms: number;
    bedrooms: number;
    buildYear: string;
    date: string;
    approve: boolean;
    description: string;
    features: {
        interiorDetails: [string],
        otherFeatures: [string],
        outdoorDetails: [string],
        utilities: [string],
    };
    image: [string];
    price: number;
    video: string;
    userId: {
        _id: string;
        email: string;
        image: string;
        name: string;
        phone: string;
    }
    userimg: string;
    Id: string;

}

const Savedlist = () => {
    const [property, setProperty] = useState<property[]>([]);
    const userdata = useSelector((state: RootState) => state.user.value);
    const id = userdata.id;

    useEffect(() => {
        const save = async () => {
            await axios.get('/getsavedjobs?id=' + id).then((response) => {
                console.log(response.data.saved);
                setProperty(response.data.saved);
            })
                .catch((error) => {
                    console.error(error.message);
                });

        }
        save()

    }, [id]);

    return (
        <div className='bg-white'>
            <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900  sm:ml-20 sm:text-3xl  ">Saved List</h2>
                <div className=' ml-10 sm:ml-10'>
                    {property.length === 0 ? (
                        <div className='flex justify-center w-full h-40'>

                            <p className="text-gray-500 mt-10">Saved list is empty.</p>
                           

                        </div>

                    ) : (
                        property.map((data) => (
                            <Savedcard
                                key={data.id}
                                Id={data._id}
                                title={data.title}
                                location={data.location}
                                image={data.image}
                                date={data.date}
                                bathrooms={data.bathrooms}
                                bedrooms={data.bedrooms}
                                price={data.price}
                                userimage={data.userId.image}
                                name={data.userId.name}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Savedlist