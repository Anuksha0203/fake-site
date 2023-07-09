import {useEffect, useState} from 'react';
import {useOutletContext} from 'react-router-dom';
import {
  InputGroup,
  Input,
  Button,
  Collapse,
  FormGroup,
  Label,

} from 'reactstrap';
import Product from '../components/product_tiles/MainProduct';
/**
 * This Shop function is used to display the products in the shop page
 * @return {JSX.Element} Shop Page
 */
function Shop() {
  const [shopProducts, setShopProducts] = useState({});
  const [filters, setFilters] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [openFilters, setOpenFilters] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [selectedFilters, setSelectedFilters] = useState({});

  function getFilterUI(uiFilters) {
    function getSelectionFilters(filter, field) {
      return filter.map((prop, key) => {
        return (

          <FormGroup
            key={key}
            check
          >
            <Input type="checkbox" value={selectedFilters[field][prop]} onChange={(e) => {
              selectedFilters[field][prop] = e.target.checked; setFilters(getFilterUI(uiFilters));
            }} />
            <Label check>
              {prop}
            </Label>
          </FormGroup>

        );
      });
    }

    return Object.keys(uiFilters).map((prop, key) => {
      return (
        <div key={key} className="mt-4">
          <div className="d-flex align-items-center">
            <Button className="p-1 pt-0 m-0 me-2" color="primary" size="sm" onClick={() => {
              openFilters[prop] = !openFilters[prop]; setFilters(getFilterUI(uiFilters));
            }} style={{marginBottom: '1rem'}}>
              {
                !openFilters[prop] ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="12">
                      <path fill="white" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="12">
                      <path fill="white" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                    </svg>
              }
            </Button>
            {prop}
          </div>
          <Collapse className="mt-3 ps-4" isOpen={openFilters[prop]}>

            {
              getSelectionFilters(uiFilters[prop], prop)
            }

          </Collapse>
        </div>
      );
    });
  }

  function getProductTiles() {
    if (shopProducts ===undefined) return null;

    return Object.keys(shopProducts).map((prop, key) => {
      // Filtering

      // Search Filter
      let catIncludes = false;
      for (const filter in shopProducts[prop].specifications) {
        if (shopProducts[prop].specifications[filter].toLowerCase().includes(textSearch.toLowerCase())) {
          catIncludes = true;
          break;
        }

        if (catIncludes) break;
      }
      if (textSearch !=='' && !shopProducts[prop].name.toLowerCase().includes(textSearch.toLowerCase()) && !catIncludes) {
        return null;
      }

      // Price Filter
      if (priceMin !=='' && priceMax !=='' && priceMin <= priceMax && (shopProducts[prop].price.value > parseFloat(priceMax)*100 || shopProducts[prop].price.value < parseFloat(priceMin)*100)) {
        return null;
      }

      // Category Filters
      let render = true;
      let found = false;
      for (const filter in selectedFilters) {
        for (const value in selectedFilters[filter]) {
          if (selectedFilters[filter][value]) {
            render = false;
            if (shopProducts[prop].specifications[filter] === value) {
              render = true;
              found = true;
              break;
            }
          }
        }

        if (found) break;
      }

      if (!render) return null;

      return (
        <Product key={key} className='me-sm-3 mb-3' product={shopProducts[prop]} id={prop} />
      );
    });
  }

  function getCurrencySymbol(code) {
    if (code === 'GB') {
      return '£';
    } else if (code === 'PK') {
      return 'Rs ';
    } else if (code === 'CA' || code === 'US') {
      return '$';
    } else {
      return '€';
    }
  }

  const {business, products} = useOutletContext();
  useEffect(() => {
    if (JSON.stringify(products) !==JSON.stringify(shopProducts)) {
      setShopProducts(products);

      const newFilters = {};
      for (const id in products) {
        for (const filter in products[id].specifications) {
          if (newFilters[filter] ===undefined) {
            newFilters[filter] = [];
          }

          newFilters[filter].push(products[id].specifications[filter]);
        }
      }

      for (const i in newFilters) {
        newFilters[i] = Array.from(new Set(newFilters[i]));
        openFilters[i] = false;

        selectedFilters[i] = {};
        for (const j in newFilters[i]) {
          selectedFilters[i][newFilters[i][j]] = false;
        }
      }

      setFilters(getFilterUI(newFilters));
    }
  });

  const currencySymbol = getCurrencySymbol(business ? business.country : '');

  // Filters
  const [textSearch, setTextSearch] = useState('');

  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();

  return (
    <>
      <div className="px-4">
        <h2 className="mt-4 px-3">{business ? business.tradingName : ''} Shop</h2>

        <div className="row mt-4">

          <div className="col-12 col-md-3 pt-3">

            <div className="p-3 rounded" style={{backgroundColor: 'rgb(235, 235, 235)'}}>

              <p style={{fontSize: '27px'}} className="mb-1">Filter</p>

              <Input placeholder="Search" type="text" value={textSearch} onChange={(e) => {
                setTextSearch(e.target.value);
              }} />

              <p style={{fontSize: '17px'}} className="mt-3 mb-1">Price Range <small style={{fontSize: '12px'}}>(Min - Max)</small></p>

              <div className="row">

                <div className="col">

                  <InputGroup className=''>
                    <Button className='p-2' disabled>{currencySymbol}</Button>
                    <Input className='p-1' placeholder="Min" type="number" value={priceMin} onChange={(e) => {
                      setPriceMin(e.target.value);
                    }} />
                  </InputGroup>

                </div>
                <div className="col">

                  <InputGroup>
                    <Button className='p-2' disabled>{currencySymbol}</Button>
                    <Input className='p-1' placeholder="Max" type="number" value={priceMax} onChange={(e) => {
                      setPriceMax(e.target.value);
                    }} />
                  </InputGroup>

                </div>

              </div>
              {filters}

            </div>

          </div>
          <div className="col-12 col-md-9">

            <div className="pt-3 text-center">

              {getProductTiles()}

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Shop;
