import Footer from '../Components/Footer'
import Filterbar from '../Components/Filterbar'
import Layout from '../Components/Layout'
import Comparecard from '../Components/comparecard'


const propertycompare = () => {
    return (
        <Layout>
            <Filterbar onViewTypeChange={undefined} onApplyFilters={undefined} />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className='w-full h-20 flex justify-between'>
                    <h2 className="text-[20px] font-bold tracking-tight text-gray-900 mt-5 ">
                        Properties to rent <br />
                    </h2>
                    <div>
                        <select
                            className="px-4 py-2 mb-4 mt-5 "
                        >
                            <option value="asc">Highest price</option>
                            <option value="desc">Lowest price</option>
                        </select>
                    </div>
                </div>
                <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-2 gap-y-4 justify-center items-center ml-28">
                    <Comparecard />
                    <Comparecard />
                    <Comparecard />
                    <Comparecard />
                    <Comparecard />
                    <Comparecard />

                </div>
                </div>

                <Footer />
        </Layout>
    )
}

export default propertycompare