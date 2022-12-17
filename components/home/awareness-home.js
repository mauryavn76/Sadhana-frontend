const AwarenessHome = () => {
    return (
        <>
            <div className="grid md:grid-cols-2 h-full w-full md:px-20 px-6 md:py-20 py-6">
                <div className='flex justify-center items-center h-full w-full'>
                    <img className="bg-sky-800 md:h-[70vh] h-[50vh] w-full" src="images/our-platform.png" />
                </div>
                <div className="text-3xl font-serif flex justify-center items-center flex-col">
                    <p className="font-semibold mt-4">Health Help</p>
                    <ul className="text-lg">
                        <li>Nutrition</li>
                        <li>Lifestyle</li>
                        <li>Yoga & Exercise</li>
                        <li>Meditation</li>
                        <li>Home Remedies</li>
                        <li>Naturopathy</li>
                        <li>Acupressure</li>
                        <li>Acupuncture</li>
                        <li>Ayurveda</li>
                        <li>Homeopathy</li>
                    </ul>
                    <div className="mt-12">
                        <button className="bg-red-400 float-right text-xs text-white font-sans px-2 py-2 lg:px-5 lg:py-2 lg:text-xl">
                            Know More
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AwarenessHome;