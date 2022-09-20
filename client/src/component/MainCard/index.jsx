import { useQuery, gql } from '@apollo/client';
export default function MainCard() {
  const cardsData = useQuery(gql`
    {
      mainCards {
        image
        title
      }
    }
  `);
  return <>MainCards</>;
}
