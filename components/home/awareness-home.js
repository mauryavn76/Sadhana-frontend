const AwarenessHome = () => {
    return ( 
        <>
        <div className="grid grid-cols-2 h-full w-full px-16 py-16">
            <div className='h-full w-full'>
            <img className="bg-sky-800" src="images/our-platform.png"/>
            </div>
            <div className="text-3xl font-serif flex justify-center items-center flex-col">
                <p className="font-semibold">Health Help</p>
                <ul className="font-medium">
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