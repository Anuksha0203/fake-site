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
          <a href="/shop">
            <button type="button" class="btn btn-outline-dark" >Our Shop</button>
          </a>
        </div>
      </div>
    </>
  );
}

PrimaryTile.propTypes = {
  tradingName: PropTypes.string.isRequired,
};
export default PrimaryTile;

