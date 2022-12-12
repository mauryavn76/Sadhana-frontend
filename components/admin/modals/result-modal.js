import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #0000',
  boxShadow: 24,
  p: 4,
};

export default function ResultModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <div className="flex justify-center font-bold border-cyan-500 border-solid bg-[#86E6FB] h-12">
     </div>
  <div className="bg-[#4EB2C9ED]">
    <div className="bg-[#DAF4FA] mx-24">
      <div className="flex flex-row flex-1 h-[calc(110vh-190px)] text-[#DCDCDC] gap-3">
        <div className="flex flex-1 flex-col gap-10 items-center h-[50%] w-[30%]">
            <div className='flex justify-center items-center'>
         <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', height:575, width:575}}>
            <img className='h-[50%] w-[50%]' src="/images/app/step 4-01.png"/>
       <Button className='text-teal-600 hover:underline text-xl' onClick={handleOpen}>View Disease Result</Button>
       <Modal 
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
         <Fade in={open}>
           <Box sx={style}>
             <Box sx={{display:'flex', flexDirection:'column' ,justifyContent:'center', alignItems:'center', }}>
              <Box sx={{fontSize:'25px', textDecoration:'underline'}}>RESULT</Box>
               <img className="w-[50%] h-[50%]" src="/images/app/lung-cancer.png" />
               <h3 className="text-black">Lung Cancer</h3>
               <p className="text-black text-sm px-2 h-32 overflow-y-auto">Lung cancer is a type of cancer that begins in the lungs. Your lungs are two spongy organs in your chest that take in oxygen when you inhale and release carbon dioxide when you exhale.
               Lung cancer is the leading cause of cancer deaths worldwide.
               People who smoke have the greatest risk of lung cancer, though lung cancer can also occur in people who have never smoked. The risk of lung cancer increases with the length of time and number of cigarettes you've smoked. If you quit smoking, even after smoking for many years, you can significantly reduce your chances of developing lung cancer.</p>
            </Box>
           </Box>
          </Fade>
         </Modal>
        </Box>
        </div>
       </div>
      </div>
     </div>
    </div>
    </>
  );
}