import {useOutletContext} from 'react-router-dom';
import PrimaryAbout from '../components/about_tiles/PrimaryAbout';

function About() {
  const {business} = useOutletContext();
  const tradingName = business ? business.tradingName : '';

  return (
    <>
      <PrimaryAbout tradingName={tradingName} />
    </>
  );
}

export default About;

