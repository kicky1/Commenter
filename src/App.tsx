import {RouterProvider } from 'react-router-dom';
import { router } from './utils/routes';


export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
