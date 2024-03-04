import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import NewUsers from "./pages/Users";
import GlobalStyle from "./styles/GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import BookingDetail from "./features/bookings/BookingDetail";
import CheckIn from "./pages/CheckIn";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import Login from "./pages/Login";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/account", element: <Account /> },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      { path: "/bookings/:bookmarkid", element: <BookingDetail /> },
      { path: "/checkin/:bookmarkid", element: <CheckIn /> },
      { path: "/cabins", element: <Cabins /> },
      { path: "/settings", element: <Settings /> },
      { path: "/newusers", element: <NewUsers /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);
function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <GlobalStyle />
        <RouterProvider router={router} />
        <Toaster position="bottom-center" />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
