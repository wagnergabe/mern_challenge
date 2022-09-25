import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email 
      bookCount
      savingBooks{
          bookID
          authors
          title
          description 
          image
          link
      }
    }
  }
`;