import AboutUsPage from "../../client/app/pages/AboutUsPage";
import HomePage from "../../client/app/pages/HomePage";
import ProductPage from "../../client/app/pages/ProductPage";
import ProductsPage, { loadData } from "../../client/app/pages/ProductsPage";
export default [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/hakkimizda",
    component: AboutUsPage,
    exact: true,
  },
  {
    loadData,
    path: "/urunler/:slug",
    component: ProductPage,
  },
  {
    loadData,
    path: "/urunler",
    component: ProductsPage,
    exact: true,
  },
];
