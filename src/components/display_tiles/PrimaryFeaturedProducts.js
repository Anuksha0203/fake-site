import PrimaryFilteredProducts from './PrimaryFilteredProducts';
import PropTypes from 'prop-types';
function PrimaryFeaturedProducts({products}) {
  if (!products) {
    return <h2 className='display-4 fw-normal'> Featured Products </h2>;
  }
  const title = 'Featured Products';
  const featuredProducts = Object.values(products).filter(
      (product) => product.Featured === true,
  );
  return (
    <>
      <PrimaryFilteredProducts products={featuredProducts} title={title}/>
    </>
  );
};
PrimaryFeaturedProducts.propTypes = {
  products: PropTypes.string.isRequired, // Added the missing prop type validation
};
export default PrimaryFeaturedProducts;
