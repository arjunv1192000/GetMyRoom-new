
import { useState, useCallback, useEffect } from 'react'
import { Dialog, Disclosure, Popover, } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, } from '@heroicons/react/24/outline'
import { AiOutlineMenu } from "react-icons/ai"
import logo from "../assets/Logo.png"
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { logout } from '../../src/redux/reducer/userSlice'
import { useDispatch } from "react-redux";
import avatar from "../assets/avatar.png"


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




const Header = ({ openLoginModal }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isopen, SetIsopen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userdata = useSelector((state: RootState) => state.user.value);

    const handleLogout = () => {
        dispatch(logout());
        toggleopen();
        localStorage.removeItem('isModalDisplayed');
        navigate('/')

    };
    const handlesidebarclose = () => {

        setMobileMenuOpen(false)


    };

    const handletoggleClick = () => {
        if (userdata && userdata.email) {

            toggleopen()

        } else {
            openLoginModal()

        }
    };




    const handleformClick = () => {
        if (userdata && userdata.email) {

            navigate('/form')

        } else {

            openLoginModal()

        }
    };


    const toggleopen = useCallback(() => {
        SetIsopen((value) => !value)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0;
            if (scrolled !== isScrolled) {
                setIsScrolled(scrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrolled]);


    return (
        <header className={`w-full     ${isScrolled ? 'bg-white ' : ''}`}>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5" >
                        <span className="sr-only">Your Company</span>
                        <img className="h-12 w-auto" src={logo} alt="" />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">


                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <div className='relative'>
                        <div className='flex flex-row items-center gap-3'>
                            <a href="/" className="text-[20px] font-semibold leading-6 text-gray-900 py-3 px-4 rounded-full  hover:bg-neutral-100 transition cursor-pointer">
                                Home
                            </a>
                            <div
                                onClick={handleformClick}
                                className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition ease-in-out delay-150 bg-[#870e4d]  hover:-translate-y-1 hover:scale-110 hover:bg-[#390b79] hover: duration-300transition cursor-pointer text-white'
                            >
                                Add your home

                            </div>
                            <div onClick={handletoggleClick} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                                <AiOutlineMenu />
                                <div className="hidden md:block">
                                    {userdata?.image ? (
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={userdata.image}
                                            alt=""
                                        />
                                    ) : (

                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={avatar}
                                            alt=""
                                        />
                                    )}
                                </div>
                            </div>


                        </div>
                        {isopen && (



                            <div className="absolute  z-50 rounded-xl shadow-md w-[40vm] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                                <div className="flex flex-col cursor-pointer">
                                    <>
                                        <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold" onClick={() => navigate('/profile')}> Profile </div>
                                        <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold" onClick={() => navigate('/save')}> Saved List </div>
                                        <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold" onClick={() => navigate('/mylist')}> My Listings</div>
                                        <div className="px-4 py-3 hover:bg-neutral-100 transition font-bold text-[#870e4d]" onClick={handleLogout}>Log out</div>

                                    </>
                                </div>
                            </div>

                        )}

                    </div>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src={logo}
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={handlesidebarclose}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">

                                </Disclosure>
                                <a
                                    
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    onClick={() => navigate('/')}
                                >
                                    Home
                                </a>
                                <a
                                   
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    onClick={() => userdata && userdata.email ? navigate('/profile') : openLoginModal() || handlesidebarclose()}
                                >
                                    Profile
                                </a>
                                <a
                                    
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    onClick={() => userdata && userdata.email ? navigate('/save') : openLoginModal() || handlesidebarclose()}
                                >
                                    Saved List
                                </a>
                                <a
                                   
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    onClick={() => userdata && userdata.email ? navigate('/mylist') : openLoginModal() || handlesidebarclose()}
                                >
                                    My List
                                </a>
                                <a
                                   
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    onClick={() => userdata && userdata.email ? navigate('/form') : openLoginModal() || handlesidebarclose()}
                                >
                                    Add your home
                                </a>

                                {userdata && userdata.email && (
                                    <a
                                       
                                        className="-mx-3 block rounded-lg px-3 py-2.5 font-bold   leading-7 text-[#870e4d] hover:bg-gray-50 text-[20px] " 
                                        onClick={handleLogout}
                                    >
                                        Log out
                                    </a>
                                )}


                            </div>


                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}

export default Header