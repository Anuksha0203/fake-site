import PropTypes from 'prop-types';
import PrimaryFilteredProducts from './PrimaryFilteredProducts';
function PrimaryNewProducts({products}) {
  if (!products) {
    return <h2 className='display-4 fw-normal'>New Products</h2>;
  }
  // sort the products in ascending order of most recently added to least recently added
  const sortedProducts = Object.values(products).sort(
      (a, b) => new Date(b.Date) - new Date(a.date));
  // from this sorted list, take the top four product objects and store them
  const newProducts = sortedProducts.slice(0, 4);
  const title = 'New Products';
  return (
    <>
      <PrimaryFilteredProducts products={newProducts} title={title}/>
    </>
  );
}
PrimaryNewProducts.propTypes = {
  products: PropTypes.string.isRequired,
};
export default PrimaryNewProducts;
