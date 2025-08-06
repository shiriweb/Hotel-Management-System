import React from 'react'
import { useAuth } from "../../context/UserContext"

const UserDetails = () => {
  const [auth] = useAuth();
  const user = {
    name: auth.user?.name,
    email: auth.user?.email,
  }

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        User Details
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded">
          <span className="text-sm font-medium text-gray-600">Name</span>
          <span className="text-sm text-gray-900">{user.name}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded">
          <span className="text-sm font-medium text-gray-600">Email</span>
          <span className="text-sm text-gray-900">{user.email}</span>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
