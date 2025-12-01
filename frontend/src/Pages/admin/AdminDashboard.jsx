import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="mt-6">
        <Link
          to="/admin/manage-courses"
          className="px-6 py-3 bg-blue-600 text-white rounded"
        >
          Manage Courses
        </Link>
      </div>
    </div>
  );
}
