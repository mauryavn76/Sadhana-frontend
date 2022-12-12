export const getToken = (context) => {
  const cookie = context.req;
  let token = cookie.cookies['access-token'];
  return token ? token : ' ';
};
