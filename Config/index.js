const env = process.env.NEXT_PUBLIC_ENVIRONMENT;

let defaults = {
  url: 'https://sadhna-backend.herokuapp.com/api',
  imageUrl: 'https://sadhna-backend.herokuapp.com/images',

};

if (env == 'Dev') {
  defaults = {
    url: 'https://devapi.maaambeyeducation.in/api',
    imageUrl: 'https://devapi.maaambeyeducation.in/images',
  };
}

if (env == 'Prod') {
  defaults = {
    url: 'https://api.maaambeyeducation.in/api',
    imageUrl: 'https://api.maaambeyeducation.in/images',
  };
}




export default defaults;
