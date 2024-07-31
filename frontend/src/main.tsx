import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import Loading from './components/Loading'
import ProtectedRoute from './ProtectedRoute'
import store from './store'
import './index.css'

// eslint-disable-next-line react-refresh/only-export-components
const Root = lazy(() => import('./pages/Root'));
// eslint-disable-next-line react-refresh/only-export-components
const Home = lazy(() => import('./pages/Home'));
// eslint-disable-next-line react-refresh/only-export-components
const Login = lazy(() => import('./pages/Login'));
// eslint-disable-next-line react-refresh/only-export-components
const Register = lazy(() => import('./pages/Register'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Root />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute element={<Home />} />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
    ],
  }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
