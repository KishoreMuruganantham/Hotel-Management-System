import "./adminlist.scss"
import AdminNavbar from "../components/AdminNavbar"
import AdminDatatable from "../components/AdminDatatable"

const AdminList = ({columns}) => {
  return (
    <div className="adminlist">
      <AdminSidebar />
      <div className="listContainer">
        <AdminNavbar />
        <div className="datatableContainer">
          <AdminDatatable columns={columns} />
        </div>
      </div>
    </div>
  );
};


export default AdminList