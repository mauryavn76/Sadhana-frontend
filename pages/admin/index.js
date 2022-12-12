import Sidebar from '../../components/admin/admin-sidebar';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import BASE_URL from '../../utils/base-url';
import Header from '../../components/multiusable/header';
import Chart from 'chart.js/auto';
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getToken } from '../../utils/token';
import { AuthContext } from '../../utils/authContext';
import { useContext } from 'react';
import Config from '../../Config';
import axios from 'axios';
import Slider from '@mui/material/Slider';

const Dashboard = () => {
  // console.log(count);
  const [count, setCount] = useState(null);
  const [reconfirmValue, setReconfirmValue] = useState(0);
  const [resultValue, setResultValue] = useState(0);

  const graphValue = async () => {
    const res = await BASE_URL.get('/count-value');
    setCount(res.data);
  };
  useEffect(() => {
    graphValue();
  }, []);

  // const router = useRouter();
  // useEffect(() => {
  //   if (!localStorage.getItem('access-token')) {
  //     router.replace('/admin/login');
  //   }
  // }, []);

  const [bodyPartsGraph, setBodyPartsGraph] = useState([]);
  const [diseaseGraph, setDiseaseGraph] = useState([]);
  const [symptomsGraph, setSymptomsGraph] = useState([]);

  const changeReconfirmSlider = async () => {
    const res = await BASE_URL.put('/app-settings', {
      suggested_diseases_pr: resultValue,
      reconfirm_symptoms_pr: reconfirmValue,
    });
    getSliderValues();
  };

  const changeDiseaseSlider = async () => {
    const res = await BASE_URL.put('/app-settings', {
      suggested_diseases_pr: resultValue,
      reconfirm_symptoms_pr: reconfirmValue,
    });
    getSliderValues();
  };

  useEffect(() => {
    changeReconfirmSlider();
  }, [resultValue, reconfirmValue]);

  const handleReconfirmChange = (event, newValue) => {
    setReconfirmValue(newValue);
    // changeReconfirmSlider();
  };

  const handleDiseaseChange = (event, newValue) => {
    setResultValue(newValue);
    // changeDiseaseSlider();
  };

  function resultValueText(value) {
    return value;
  }

  function reconfirmValueText(value) {
    return value;
  }

  const getSliderValues = async () => {
    const res = await BASE_URL.get('/app-settings');
    // console.log(res);
    setReconfirmValue(res?.data?.data?.reconfirm_symptoms_pr);
    setResultValue(res?.data?.data?.suggested_diseases_pr);
  };

  console.log(reconfirmValue, resultValue);

  useEffect(() => {
    getSliderValues();
  }, []);

  // const authContext = useContext(AuthContext);
  // const router = useRouter();

  // console.log('autthh', authContext?.authState);
  // console.log('isAuth', authContext?.isUserAuthenticated());
  // useEffect(() => {
  //   authContext?.isUserAuthenticated()
  //     ? router.push('/admin')
  //     : router.push('/');
  // }, []);

  const getGraphLabels = (value) => {
    let arr = [];
    value.map((val) => {
      arr.push(Object.values(val)[1].split('-')[2]);
    });
    return arr;
  };
  const getGraphData = (value) => {
    let arr = [];
    value.map((val) => {
      arr.push(Object.values(val)[2]);
    });
    return arr;
  };
  // console.log(diseaseGraph);

  // console.log("+===========", a);

  useEffect(() => {
    const getGraphData = async () => {
      const res = await BASE_URL.get('/graph-value');
      setBodyPartsGraph(res.data.data.body_parts);
      setDiseaseGraph(res.data.data.diseases);
      setSymptomsGraph(res.data.data.symptoms);
    };
    getGraphData();
  }, []);

  let countCircle =
    'rounded-full flex text-[#85C4FF] font-bold justify-center items-center h-12 w-12 bg-[#E5F5FF] m-0';

  let countContainer =
    'flex justify-center h-20 items-center bg-white justify-around items-center border-2 rounded-md  border-[#85C4FF]';

  return (
    <>
      <div className="w-4/5">
        <div className="">
          <Header title={'Home'} />
        </div>
        <div className="flex p-3">
          <div className="w-1/2">
            <Line
              data={{
                // labels: [
                //   // 'January',
                //   // 'Febuary',
                //   // 'March',
                //   'April',
                //   'May',
                //   'June',
                //   'July',
                //   // 'August',
                //   // 'September',
                //   // 'October',
                //   // 'November',
                //   // 'December',
                // ],
                labels: getGraphLabels(diseaseGraph),
                datasets: [
                  {
                    label: 'Total Diseases',
                    data: getGraphData(diseaseGraph),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 2,
                  },
                  {
                    label: 'Total Symptoms',
                    data: getGraphData(symptomsGraph),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 2,
                  },
                  {
                    label: 'Total Body Parts',
                    data: getGraphData(bodyPartsGraph),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 2,
                    backgroundColor: 'green',
                  },
                ],
              }}
              // width={1200}
              // height={600}
            />
          </div>
          <div className="w-1/2">
            <Bar
              data={{
                labels: [
                  // 'January',
                  // 'Febuary',
                  // 'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  // 'August',
                  // 'September',
                  // 'October',
                  // 'November',
                  // 'December',
                ],
                datasets: [
                  {
                    label: 'Total Blogs',
                    data: [14, 13, 8, 10],
                    backgroundColor: [
                      // 'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      // 'rgba(255, 206, 86, 0.2)',
                      // 'rgba(75, 192, 192, 0.2)',
                      // 'rgba(153, 102, 255, 0.2)',
                      // 'rgba(255, 159, 64, 0.2)',
                    ],
                    // borderColor: [
                    //   'rgba(255, 99, 132, 1)',
                    //   'rgba(54, 162, 235, 1)',
                    //   'rgba(255, 206, 86, 1)',
                    //   'rgba(75, 192, 192, 1)',
                    //   'rgba(153, 102, 255, 1)',
                    //   'rgba(255, 159, 64, 1)',
                    // ],
                    // borderWidth: 2,
                    // backgroundColor: 'green',
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 h-24 my-8 px-4 justify-around">
          <div className={countContainer}>
            <div>
              <p className="font-bold text-lg m-0">Total</p>
              <p className="font-bold text-lg m-0">Body Parts</p>
            </div>
            <p className={countCircle}>{count?.data?.body_part_count}</p>
          </div>
          <div className={countContainer}>
            <div>
              <p className="font-bold text-lg m-0">Total</p>
              <p className="font-bold text-lg m-0">Symptoms</p>
            </div>
            <div className={countCircle}>{count?.data?.symptom_count}</div>
          </div>
          <div className={countContainer}>
            <div>
              <p className="font-bold text-lg m-0">Total</p>
              <p className="font-bold text-lg m-0">Diseases</p>
            </div>
            <p className={countCircle}>{count?.data?.disease_count}</p>
          </div>
          <div className={countContainer}>
            <div>
              <p className="font-bold text-lg m-0">Total</p>
              <p className="font-bold text-lg m-0">Blogs</p>
            </div>
            <p className={countCircle}>{count?.data?.blogs_count}</p>
          </div>
          <div className={countContainer}>
            <div>
              <p className="font-bold text-lg m-0">Total</p>
              <p className="font-bold text-lg m-0">Body Parts(App)</p>
            </div>
            <p className={countCircle}>{count?.data?.linked_bodypart_count}</p>
          </div>
          <div className={countContainer}>
            <div>
              <p className="font-bold text-lg m-0">Total</p>
              <p className="font-bold text-lg m-0">Diseases(App)</p>
            </div>
            <p className={countCircle}>{count?.data?.linked_disease_count}</p>
          </div>
        </div>
        <div className="mt-[150px] mb-12">
          <div className="mx-6 w-[40%]">
            <h1 className="text-xl">Reconfirm Symptoms</h1>
            <Slider
              defaultValue={reconfirmValue}
              value={reconfirmValue}
              onChangeCommitted={handleReconfirmChange}
              getAriaValueText={reconfirmValueText}
              min={0}
              max={1}
              step={0.1}
              // aria-label="Default"
              // valueLabelDisplay="auto"
              aria-label="Custom marks"
              valueLabelDisplay="on"
              // onChange={handleReconfirmChange}
            />
          </div>
          <div className="mx-6 mt-12 w-[40%]">
            <h1 className="text-xl">Disease Result</h1>
            <Slider
              defaultValue={resultValue}
              // aria-label="Always visible"
              aria-label="Custom marks"
              valueLabelDisplay="on"
              // value={resultValue}
              value={resultValue}
              onChangeCommitted={handleDiseaseChange}
              getAriaValueText={resultValueText}
              min={0}
              max={1}
              step={0.1}
              // aria-label="Default"
              // valueLabelDisplay="auto"
              // onChange={handleDiseaseChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
