import { gql } from '@apollo/client';

export const GET_CONTINENTS = () => gql`
  query {
    continents {
      name
      code
    }
  }
`;