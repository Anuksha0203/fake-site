import PropTypes from 'prop-types';
import nigel from '../../assets/imgs/nigel.jpg';

function PrimaryAbout(props) {
  return (
    <>

      <div className="row text-bg-light p-3 p-md-5 m-md-3 overflow-hidden text-center">

        <div className="col-lg-7 p-lg-5 mx-auto my-5" > {/* my-3 py-3 mx-auto*/}
          <h1 className="display-4 fw-normal">About Us</h1>
          <p className="lead fw-normal">
              About the business here
          </p>
        </div>

        <div className='col-lg-5 rounded p-4'>
          <img width='80%' src={nigel}/>
        </div>

      </div>
    </>
  );
}

PrimaryAbout.propTypes = {
  tradingName: PropTypes.string.isRequired,
};

export default PrimaryAbout;

