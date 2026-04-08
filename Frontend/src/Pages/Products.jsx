import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext'
import BredCrums from '../Components/BredCrums';
import ProductDisplay from '../Components/ProductDisplay';
import { useParams } from 'react-router-dom';

const Products = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
const product = all_product.find((e) => e.id === Number(productId))
  return (
    <div>
      <BredCrums product={product} />
      <ProductDisplay product={product}/>
    </div>
  )
}

export default Products
