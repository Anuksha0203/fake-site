import {useEffect, useState} from 'react';
import {useNavigate, useOutletContext} from 'react-router-dom';
import {Col, Row, Spinner} from 'reactstrap';
import ProductInfo from '../components/product_tiles/ProductInfo';
import ProductImgs from '../components/product_tiles/ProductImgs';

import EditorJS from '@editorjs/editorjs';

const Header = require('@editorjs/header');
const List = require('@editorjs/list');
const SimpleImage = require('@editorjs/simple-image');
const Table = require('@editorjs/table');

let oldProductId = '';

/**
 * Product page
 * @param {*} props
 * @return {JSX.Element} Product page
 */
function Product(props) {
  // Navigation
  const navigate = useNavigate();

  // Get productId
  const url = window.location.href.split('/');
  const productId = url[url.length - 1];

  // Get all the products from the outlet
  const {products} = useOutletContext();

  // Get product to use on page
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    if (!products || currentProduct) {
      oldProductId = '';
    }
  });

  useEffect(() => {
    if (products && !currentProduct && oldProductId !== productId) {
      if (!products[productId]) {
        navigate('/shops');
      }
      setCurrentProduct(products[productId]);
      oldProductId = productId;

      new EditorJS({
        /**
               * Id of Element that should contain the Editor
               */
        holderId: 'description',

        /**
               * Previously saved data that should be rendered
               */
        data: products[productId].description,
        readOnly: true,

        /**
               * Tools list
               */
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,

            config: {
              placeholder: 'Header',
              defaultLevel: 4,
            },
            shortcut: 'CMD+SHIFT+H',
          },

          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered',
            },
          },
          image: SimpleImage,

          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
        },
      });
    }
  });

  return (
    <>

      <div className="px-3 px-md-4 ">
        {
              !currentProduct ?
              <Spinner animation="border" role="status" style={{position: 'relative', left: 'calc(50% - 1rem)'}} /> :
              <>
                <Row className='py-3 py-md-4 p-md-5'>

                  <div className="d-none d-md-block col-8">

                    <ProductImgs images={currentProduct.images} />

                  </div>

                  <div className="col-12 col-md-4">

                    <ProductInfo id={productId} product={currentProduct} btns={true} />

                  </div>

                  <div className="d-block d-md-none mt-3 col-12">

                    <ProductImgs images={currentProduct.images} />

                  </div>

                </Row>

              </>
        }

        <Row className="mt-4 px-5">

          <Col className="col-md-6" id="description">


          </Col>

        </Row>
      </div>
    </>
  );
}
export default Product;

