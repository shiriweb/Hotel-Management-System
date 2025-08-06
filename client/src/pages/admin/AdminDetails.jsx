import React from 'react'
import { useAuth } from "../../context/UserContext"

const AdminDetails = () => {
  const [auth] = useAuth();
  const users = {
    name: auth.user?.name,
    email: auth.user?.email,
  }

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Admin Details
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded">
          <span className="text-sm font-medium text-gray-600">Name</span>
          <span className="text-sm text-gray-900">{users.name}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded">
          <span className="text-sm font-medium text-gray-600">Email</span>
          <span className="text-sm text-gray-900">{users.email}</span>
        </div>
      </div>
    </div>
  )
}

export default AdminDetails
