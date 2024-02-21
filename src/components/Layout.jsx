import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

const Layout = () => {
  const { categoryId, paymentId, courseId, userId } = useParams();

  const dataNoNavbar = [
    "/emailConfirmation",
    "/purchaseConfirmation",
    "/admin-dashboard",
    "/admin-dashboard/course-category",
    "/admin-dashboard/course-category/form-add-course-category",
    "/admin-dashboard/course-category/form-update-course-category/" +
      categoryId,
    "/admin-dashboard/course",
    "/admin-dashboard/course/form-add-course",
    "/admin-dashboard/course/form-add-course/add-schedule/" + courseId,
    "/admin-dashboard/course/form-update-course/" + courseId,
    "/admin-dashboard/payment",
    "/admin-dashboard/payment/form-add-payment",
    "/admin-dashboard/user",
    "/admin-dashboard/user/edit/" + userId,
    "/admin-dashboard/user/add",
    "/admin-dashboard/all-invoice",
  ];
  const dataNoFooter = [
    "/ResetPassword",
    "/register",
    "/purchaseConfirmation",
    "/createPassword",
    "/resetPassword",
    "/login",
    "/emailConfirmation",
    "/checkout",
    "/invoice",
    "/detailInvoice",
    "/myClass",
    "/admin-dashboard/course-category",
    "/admin-dashboard/course-category/form-add-course-category",
    "/admin-dashboard/course-category/form-update-course-category/" +
      categoryId,
    "/admin-dashboard/course",
    "/admin-dashboard/course/form-add-course",
    "/admin-dashboard/course/form-add-course/add-schedule/" + courseId,
    "/admin-dashboard/course/form-update-course/" + courseId,
    "/admin-dashboard/payment",
    "/admin-dashboard/payment/form-add-payment",
    "/admin-dashboard/payment/form-update-payment/" + paymentId,
    "/admin-dashboard/user",
    "/admin-dashboard/user/edit/" + userId,
    "/admin-dashboard/user/add",
    "/admin-dashboard/all-invoice",
  ];
  const { pathname } = useLocation();
  const condtionNavbar = !dataNoNavbar.find((path) => path === pathname);
  const condtionFooter = !dataNoFooter.find((path) => path === pathname);

  return (
    <>
      {condtionNavbar && <Navbar />}

      <Outlet />

      {condtionFooter && <Footer />}
    </>
  );
};

export default Layout;
