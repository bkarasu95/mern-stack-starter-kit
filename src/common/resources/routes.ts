import AboutUsPage from "../../client/app/pages/AboutUsPage";
import HomePage from "../../client/app/pages/HomePage";
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
    path: "/urunler",
    component: ProductsPage,
    exact: true,
  },
];
