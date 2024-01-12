import React from 'react'

const Pagenotfound = () => {
    return (
        <section className="page_404 min-h-screen flex items-center justify-center font-serif bg-white">
            <div className="container mx-auto">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-10 col-sm-offset-1 text-center">
                            <div className='flex justify-center'>
                                <div
                                    className="bg-cover bg-center  flex items-center justify-center  "
                                    style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)', width: 400, height: 400 }}
                                >

                                </div>

                            </div>

                            <div className="contant_box_404 ">
                                <h1 className="text-center text-5xl">404</h1>
                                <h3 className="text-5xl mt-5">Look like you're lost</h3>
                                <p className="mt-4">The page you are looking for is not available!</p>
                                <a href="/" className="link_404 inline-block bg-[#870e4d] text-white py-2 px-4 mt-5">Go to Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Pagenotfound


