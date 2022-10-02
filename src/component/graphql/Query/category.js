import { gql } from '@apollo/client';

export const CATEGORIES_QRY = gql`
  {
    categories {
      id
      name
      slug
      parent
      description
      display
      image
      menu_order
      count
    }
  }
`;
