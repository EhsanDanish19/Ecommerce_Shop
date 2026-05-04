import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BredCrums from '../Components/BredCrums'
import ProductDisplay from '../Components/ProductDisplay'
import Descriptions from '../Components/Descriptions'
import RelatedProduct from '../Components/RelatedProduct'
import { BASE_URL } from '../api'
const Products = () => {

  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/product/${productId}/`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        setRelated(data.related);
      })
      .catch(err => console.error("Error:", err));

  }, [productId])
    if (!product) return <p>Loading...</p>


  return (
    <div>
    
       
        
          <BredCrums product={product} />
          <ProductDisplay key={product.id} product={product} />
          <Descriptions />
          <RelatedProduct products={related} />
        
      
    </div>
  )
}

export default Products