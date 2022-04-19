import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./Component/Header";
import CartPage from "./Pages/CartPage";
import ProductPage from "./Pages/ProductPage";
import UpdateProduct from "./Pages/CreateUpdateProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/update-product&:id" element={<UpdateProduct />} />
          <Route path="/create-product" element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
