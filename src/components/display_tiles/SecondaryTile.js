
const vinyl = require('../../assets/imgs/vinyl.png');
const shirt = require('../../assets/imgs/shirt.png');
const lavender = require('../../assets/imgs/lavender.png')
const sage = require('../../assets/imgs/sage.png')

function SecondaryTile() {
  return (
    <>
      <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3 justify-content-center">
        <div className="bg-light mt-3 mt-md-0 me-md-3 pt-3 px-3 pt-md-5 px-lg-5 text-center overflow-hidden w-md-50">
          <div className="my-3 py-3">
            <h2 className="display-5">Primary Product</h2>
            <p className="lead">Product description</p>
          </div>
          <img src={lavender} width='100%' />
        </div>
        <div className="text-bg-dark mt-3 mt-md-0 me-md-3 pt-3 px-3 pt-md-5 px-lg-5 text-center overflow-hidden w-md-50">
          <div className="my-3 py-3">
            <h2 className="display-5 text-white">Secondary Product</h2>
            <p className="lead">Product description</p>
          </div>
          <img src={sage} width='100%' />
        </div>
      </div>
    </>
  );
}

export default SecondaryTile;

