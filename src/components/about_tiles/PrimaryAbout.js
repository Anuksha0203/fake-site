import PropTypes from 'prop-types';
import anna from '../../assets/imgs/elina.jpg';


function PrimaryAbout(props) {
  return (
    <>

      <div className="row text-bg-light p-3 p-md-5 m-md-3 overflow-hidden text-center">

        <div className="col-lg-7 p-lg-5 mx-auto my-5" > {/* my-3 py-3 mx-auto*/}
          <h1 className="display-4 fw-normal">About Us</h1>
          <p className="lead fw-normal quote" style={{color: 'gray'}}>
              At Yvette, we believe that scents have the power to create reminiscent memories and evoke a range of emotions. We have been introducing aromatic scents to the world since 1927 with our own finest flowers, spices and wood.
              We actively create new fragrances with a combination of our own ingredients. Our perfumers are all highly skilled and experienced, we understand that creating perfumes is not the same as creating any product, it is an artform requiring
              compassion and a deep understanding of the senses.
            <br/>
            <br/>
              Our collection of perfumes range from exotic, refreshing scents to elegant and rich scents, with a variety to choose from. We provide perfumes for men, women and unisex.
              Yvette aims to provide all its customers with satisfactory fragrances for all occasions, whether it be an evening out, a formal event or even just for casual outings.
          </p>
        </div>

        <div className='col-lg-5 rounded p-4'>
          <img width='80%' src={anna}/>
        </div>

      </div>
    </>
  );
}

PrimaryAbout.propTypes = {
  tradingName: PropTypes.string.isRequired,
};

export default PrimaryAbout;

