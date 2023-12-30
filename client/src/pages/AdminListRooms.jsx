import React from 'react'
import AdminNavbar from "../components/AdminNavbar"
import AdminDatatableRooms from "../components/AdminDatatableRooms"
import { roomColumns } from '../datatablesource';

export default function AdminListRooms({columns}) {
    return (
        <div>
        <AdminNavbar />.
      <div className="adminDatatableContainer">
          <AdminDatatableRooms columns={roomColumns} />
          </div>
    </div>
      );
}
