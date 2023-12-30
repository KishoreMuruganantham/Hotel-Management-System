import AdminNavbar from "../components/AdminNavbar";
import "./adminhome.scss";
import AdminDatatable from "../components/AdminDatatable";
import { hotelColumns } from "../datatablesource";
import toast from "react-hot-toast";

const AdminHome = () => {
  return (
    <div>
      <AdminNavbar />.
      <div className="adminDatatableContainer">
          <AdminDatatable columns={hotelColumns} />
          </div>
    </div>
  );
};

export default AdminHome;
