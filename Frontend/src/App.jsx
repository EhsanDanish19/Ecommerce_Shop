import Navbar from "./Components/Navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Shop from "./Pages/Shop"
import ShopCategory from "./Pages/ShopCategory"
import Products from "./Pages/Products"
import Carts from "./Pages/Carts"
import Login from "./Pages/Login"
import Footer from "./Components/Footer/Footer"
import men_banner from "./assets/men-banner1.jfif"
import women_banner from "./assets/women-banner1.jfif"
import kid_banner from "./assets/kid-banner1.jfif"

function App() {

  return (
    <div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Shop/>} />
    <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
    <Route path="/womens" element={<ShopCategory banner={women_banner} category="women"/>} />
    <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid"/>} />
    <Route path="/product" element={<Products/>} />
    <Route path=":productId" element={<Products/>} />
    <Route path="/cart" element={<Carts/>} />
    <Route path="login" element={<Login/>} />

    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default App
