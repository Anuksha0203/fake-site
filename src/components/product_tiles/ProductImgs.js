import {useRef} from 'react';
import PropTypes from 'prop-types';

function ProductImgs(props) {
  const imageRef=useRef();
  let currentIndex = 0;

  return (
    <div>
      <div style={{float: 'left'}}>
        <button className="me-2 btn btn-sm btn-outline-secondary w-100 mt-2" onClick={prevImage}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
          </svg>
        </button>
      </div>
      <div style={{float: 'left'}}>
        <div>
          <img
            ref={imageRef}
            src={ props.images[currentIndex] }
            width="300"
            style={{margin: '2px'}}
            alt=""
            role="button"
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {props.images.map((src, index) => (
            <img
              src={ src }
              onClick={() => changeImage(src, index)}
              width="75"
              key={ index }
              style={{margin: '2px'}}
              alt=""
              role="button"
            />
          ))}
        </div>
      </div>
      <div style={{float: 'left'}}><button className="me-2 btn btn-sm btn-outline-secondary w-100 mt-2" onClick={nextImage}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg></button></div>
    </div>
  );

  function changeImage(src, index) {
    imageRef.current.src = src.toString();
    imageRef.current.index = index;
    currentIndex = index;
    return src;
  }

  function nextImage() {
      currentIndex < props.images.length - 1 ? currentIndex++ : currentIndex = 0;
      imageRef.current.src = props.images[currentIndex];
  }

  function prevImage() {
      currentIndex > 0 ? currentIndex-- : currentIndex = props.images.length - 1;
      imageRef.current.src = props.images[currentIndex];
  }
}

ProductImgs.propTypes = {
  images: PropTypes.array.isRequired,
};
export default ProductImgs;
