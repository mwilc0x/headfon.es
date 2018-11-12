import { Client } from 'urql';

const client = new Client({
  fetchOptions: { credentials: 'same-origin' },
  url: `${window.location.origin}/graphql`,
});

export {
    client
};
