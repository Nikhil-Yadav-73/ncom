import { createClient } from 'contentful';

const contentfulClient = createClient({
  space: 'y0d4dvqdsk30',
  accessToken: 'V9Fyj1ddEIvD0Lrh3bkLYIytILnKqn1FQ0IiJ9VJkPo',
});

console.log('Contentful Client:', contentfulClient);

export default contentfulClient;