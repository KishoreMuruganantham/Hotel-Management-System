import "./admindatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDatatableRooms = ({ columns }) => {
  console.log(columns);
  const location = useLocation();
  const id1 = location.pathname.split("/")[3];
  console.log(id1);
const [list, setList] = useState([]);
const { data, loading, error } = useFetch(`/room/${id1}`);

useEffect(() => {
  setList(data);
}, [data]);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/room/${id}`);
      setList(list.filter((item) => item.id !== id));
      toast.success('Rooms deleted Successfully');
    } catch (error) {
      toast.error('Failed to delete Rooms');
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
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
        {loading ? "Loading..." : "Rooms"}
        <Link to={`new`} className="link">
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

export default AdminDatatableRooms;