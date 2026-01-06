import './assets/styles/globals.css'
import './assets/styles/index.css'
import SignUp from './pages/Authentication/SignUp'
import Login from './pages/Authentication/Login'
import LandingPage from './pages/LandingPage/LandingPage'
import { Routes, Route } from "react-router-dom";
import Store from './pages/CustomerSide/Store'
import Locations from './pages/CustomerSide/Locations'
import Contacts from './pages/CustomerSide/Contacts'
import About from './pages/CustomerSide/About'
import ProductDetails from './pages/CustomerSide/ProductDetails'
import ShoppingCart from './pages/CustomerSide/ShoppingCart'
import Checkout from './pages/CustomerSide/Checkout'
import MyCheckout from './pages/CustomerSide/MyCheckout'

import SellerLayout from "./components/layout/SellerLayout";
import Dashboard from './pages/SellerSide/dashboard'
import Products from './pages/SellerSide/products'
import Orders from './pages/SellerSide/orders'
import SellerLocations from './pages/SellerSide/SellerLocations'
import Inventory from './pages/SellerSide/inventory'
import Messages from './pages/SellerSide/messages'

function App() {
  return (
    <Routes>
      {/* ---------- CUSTOMER SIDE ---------- */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/store" element={<Store />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/my-checkout" element={<MyCheckout />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/about" element={<About />} />

      {/* ---------- SELLER SIDE ---------- */}
      <Route path="/seller" element={<SellerLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="locations" element={<SellerLocations />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="messages" element={<Messages />} />

      </Route>
    </Routes>
  );
}

export default App;