import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routesConfig from './routes/routes';
import { Toaster } from './components/ui/toaster';

const router = createBrowserRouter(routesConfig);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App;
