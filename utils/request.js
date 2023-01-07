import { GraphQLClient } from 'graphql-request';
export function request({ query, variables, includeDrafts, excludeInvalid }) {
  //   console.log('00000000000');
  const headers = {
    authorization: `Bearer 6865901bb65581a7087a322831653a`,
  };
  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'true';
  }
  if (excludeInvalid) {
    headers['X-Exclude-Invalid'] = 'true';
  }
  const client = new GraphQLClient('https://graphql.datocms.com', { headers });
  return client.request(query, variables);
}
