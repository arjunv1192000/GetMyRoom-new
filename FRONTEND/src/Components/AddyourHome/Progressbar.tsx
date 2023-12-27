
const Progressbar = ({ currentStep, totalSteps, onNext, onPrev,onSubmit }) => {
    
    const isLastStep = currentStep === totalSteps;
    const progressPercentage = (currentStep / totalSteps) * 100;

    const handleNextClick = () => {
        if (isLastStep) {

            onSubmit();

        } else {
            onNext();
        }
    };

    return (

        <div className="w-full h-auto flex flex-col pb-10">
            <div className='w-full h-10  flex justify-center' >
                <div className="bg-gray-300 rounded-full w-[95%] h-2.5 mt-2 ">
                    <div
                        style={{ width: `${progressPercentage}%` }}
                        className="h-full rounded-full bg-slate-500 relative transition-all duration-500"
                    >
                        <div className="absolute text-xs -right-4 bg-black text-white font-bold px-1.5 min-w-[40px] min-h-[24px] -top-8 rounded flex items-center justify-center before:w-4 before:h-4 before:rotate-45 before:bg-black before:z-[-1] before:absolute before:-bottom-0.5">
                            {`${Math.round(progressPercentage)}%`}
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex justify-between px-4 py-3 sm:px-6 mt-1">
                <button
                    type="button"
                    onClick={onPrev}
                    className="bg-gray-300 px-4 py-2 rounded-md focus:outline-none"
                    disabled={currentStep === 1}
                >
                    Previous
                </button>
                <button
                    type="button"
                    onClick={handleNextClick}
                    className={`${isLastStep ? 'bg-green-500' : 'bg-[#870e4d]'
                        } text-white px-4 py-2 rounded-md focus:outline-none w-40`}
                >
                    {isLastStep ? 'Submit' : 'Next'}
                </button>
            </div>

        </div>



    );
};

export default Progressbar;
