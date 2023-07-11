import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import anna from '../../assets/imgs/anna.jpg';

function PrimaryTile(props) {
  return (
    <>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light" style={{
        backgroundImage: `url(${anna})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50%',
      }}>
        <div className="col-md-8 p-lg-5 mx-auto my-5">
          <h1 className="display-4 fw-normal">{props.tradingName}</h1>
          <p className="lead text-dark">Family perfumers since 1927</p>
          <Link style={{boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'}} className="btn btn-secondary" to="/shop">Our Shop</Link>
        </div>
      </div>
    </>
  );
}

PrimaryTile.propTypes = {
  tradingName: PropTypes.string.isRequired,
};
export default PrimaryTile;

