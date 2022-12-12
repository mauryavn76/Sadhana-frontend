import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect } from 'react';
import { useState } from 'react';
import BASE_URL from '../../utils/base-url';
import { motion } from "framer-motion"

const Step4 = ({symptoms}) => {

  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState([]);
  const [viewResultModal, setViewResultModal] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState({});
  const [showFooter, setShowFooter] = useState(false);
  const [loading, setIsLoading] = useState(false)

  const getResult = async () => {
    let s_ids = [];
    symptoms?.map((sym) => {
      s_ids.push(sym._id);
    });
    const res = await BASE_URL.post('/symptom-disease-check', { s_ids: s_ids });
    setResult(res.data.data);
  };

  setTimeout(() => {
      setIsLoading(true);
  },10)
 
  useEffect(() => {
    getResult();
    setIsLoading(true);
  }, []);

  return (
    <>
      {/* <div className="flex justify-center font-bold border-cyan-500 border-solid bg-[#86E6FB] h-12">
            <div className="flex flex-1 justify-around items-center">
              <p className="m-0">SEARCH BY BODY PARTS</p>
              <p className="m-0">SEARCH BY BODY FUNCTIONS</p>
              <p className="m-0">SEARCH BY SYMPTOMS</p>
            </div>
          </div> */}
     {/* {loading && <div> Loading...</div>}  */}
      <motion.div initial={{opacity: 0}} animate={{opacity: 1.5}} exit={{opacity:0}} className='bg-[#DAF4FA]'>
        <div className="bg-[#DAF4FA] flex items-center mx-24 h-[calc(110vh-190px)]">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex justify-center flex-col ">
              <h2 className='text-2xl text-black font-semibold'>Results according to your selected symptoms</h2>
              <div className=' h-[calc(100vh-250px)] overflow-y-auto'>
              {result.map((x, id) => {
               return (
                <>
                <div key={id} className="flex flex-1 gap-2 flex-col overflow-y-auto text-black my-2">
                  <div>
                  <span onClick={() => setShowResult(true)} className="mx-2 cursor-pointer flex justify-center items-center px-4 border-2 border-solid border-gray-400 h-14">{x.name} {x.probability} <ArrowForwardIosIcon className='float-right text-gray-400' /></span>
                  </div>
                </div>  
               </>
          );
         
        })
        }
         </div>
              {/* <div className="flex flex-1 gap-2 flex-col overflow-y-auto h-[10vh] text-black">
                <button onClick={() => setShowResult(true)} className="px-4 border-2 border-solid border-gray-400 h-14">Lung Cancer <ArrowForwardIosIcon className='float-right text-gray-400' /> </button>
                <button onClick={() => setShowResult(true)} className="px-4 border-2 border-solid border-gray-400 h-14">Gonnorhea <ArrowForwardIosIcon className='float-right text-gray-400' /></button>
                <button className="px-4 border-2 border-solid border-gray-400 h-14">Tuberculosis <ArrowForwardIosIcon className='float-right text-gray-400' /></button>
                <button className="px-4 border-2 border-solid border-gray-400 h-14">Diarrhea <ArrowForwardIosIcon className='float-right text-gray-400' /></button>
                <button className="px-4 border-2 border-solid border-gray-400 h-14">Malaria <ArrowForwardIosIcon className='float-right text-gray-400' /></button>
                <button className="px-4 border-2 border-solid border-gray-400 h-14">Dengue <ArrowForwardIosIcon className='float-right text-gray-400' /></button>
              </div> */}
            </div>
            <div className='flex justify-center items-center flex-col'>
              {showResult &&
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity:0}}>
                  <div className='flex justify-center flex-col items-center'>
                    <img className="w-[50%] h-[50%]" src="/images/app/lung-cancer.png" />
                    <h3 className="text-black">Lung Cancer</h3>
                    <p className="text-black text-sm px-2 h-32 overflow-y-auto">Lung cancer is a type of cancer that begins in the lungs. Your lungs are two spongy organs in your chest that take in oxygen when you inhale and release carbon dioxide when you exhale.
                      Lung cancer is the leading cause of cancer deaths worldwide.
                      People who smoke have the greatest risk of lung cancer, though lung cancer can also occur in people who have never smoked. The risk of lung cancer increases with the length of time and number of cigarettes you've smoked. If you quit smoking, even after smoking for many years, you can significantly reduce your chances of developing lung cancer.</p>
                  </div>
                </motion.div>
              }
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Step4;
