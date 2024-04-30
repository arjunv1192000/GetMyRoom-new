import { useState, useCallback, useEffect } from 'react'
import { Dialog, Disclosure, Popover, } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, } from '@heroicons/react/24/outline'
import { AiOutlineMenu } from "react-icons/ai"
import logo from "../../../../src/assets/Logo.webp"
import avatar from "../../../assets/avatar.png"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducer/AdminSlice';

type RootState = {
    admin: {
        value: {
            id: string | null;
            email: string | null;
            access_token: string;
            refresh_token: string;
        };
    };
};

const header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const admindata = useSelector((state: RootState) => state.admin.value);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isopen, SetIsopen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false);


    const handletoggleClick = () => {


        toggleopen()

    } 
    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin')
      

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
                    <a href="#" className="-m-1.5 p-1.5" >
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
                <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
                    <div className='relative'>
                        <div className='flex flex-row items-center gap-3 '>
                            <a  className="text-[20px] font-semibold leading-6 text-gray-900 py-3 px-4 rounded-full  hover:bg-neutral-100 transition cursor-pointer"onClick={() => navigate('/admin/dashboard')} >
                                Home
                            </a>
                            <a  className="text-[20px] font-semibold leading-6 text-gray-900 py-3 px-4 rounded-full  hover:bg-neutral-100 transition cursor-pointer"onClick={() => navigate('/admin/user')} >
                                Users
                            </a>
                            <a  className="text-[20px] font-semibold leading-6 text-gray-900 py-3 px-4 rounded-full  hover:bg-neutral-100 transition cursor-pointer"onClick={() => navigate('/admin/listed')} >
                             Listed Properties
                            </a>
                            <a className="text-[20px] font-semibold leading-6 text-gray-900 py-3 px-4 rounded-full  hover:bg-neutral-100 transition cursor-pointer"onClick={() => navigate('/admin/unlisted')} >
                             Unlisted Properties
                            </a>
                            <div onClick={handletoggleClick} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                                <AiOutlineMenu />
                                <div className="hidden md:block">

                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={avatar}
                                        alt=""
                                    />

                                </div>
                            </div>


                        </div>
                        {isopen && (



                            <div className="absolute rounded-xl shadow-md w-[40vm] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                                <div className="flex flex-col cursor-pointer">
                                    <>
                                        <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"> {admindata.email} </div>
                                        <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold" onClick={handleLogout}> Logout</div>

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
                            onClick={() => setMobileMenuOpen(false)}
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
                                    href="/admin/dashboard"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"

                                >
                                    Dashboard
                                </a>
                                <a
                                    href="/admin/user"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"

                                >
                                    Users
                                </a>
                                <a
                                    href="/admin/listed"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"

                                >
                                    Listed property
                                </a>
                                <a
                                    href="/admin/unlisted"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"

                                >
                                    Non Listed property
                                </a>



                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={handleLogout}
                                >
                                    Logout
                                </a>

                            </div>

                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}

export default header


