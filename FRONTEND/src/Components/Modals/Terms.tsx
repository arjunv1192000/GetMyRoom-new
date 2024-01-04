import React, { useState, useEffect } from 'react';

const Terms = () => {
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const isModalDisplayed = localStorage.getItem('isModalDisplayed');
        if (!isModalDisplayed) {
            setModalOpen(true);
            localStorage.setItem('isModalDisplayed', 'true');


            const timeoutId = setTimeout(() => {
                localStorage.removeItem('isModalDisplayed');
            }, 1* 60 * 60 * 1000);

            return () => clearTimeout(timeoutId);
        }
    }, []);

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleAgreeAndContinue = () => {
        setModalOpen(false);
    };

    return (
        <>
            {modalOpen && (
                <div className="fixed inset-0  z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white h-[500px] w-[90%] sm:w-[600px] sm:h-[500px] border-gray-200 shadow-lg rounded-lg overflow-hidden flex flex-col">
                    <div className="h-full overflow-y-auto p-4" >
                            <p className=" p-10 font-medium text-justify">
                                Welcome to getmyroom.co.uk Please note that this website is currently operating as a trial version. We would like to emphasize the following:

                                Trial Status: This version of the website is a trial and might contain limited functionality or incomplete features compared to the final release.

                                No Financial Transaction Responsibility: We do not assume any responsibility for financial transactions made through this trial version. Users engaging in financial transactions through this platform do so at their own risk.

                                Limited Liability: While we strive for accuracy and reliability, we do not guarantee the completeness, accuracy, or reliability of any information or content on this trial version of the website.

                                Feedback and Improvements: Your feedback on your experience with this trial version is highly valuable to us. Please share any suggestions, concerns, or issues you encounter during your usage.

                                Final Release Disclaimer: Please be aware that the final released version of this website may differ significantly from this trial version in terms of functionality, terms of use, and liability.

                                By using this trial version of getmyroom, you agree to these terms and conditions. We encourage you to review the full terms of use and privacy policy before engaging with this website.

                                Thank you for your understanding.

                            </p>
                        </div>
                        <div className='flex justify-center p-10'>
                        <button
                            onClick={handleAgreeAndContinue}
                            className="bg-[#390b79] text-white px-4 py-2 rounded mt-4 w-60 "
                        >
                            Agree and Continue
                        </button>

                        </div>
                       
                    </div>
                </div>
            )}
        </>
    );
};

export default Terms;
