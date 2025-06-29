/* eslint-disable react/prop-types */
// Component Imports
import AdminLayout from "./Layout/AdminLayout";
import AuthLayout from "./Layout/AuthLayout";
import AppRoutes from "./Routes";
const NotFound = lazyLoad(() => import("./NotFound/NotFound"));
import ErrorComponent from "./Common/ErrorComponent/ErrorComponent";
// Library Imports
import { useSelector } from "react-redux";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import useTokenValidation from "./hooks/useTokenValidation";
import { lazyLoad } from "./lazyLoad";

// ErrorBoundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

const App = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Theme Variables from redux
  const menuTitle = useSelector((state) => state.menu.menuTitle);
  const themeColor = useSelector((state) => state.theme.themeColor);
  const layout = useSelector((state) => state.layout.layout);
  const borderStroke = useSelector((state) => state.stroke.borderStroke);
  const borderLayout = useSelector((state) => state.borderLayout.borderLayout);
  const boxLayout = useSelector((state) => state.boxLayout.boxLayout);
  const monochrome = useSelector((state) => state.monochrome.monochrome);
  const borderRadius = useSelector((state) => state.borderRadius.borderRadius);
  const iconColor = useSelector((state) => state.iconColor.iconColor);
  const themeMode = useSelector((state) => state.themeMode.themeMode);

  const authTitleMapping = {
    "/signin": "Signin",
    "/forgot-password": "SendToken",
    "/resetPassword": "ResetPassword",
    "/user-activation": "UserActivation",
    "/404": "NoPage",
  };

  const adminTitleMapping = {
    "/vendor/index": "Index",
    "/vendor/payments": "MyWallet",
    "/vendor/app/orders": "Invoices",
    "/vendor/app/orders/:orderId": "OrderDetails",
    "/vendor/app/invoice": "InvoiceDetails",
    "/vendor/users": "ClientsList",
    "/vendor/user/my-profile": "MyProfile",
    "/vendor/user/add-user": "Adduser",
    "/vendor/user/edit-user": "EditUser",
    "/vendor/user/change-password": "ChangePassword",
    "/vendor/agents": "Agents",
    "/vendor/agents/add-agent": "AddAgent",
    "/vendor/agents/edit-agent/:agentId": "EditAgent",
    "/vendor/coupon-codes": "CouponCodeManagement",
    "/vendor/commissions": "Commissions",
    "/vendor/contacts": "Contacts",
    "/vendor/templates": "Templates",
    "/vendor/addTemplate": "AddTemplate",
    "/vendor/editTemplate": "EditTemplate",
  };

  // API URL
  const isAuthRoute = authTitleMapping[pathname];
  const isAdminRoute = Object.keys(adminTitleMapping).some((route) =>
    pathname.startsWith(route)
  );

  const { isValidationComplete, authError } = useTokenValidation();

  if (!isValidationComplete) {
    console.log("Validating session...");
  }

  if (authError) {
    console.log("Session expired or invalid.");
    localStorage.removeItem("jwtToken");
    window.location.href = "/signin";
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/vendor/index" replace />} />

        {isAuthRoute && (
          <Route element={<AuthLayout />}>
            <Route path={pathname} element={<AppRoutes />} />
          </Route>
        )}

        {isAdminRoute && (
          <Route
            element={
              <AdminLayout
                menuTitle={menuTitle}
                themeColor={themeColor}
                layout={layout}
                borderStroke={borderStroke}
                borderLayout={borderLayout}
                boxLayout={boxLayout}
                monochrome={monochrome}
                borderRadius={borderRadius}
                iconColor={iconColor}
                themeMode={themeMode}
              />
            }
          >
            <Route path="/*" element={<AppRoutes />} />
          </Route>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
