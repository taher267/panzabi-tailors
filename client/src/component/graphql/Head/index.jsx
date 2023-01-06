import { Helmet } from 'react-helmet';

export default function Head({ title }) {
  return <Helmet title={title || 'Tailor-panzabi'} />;
}
