import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import {
  FaChartBar,
  FaEdit,
  FaEllipsisV,
  FaFilter,
  FaPlus,
  FaSave,
  FaSearch,
  FaSpinner,
  FaSync,
  FaTimes,
  FaTrash,
  FaUserAlt,
} from "react-icons/fa";
import { useSearchParams } from "react-router";
import { authLoader } from "../../hooks/useAuthUser";
import Lang from "../../lang/lang";
import { useUser } from "../../provider/userContext";
import { Helper } from "../../utils/helper";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone_number: string;
  photo_id: string;
  address: string;
  date_of_birth: string;
  hotel_name: string;
  created_at: string;
  status: boolean;
}

export default function UserList() {
  const { user } = useUser();
  const { BASE_API } = new Helper();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [stats, setStats] = useState({
    active: 0,
    inactive: 0,
    pending: 0,
    total: 0,
  });

  useEffect(() => {
    authLoader();
  }, [user]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_API}/auth/user-list?page=${page}&perPage=${perPage}&searchText=${searchText}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setUsers(data.user || []);
      setFilteredUsers(data.user || []);
      setTotalCount(data.user.totalCount || 0);

      // Calculate stats
      const active = data.user.filter((u: User) => u.status === true).length;
      const inactive = data.user.filter((u: User) => u.status === false).length;

      setStats({
        active,
        inactive,
        pending: 0,
        total: data.user.length,
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [BASE_API, page, perPage, searchText]);

  useEffect(() => {
    if (user?.id) fetchUsers();
  }, [user, page, perPage, searchText, fetchUsers]);

  useEffect(() => {
    let filteredData = users;

    // Apply status filter
    if (activeFilter !== true) {
      filteredData = filteredData.filter(
        (user) => user.status === activeFilter
      );
    }

    // Apply search filter
    filteredData = filteredData.filter((user) =>
      `${user.first_name} ${user.last_name} ${user.email} ${user.date_of_birth} ${user.phone_number} ${user.gender} ${user.hotel_name}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

    setFilteredUsers(filteredData);
  }, [searchText, users, activeFilter]);

  const handleEditClick = (user: User) => {
    setEditingId(user.id);
    setEditForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
      hotel_name: user.hotel_name,
      gender: user.gender,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;

    try {
      setLoading(true);
      const res = await fetch(`${BASE_API}/auth/update-user/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        toast.success("User updated successfully");
        fetchUsers();
        setEditingId(null);
        setEditForm({});
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (userId: number) => {
    setDeleteUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteUserId) return;

    try {
      setLoading(true);
      const res = await fetch(`${BASE_API}/auth/delete-user/${deleteUserId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setDeleteUserId(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const statusBadge = (status: string) => {
    const statusMap: Record<string, { text: string; class: string }> = {
      active: { text: "Active", class: "bg-green-500/20 text-green-400" },
      inactive: { text: "Inactive", class: "bg-gray-500/20 text-gray-400" },
    };

    const statusInfo = statusMap[status] || {
      text: status,
      class: "bg-gray-500/20 text-gray-400",
    };

    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.class}`}
      >
        {statusInfo.text}
      </span>
    );
  };

  const columns = [
    {
      name: Lang.name,
      selector: (row: User) => row.first_name + " " + row.last_name,
      sortable: true,
      minWidth: "200px",
      cell: (row: User) => (
        <div className="flex items-center">
          <div className="bg-gray-700 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center mr-3">
            <img
              src={
                row?.photo_id
                  ? `${BASE_API}/photos/${row?.photo_id}/small`
                  : "/images/male.png"
              }
              alt="user"
            />
          </div>
          <div>
            <div className="font-semibold text-white">
              {row.first_name} {row.last_name}
            </div>
            <div className="text-xs text-gray-400">ID: {row.id}</div>
          </div>
        </div>
      ),
    },
    {
      name: Lang.email,
      selector: (row: User) => row.email,
      sortable: true,
      minWidth: "220px",
      cell: (row: User) => (
        <div className="text-blue-300 hover:text-blue-200 transition-colors">
          {row.email.toLowerCase()}
        </div>
      ),
    },
    {
      name: Lang.phone,
      selector: (row: User) => row.phone_number,
      sortable: true,
      minWidth: "220px",
      cell: (row: User) => (
        <div className="text-blue-300 hover:text-blue-200 transition-colors">
          {row.phone_number}
        </div>
      ),
    },
    {
      name: Lang.status,
      selector: (row: User) => row.status,
      sortable: true,
      minWidth: "120px",
      cell: (row: User) =>
        statusBadge(row.status === true ? "Active" : "Inactive"),
    },
    {
      name: Lang.hotel_name,
      selector: (row: User) => row.hotel_name || "-",
      minWidth: "160px",
      cell: (row: User) => (
        <div className="text-sm">{row.hotel_name || "-"}</div>
      ),
    },
    {
      name: "Actions",
      minWidth: "120px",
      cell: (row: User) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditClick(row)}
            className="p-2 rounded-lg bg-blue-600/30 hover:bg-blue-500/50 transition-colors group"
            title="Edit"
          >
            <FaEdit className="text-blue-300 group-hover:text-white text-sm" />
          </button>
          <button
            onClick={() => handleDeleteClick(row.id)}
            className="p-2 rounded-lg bg-red-600/30 hover:bg-red-500/50 transition-colors group"
            title="Delete"
          >
            <FaTrash className="text-red-300 group-hover:text-white text-sm" />
          </button>
          <button className="p-2 rounded-lg bg-gray-600/30 hover:bg-gray-500/50 transition-colors group">
            <FaEllipsisV className="text-gray-300 group-hover:text-white text-sm" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  return (
    <div className="box text-white sm:p-2">
      <div className="px-10 mt-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-pink-500 p-3 rounded-xl mr-4">
                <FaUserAlt className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{Lang.user}</h1>
                <p className="text-gray-400 mt-1 text-sm">
                  {Lang.user_list_description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className="px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700/80 transition-colors flex items-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FaFilter className="mr-2 text-blue-400" />
              Filter
            </button>
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full md:w-64 pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-400 transition-all"
                placeholder={Lang.search_placeholder}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <button className="px-4 py-3 sm:px-1 sm:py-1 rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-400 hover:to-pink-400  cursor-pointertransition-all sm:text-sm flex items-center">
              <FaPlus className="mr-2" />
              Add User
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Total Users
                </h3>
                <p className="text-3xl font-bold">{totalCount}</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <FaUserAlt className="text-blue-400 text-xl" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Active Users
                </h3>
                <p className="text-3xl font-bold">{stats.active}</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <FaChartBar className="text-green-400 text-xl" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                style={{ width: `${(stats.active / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Inactive Users
                </h3>
                <p className="text-3xl font-bold">{stats.inactive}</p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <FaChartBar className="text-yellow-400 text-xl" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                style={{ width: `${(stats.inactive / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  Pending Users
                </h3>
                <p className="text-3xl font-bold">{stats.pending}</p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <FaChartBar className="text-purple-400 text-xl" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full"
                style={{ width: `${(stats.pending / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-8 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filter Users</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {["all", "active", "inactive", "pending"].map((status) => (
                    <button
                      key={status}
                      className={`px-3 py-2 rounded-lg text-sm capitalize ${
                        activeFilter === status
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700/50 text-gray-300 hover:bg-gray-600"
                      }`}
                      onClick={() => setActiveFilter(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Creation Date
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="text-gray-500 self-center">to</span>
                  <input
                    type="date"
                    className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Role</label>
                <select className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>All Roles</option>
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Staff</option>
                  <option>User</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                Reset Filters
              </button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
          <div className="px-6 py-4 flex justify-between items-center border-b border-gray-700">
            <h3 className="text-lg font-semibold">User Management</h3>
            <div className="flex gap-3">
              <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600 transition-colors">
                <FaSync />
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-600 transition-colors flex items-center">
                <FaFilter className="mr-2" /> Export
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
              <p className="text-gray-400">Loading user data...</p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredUsers}
              pagination
              paginationServer
              paginationTotalRows={totalCount}
              paginationDefaultPage={page}
              paginationPerPage={perPage}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              onChangePage={setPage}
              onChangeRowsPerPage={setPerPage}
              highlightOnHover
              striped
              theme="dark"
              customStyles={{
                table: {
                  style: {
                    backgroundColor: "transparent",
                  },
                },
                header: {
                  style: {
                    backgroundColor: "rgba(31, 41, 55, 0.5)",
                    borderBottom: "1px solid rgba(55, 65, 81, 0.5)",
                    fontSize: "0.9rem",
                    color: "#9CA3AF",
                    padding: "0 1.5rem",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "rgba(17, 24, 39, 0.8)",
                    backdropFilter: "blur(4px)",
                  },
                },
                headCells: {
                  style: {
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#D1D5DB",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  },
                },
                cells: {
                  style: {
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                  },
                },
                rows: {
                  style: {
                    backgroundColor: "rgba(31, 41, 55, 0.3)",
                    color: "#F3F4F6",
                    "&:hover": {
                      backgroundColor: "rgba(59, 130, 246, 0.15)",
                    },
                  },
                  stripedStyle: {
                    backgroundColor: "rgba(17, 24, 39, 0.3)",
                  },
                },
                pagination: {
                  style: {
                    backgroundColor: "rgba(31, 41, 55, 0.5)",
                    borderTop: "1px solid rgba(55, 65, 81, 0.5)",
                    color: "#9CA3AF",
                    padding: "1.5rem",
                  },
                  pageButtonsStyle: {
                    color: "#9CA3AF",
                    fill: "#9CA3AF",
                    backgroundColor: "transparent",
                    borderRadius: "0.375rem",
                    height: "2.25rem",
                    width: "2.25rem",
                    padding: "0",
                    margin: "0 3px",
                    "&:disabled": {
                      cursor: "not-allowed",
                      opacity: 0.5,
                    },
                    "&:hover:not(:disabled)": {
                      backgroundColor: "rgba(59, 130, 246, 0.2)",
                    },
                  },
                },
              }}
              noDataComponent={
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-full p-6 mb-4">
                    <FaUserAlt className="text-gray-400 text-4xl" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-200 mb-2">
                    {Lang.no_users_found || "No users found"}
                  </h3>
                  <p className="text-gray-500 text-center max-w-md">
                    {Lang.try_different_search ||
                      "Try adjusting your search or filter to find what you're looking for."}
                  </p>
                  <button className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all">
                    Add New User
                  </button>
                </div>
              }
            />
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-md w-full p-6 border border-gray-700 shadow-2xl">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center">
                <div className="bg-red-500/20 p-2 rounded-lg mr-3">
                  <FaTrash className="text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Confirm Deletion
                </h3>
              </div>
            </div>

            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone and will permanently remove all user data.
            </p>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white"
              >
                {Lang.cancle}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all text-white flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaTrash className="mr-2" />
                )}
                {Lang.delete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-2xl w-full p-6 border border-gray-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                Edit User Profile
              </h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  First Name
                </label>
                <input
                  name="first_name"
                  value={editForm.first_name || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Last Name
                </label>
                <input
                  name="last_name"
                  value={editForm.last_name || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Email
                </label>
                <input
                  name="email"
                  value={editForm.email || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Phone
                </label>
                <input
                  name="phone_number"
                  value={editForm.phone_number || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Hotel
                </label>
                <input
                  name="hotel_name"
                  value={editForm.hotel_name || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Address
                </label>
                <input
                  name="address"
                  value={editForm.address || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all text-white"
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaSave className="mr-2" />
                )}
                {Lang.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
