import Header from "./components/header";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
