import React from 'react';
import Banner from '../components/multiusable/banner';
import Cards from './Application/cards';
const blogs = () => {
  const array = [
    {
      image: '/images/image.jpeg',
      title: 'First Blog',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever',
    },
    {
      image: '/images/image.jpeg',
      title: 'Second Blog',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever',
    },
    {
      image: '/images/image.jpeg',
      title: 'Third Blog',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever',
    },
    {
      image: '/images/image.jpeg',
      title: 'Fourth Blog',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever',
    },
    {
      image: '/images/image.jpeg',
      title: 'Fifth Blog',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever',
    },
    {
      image: '/images/image.jpeg',
      title: 'Sixth Blog',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever',
    },
    {
      image: '/images/image.jpeg',
      title: 'abc',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever',
    },
    {
      image: '/images/image.jpeg',
      title: 'abc',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever',
    },
  ];
  return (
    <div className="h-max mx-10">
      <div className="md:flex grid md:justify-between grid-col-2  ">
        <div className="flex flex-1 justify-start md:text-start text-center items-center ">
          <p className=" font-semibold font-sans text-8xl text-sky-800 border-l-4 border-sky-800 pl-7">
            READ OUR <br /> BLOG
          </p>
        </div>
        <div className="md:w-1/2 w-full md:h-1/2 h-full">
          <Banner image="/images/home-images/blog-1.png" />
        </div>
      </div>
      {/* <div className="mt-10">
        <div className="flex justify-center items-center">
          <p className="text-4xl font-bold">All Blogs</p>
        </div>
        <div className="grid h-max grid-cols-4 py-6 px-4 gap-8 justify-center">
          {array.map((x, i) => {
            return (
              <Cards key={i} image={x.image} title={x.title} desc={x.desc} />
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default blogs;
