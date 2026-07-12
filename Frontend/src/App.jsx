import Navbar from "./Components/Navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Shop from "./Pages/Shop"
import ShopCategory from "./Pages/ShopCategory"
import Products from "./Pages/Products"
import Carts from "./Pages/Carts"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Footer from "./Components/Footer/Footer"
import men_banner from "./assets/men-banner1.jfif"
import women_banner from "./assets/women-banner1.jfif"
import kid_banner from "./assets/kid-banner1.jfif"
import NewCollection from "./Components/NewCollection/NewCollection"
import Popular from "./Components/Popular/Popular"
import AutoLogout from "./Components/AutoLogout"
import Checkout from "./Pages/CheckOut"
import My_Orders from "./Pages/My_Orders"


function App() {

  
  return (
    <div>
    <BrowserRouter>
    <AutoLogout/>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Shop/>} />
    <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
    <Route path="/womens" element={<ShopCategory banner={women_banner} category="women"/>} />
    <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kids"/>} />
    <Route path="/product" element={<Products/>} />
    <Route path="/product/:productId" element={<Products/>} />
    <Route path="/new_collection" element={<NewCollection/>} />
    <Route path="/popular" element={<Popular/>} />
    <Route path="/cart" element={<Carts/>} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/my_orders" element={<My_Orders/>} />

    </Routes>
    
      
    <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default App
