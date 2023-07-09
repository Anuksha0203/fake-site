import {useOutletContext} from 'react-router-dom';
import PrimaryTile from '../components/display_tiles/PrimaryTile';
import SecondaryTile from '../components/display_tiles/SecondaryTile';
import PrimaryFeaturedProducts from '../components/display_tiles/PrimaryFeaturedProducts';
import PrimaryContact from '../components/contact_tiles/PrimaryContact';

function Home() {
  const {business, products, socials} = useOutletContext();
  const tradingName = business ? business.tradingName : '';

  return (
    <>
      <PrimaryTile tradingName={tradingName || ''}/>
      <SecondaryTile/>
      <PrimaryFeaturedProducts products={products}/>
      <PrimaryContact socials={socials} />
    </>
  );
}

export default Home;
