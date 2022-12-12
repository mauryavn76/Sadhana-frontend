import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';


const Step4 = () => {

  const [showResult, setShowResult] = useState(false);  
  const [showResult1, setShowResult1] = useState(false);

    return ( 
        <>
          <div className="flex justify-center font-bold border-cyan-500 border-solid bg-[#86E6FB] h-12">
          <div className="flex flex-1 justify-around items-center">
          <p className="m-0">SEARCH BY BODY PARTS</p>
              <p className="m-0">SEARCH BY BODY FUNCTIONS</p>
              <p className="m-0">SEARCH BY SYMPTOMS</p> 
          </div>
          </div>
        <div className="bg-[#4EB2C9ED] h-[calc(100vh-80px)] w-full"> 
      <div className="bg-[#DAF4FA] mx-24">
      <div className="grid grid-cols-2">
          <div className="flex flex-1 justify-center items-center flex-col">
            <h2 className='text-xl'>Results according to your selected symptoms</h2>
            <div className="flex flex-1 flex-col overflow-y-auto h-[10vh]">
              <button onClick={() => setShowResult(true)} className="px-32 border-2 border-solid border-gray-400 py-4">Lung Cancer <ArrowForwardIosIcon className='float-right text-gray-400' /> </button>
              <button onClick={() => setShowResult(true)} className="px-32 py-4 my-2 border-2 border-solid border-gray-400">Gonnorhea <ArrowForwardIosIcon className='float-right text-gray-400' /></button>
              <button className="px-32 py-4 my-2 border-2 border-solid border-gray-400">Tuberculosis <ArrowForwardIosIcon className='float-right text-gray-400' /></button>
              <button className="px-32 py-4 my-2 border-2 border-solid border-gray-400">Diarrhea <ArrowForwardIosIcon className='float-right text-gray-400' /></button>
              <button className="px-32 py-4 my-2 border-2 border-solid border-gray-400">Malaria <ArrowForwardIosIcon className='float-right text-gray-400' /></button>
              <button className="px-32 py-4 my-2 border-2 border-solid border-gray-400">Dengue <ArrowForwardIosIcon className='float-right text-gray-400' /></button>
            </div>
          </div>
          <div className='flex justify-center items-center flex-col'>
          {showResult === 'Result' && 
                  <div id='app-animation1'>
                  <div id='app-animation2' className='flex justify-center flex-col items-center'>
                  <img className="w-[50%] h-[50%]" src="/images/app/lung-cancer.png" />
                     <h3 className="text-black">Lung Cancer</h3>
                     <p className="text-black text-sm px-2 h-32 overflow-y-auto">Lung cancer is a type of cancer that begins in the lungs. Your lungs are two spongy organs in your chest that take in oxygen when you inhale and release carbon dioxide when you exhale.
                     Lung cancer is the leading cause of cancer deaths worldwide.
                     People who smoke have the greatest risk of lung cancer, though lung cancer can also occur in people who have never smoked. The risk of lung cancer increases with the length of time and number of cigarettes you've smoked. If you quit smoking, even after smoking for many years, you can significantly reduce your chances of developing lung cancer.</p>
                  </div>
                </div>
          }
          {showResult === 'Result1' && 
                  <div id='app-animation1'>
                  <div id='app-animation2' className='flex justify-center flex-col items-center'>
                  <img className="w-[50%] h-[50%]" src="/images/app/lung-cancer.png" />
                     <h3 className="text-black">Gonnorhea</h3>
                     <p className="text-black text-sm px-2 h-32 overflow-y-auto">Lung cancer is a type of cancer that begins in the lungs. Your lungs are two spongy organs in your chest that take in oxygen when you inhale and release carbon dioxide when you exhale.
                     Lung cancer is the leading cause of cancer deaths worldwide.
                     People who smoke have the greatest risk of lung cancer, though lung cancer can also occur in people who have never smoked. The risk of lung cancer increases with the length of time and number of cigarettes you've smoked. If you quit smoking, even after smoking for many years, you can significantly reduce your chances of developing lung cancer.</p>
                  </div>
                </div>
          }
          {showResult === 'Result2' && 
                  <div id='app-animation1'>
                  <div id='app-animation2' className='flex justify-center flex-col items-center'>
                  <img className="w-[50%] h-[50%]" src="/images/app/lung-cancer.png" />
                     <h3 className="text-black">Lung Cancer</h3>
                     <p className="text-black text-sm px-2 h-32 overflow-y-auto">Lung cancer is a type of cancer that begins in the lungs. Your lungs are two spongy organs in your chest that take in oxygen when you inhale and release carbon dioxide when you exhale.
                     Lung cancer is the leading cause of cancer deaths worldwide.
                     People who smoke have the greatest risk of lung cancer, though lung cancer can also occur in people who have never smoked. The risk of lung cancer increases with the length of time and number of cigarettes you've smoked. If you quit smoking, even after smoking for many years, you can significantly reduce your chances of developing lung cancer.</p>
                  </div>
                </div>
          }
          </div>
      </div>
  </div>
  </div> 
  </>
     );
}
 
export default Step4;

{/* <div className="flex justify-center font-bold border-cyan-500 border-solid bg-[#86E6FB] h-12">
<div className="flex flex-1 justify-around items-center"></div>
</div>
<div className="bg-[#4EB2C9ED] h-full w-full">
<div className="bg-[#DAF4FA] mx-24">
  <div className="flex flex-row flex-1 h-[calc(100vh-170px)] text-[#DCDCDC] gap-3">
    <div className="flex flex-1 flex-col items-center h-full w-full">
        <h1 className="text-3xl underline text-black">RESULT</h1>
        <div className="flex flex-col flex-1 justify-center items-center px-20 border-2 border-black border-solid">
            <img className="w-[50%] h-[50%]" src="/images/app/lung-cancer.webp" />
            <h3>Lung Cancer</h3>
            <p>Lung cancer is a type of cancer that begins in the lungs. Your lungs are two spongy organs in your chest that take in oxygen when you inhale and release carbon dioxide when you exhale.
            Lung cancer is the leading cause of cancer deaths worldwide.
            People who smoke have the greatest risk of lung cancer, though lung cancer can also occur in people who have never smoked. The risk of lung cancer increases with the length of time and number of cigarettes you've smoked. If you quit smoking, even after smoking for many years, you can significantly reduce your chances of developing lung cancer.</p>
        </div>
    </div>
  </div>
  <div className="flex justify-end items-end flex-col">
    <button className="cursor-auto font-bold bg-[#DAF4FA] text-[#DAF4FA] rounded-md py-2 px-4 mr-2 mb-2">
      NEXT STEP
    </button>
  </div>
</div>
</div> */}