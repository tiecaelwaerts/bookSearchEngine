import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      username
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;