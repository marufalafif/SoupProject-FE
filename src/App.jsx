import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import CreatePassword from "./pages/CreatePassword";
import HomePage from "./pages/HomePage";
import ListMenuClass from "./pages/ListMenuClass";
import DetailClass from "./pages/DetailClass";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import DetailInvoice from "./pages/DetailInvoice";
import MyClass from "./pages/MyClass";
import EmailConfirmation from "./pages/EmailConfirmation";
import PurchaseConfirmation from "./pages/PurchaseConfirmation";
import Layout from "./components/Layout";
import CourseCategory from "./components/ComponentDashboard/CourseCategory";
import FormAddCourseCategory from "./components/ComponentDashboard/FormAddCourseCategory";
import FormUpdateCourseCategory from "./components/ComponentDashboard/FormUpdateCourseCategory";
import Course from "./components/ComponentDashboard/Course";
import FormAddCourse from "./components/ComponentDashboard/FormAddCourse";
import PaymentMethod from "./components/ComponentDashboard/PaymentMethod";
import FormAddPayment from "./components/ComponentDashboard/FormAddPayment";
import FormUpdatePayment from "./components/ComponentDashboard/FormUpdatePayment";
import Schedule from "./components/ComponentDashboard/Schedule";
import FormUpdateCourse from "./components/ComponentDashboard/FormUpdateCourse";
import User from "./components/ComponentDashboard/User";
import FormUpdateUser from "./components/ComponentDashboard/FormUpdateUser";
import FormAddUser from "./components/ComponentDashboard/FormAddUser";
import AllInvoice from "./components/ComponentDashboard/AllInvoice";

import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

const App = () => {
  //untuk mencegar tembak url untuk membuka halaman (harus login dan memiliki role dahulu)
  const userData = JSON.parse(localStorage.getItem("user")); // Mengambil data pengguna dari localStorage
  const userRole = userData ? userData.role : null; // Mengambil role pengguna jika data pengguna ada

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            userRole === "guest" || userRole === null ? (
              <HomePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          index
          element={
            userRole === "admin" || userRole === null ? (
              <HomePage />
            ) : (
              <User to="/admin-dashboard/user" />
            )
          }
        />
        <Route index element={<HomePage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/createPassword"} element={<CreatePassword />} />
        <Route path={"/resetPassword"} element={<ResetPassword />} />
        <Route path={"/emailConfirmation"} element={<EmailConfirmation />} />
        <Route
          path={"/purchaseConfirmation"}
          element={<PurchaseConfirmation />}
        />
        <Route path={"/listMenuClass/:id"} element={<ListMenuClass />} />
        <Route path={"/detailClass/:courseId"} element={<DetailClass />} />
        <Route path={"/checkout"} element={<Checkout />} />
        <Route path={"/invoice"} element={<Invoice />} />
        <Route path={"/detailInvoice/:invoice"} element={<DetailInvoice />} />
        <Route path={"/myClass"} element={<MyClass />} />
        <Route path={"/admin-dashboard/user/add"} element={<FormAddUser />} />

        <Route
          path={"/admin-dashboard/user/edit/:userId"}
          element={<FormUpdateUser />}
        />

        <Route path={"/admin-dashboard/user"} element={<User />} />
        <Route
          path={"/admin-dashboard/course-category/form-add-course-category"}
          element={<FormAddCourseCategory />}
        />
        <Route
          path={
            "/admin-dashboard/course-category/form-update-course-category/:categoryId"
          }
          element={<FormUpdateCourseCategory />}
        />
        <Route
          path={"/admin-dashboard/course-category"}
          element={<CourseCategory />}
        />
        <Route
          path={"/admin-dashboard/course/form-add-course"}
          element={<FormAddCourse />}
        />
        <Route
          path={
            "/admin-dashboard/course/form-add-course/add-schedule/:courseId"
          }
          element={<Schedule />}
        />
        <Route path={"/admin-dashboard/course"} element={<Course />} />
        <Route path={"/admin-dashboard/payment"} element={<PaymentMethod />} />
        <Route
          path={"/admin-dashboard/payment/form-add-payment"}
          element={<FormAddPayment />}
        />
        <Route
          path={"/admin-dashboard/payment/form-update-payment/:paymentId"}
          element={<FormUpdatePayment />}
        />
        <Route
          path={"/admin-dashboard/course/form-update-course/:courseId"}
          element={<FormUpdateCourse />}
        />
        <Route path={"/admin-dashboard/all-invoice"} element={<AllInvoice />} />
      </Route>
    </Routes>
  );
};

export default App;
