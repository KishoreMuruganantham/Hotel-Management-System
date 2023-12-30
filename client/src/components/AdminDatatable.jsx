import "./admindatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDatatable = ({ columns }) => {
  const location = useLocation();
const path = 'Hotels';
const [list, setList] = useState([]);
const { data, loading, error } = useFetch('/hotels');

useEffect(() => {
  setList(data);
}, [data]);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/hotels/${id}`);
      setList(list.filter((item) => item.id !== id));
      toast.success('Hotel deleted Successfully');
    } catch (error) {
      toast.error('Failed to delete hotel');
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`hotels/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="admindatatable">
      <div className="datatableTitle">
        {loading ? "Loading..." : path}
        <Link to={`hotels/new`} className="link">
          Add New
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row.id}
        />
      )}
    </div>
  );
};

export default AdminDatatable;