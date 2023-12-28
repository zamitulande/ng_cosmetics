import { Home } from '@mui/icons-material'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotFount from '../helpers/components/NotFount'
import FunnelFilter from '../pages/funnels/FunnelFilter'

const Routes = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "product/:funnel/:product",
            element: <FunnelFilter/>
        },
        {
            path: "*",
            element: <NotFount/>
        }


    ])
  return <RouterProvider router={router}/>;
}

export default Routes