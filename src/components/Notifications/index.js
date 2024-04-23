

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Notifications(){
    return(
        <ToastContainer
          position="top-right"
          className="z-50"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          rtl={false}
        />
    )
}