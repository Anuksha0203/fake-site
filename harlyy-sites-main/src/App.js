import {useEffect, useState} from 'react';
import Header from './components/headers/MainHeader';
import Footer from './components/footers/MainFooter';
import {Outlet} from 'react-router-dom';

import client from './project/client-settings.json';

import {firestore} from './project/Firebase';
import {collection, doc, getDoc, getDocs} from 'firebase/firestore';

function App() {
  const [data, setData] = useState({business: {}, products: {}});

  useEffect(() => {
    const businessId = client.businessId;

    getDoc(doc(firestore, 'businesses', businessId)).then((business) => {
      getDocs(collection(firestore, 'businesses/' + businessId + '/products')).then((productSnapshot) => {
        const products = {};
        productSnapshot.forEach((product) => {
          products[product.ref.id] = product.data();
        });
        setData({...{business: business.data(), products: products}, ...client.data});
      });
    });
  }, []);

  if (data.business) {
    document.querySelector('link[rel~=\'icon\']').href = data.business.imgUrl;
    document.querySelector('title').innerText = data.business.tradingName;
  }

  return (
    <>
      <Header data={data} />
      {
        data.business && Object.keys(data.business).length !== 0 ?
        <Outlet context={data} /> : ''
      }
      <Footer data={data} />
    </>
  );
}

export default App;
