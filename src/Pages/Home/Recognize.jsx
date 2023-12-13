
const Recognize = () => {
    return (
        <div className="my-32 max-w-[1420px] mx-auto">
            <h1 className="header text-3xl lg:text-4xl font-bold text-center">Recognized by Industry Experts for<br/>Our Innovation, Ethics, and Performance</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-10 mt-20">
                <div className="flex flex-col items-center">
                    <img className="w-[150px]" src="https://i.ibb.co/YB6nyq5/1.png" />
                    <p className="text-sm mt-3">Largest Recordkeeper by Number of Plans</p>
                </div>
                <div className="flex flex-col items-center">
                    <img className="w-[150px]" src="https://i.ibb.co/sWRqgPZ/2.png" />
                    <p className="text-sm mt-3">World's Most Ethical Companies</p>
                </div>
                <div className="flex flex-col items-center">
                    <img className="w-[150px]" src="https://i.ibb.co/NyPTy5n/3.png" />
                    <p className="text-sm mt-3">World's Most Admired Companies</p>
                </div>
                <div className="flex flex-col items-center">
                    <img className="w-[150px]" src="https://i.ibb.co/w6xwmmJ/4.png" />
                    <p className="text-sm mt-3">Excellence in Sales & Customer Service</p>
                </div>
            </div>
        </div>
    );
};

export default Recognize;