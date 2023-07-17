import '../../assets/css/styles.css';

const vinyl = require('../../assets/imgs/vinyl.png');
const shirt = require('../../assets/imgs/shirt.png');
const lavender = require('../../assets/imgs/lavender.png')
const sage = require('../../assets/imgs/sage.png')


function SecondaryTile() {
  return (
    <>
      <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3 justify-content-center">
        <div className="bg-beige mt-3 mt-md-0 me-md-3 pt-3 px-3 pt-md-5 px-lg-5 text-center overflow-hidden w-md-50">
          <div className="my-3 py-3">
            <h2 className="display-5">Lavender</h2>
            <p className="lead">Lavender, Bitter Orange</p>
          </div>
          <a href="/shop/g660vnhISO8H5QDJPSQ1" target="_blank" rel="noreferrer">
            <img src={lavender} width='100%' />
          </a>
        </div>
        <div className="text-bg-teal mt-3 mt-md-0 me-md-3 pt-3 px-3 pt-md-5 px-lg-5 text-center overflow-hidden w-md-50">
          <div className="my-3 py-3">
            <h2 className="display-5 text-white">Sage</h2>
            <p className="lead">Sage, Citrus</p>
          </div>
          <a href="/shop/0ANbLeDsnXG6v3zFGyu8" target="_blank" rel="noreferrer">
            <img src={sage} width='100%' />
          </a>
        </div>
      </div>
    </>
  );
}

export default SecondaryTile;

