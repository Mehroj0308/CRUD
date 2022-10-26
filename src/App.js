import './App.css';
import Add from './componets/Add';
import Regester from './componets/Regester';

function App() {
  return (
    <div className="App">
      <Add/>
      <Regester/>
    </div>
  );
}

export default App;


// import React from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//     const showToastMessage = () => {
//         toast.error('ERROR Notification !', {
          
//         });
//     };
//     return (
//         <div>
//             <button onClick={showToastMessage}>Notify</button>
//         </div>
//     );
// }
// export default App;
