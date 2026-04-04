import Navbar from "./Components/Navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Shop from "./Pages/Shop"
import ShopCategory from "./Pages/ShopCategory"
import Products from "./Pages/Products"
import Carts from "./Pages/Carts"
import Login from "./Pages/Login"
function App() {

  return (
    <div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Shop/>} />
    <Route path="/mens" element={<ShopCategory category="mens" />} />
    <Route path="/womens" element={<ShopCategory category="womens"/>} />
    <Route path="/kids" element={<ShopCategory category="kids"/>} />
    <Route path="/product" element={<Products/>} />
    <Route path=":productId" element={<Products/>} />
    <Route path="/cart" element={<Carts/>} />
    <Route path="login" element={<Login/>} />

    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
