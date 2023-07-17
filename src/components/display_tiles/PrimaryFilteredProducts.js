import PropTypes from 'prop-types';
import MainProduct from '../product_tiles/MainProduct';
function PrimaryFilteredProducts({products, title}) {
  return (
    <>
      <div className='position-relative overflow-hidden p-3 p-md-5 m-md-3 mt-3 text-center bg-light'>
        <h2 className='display-4 fw-normal mb-5'>{title}</h2>
        <div className='d-md-flex flex-md-equal w-100 my-md-3 ps-md-3 justify-content-center'>
          {products.map((product, index) => (
            <MainProduct key={index} product={product} id={index} />
          ))}
        </div>
      </div>
    </>
  );
}
PrimaryFilteredProducts.propTypes = {
  products: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default PrimaryFilteredProducts;
