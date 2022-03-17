import { gql } from '@apollo/client';

export const GET_COUNTRIES_BY_CONTINENT = (continent) => gql`
  query {
    countries(filter: { continent: { eq: "${continent}" }}) {
      name
      code
      continent {
        name
      }
    }
  }
`;

export const GET_COUNTRIES = () => gql`
  query {
    countries {
      name
      code
      continent {
        name
      }
    }
  }
`;