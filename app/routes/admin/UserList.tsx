import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { FaEdit, FaSave, FaSearch, FaSpinner, FaTimes, FaTrash, FaUserAlt } from "react-icons/fa";
import { useSearchParams } from "react-router";
import { authLoader } from "../../hooks/useAuthUser";
import Lang from "../../lang/lang";
import { useUser } from "../../provider/userContext";
import { Helper } from "../../utils/helper";

// ... meta function remains unchanged ...

interface User {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone_number: string;
  address: string;
  created_at: string;
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
    const filteredData = users.filter(user => 
      `${user.first_name} ${user.last_name} ${user.email} ${user.date_of_birth} ${user.phone_number} ${user.gender} ${user.hotel_name}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFilteredUsers(filteredData);
  }, [searchText, users]);

  const handleEditClick = (user: User) => {
    setEditingId(user.id);
    setEditForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
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
    setEditForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const columns = [
    {
      name: Lang.name,
      selector: (row: User) => (row.first_name+' '+ row.last_name),
      sortable: true,
      cell: (row: User) => (
        editingId === row.id ? (
          <input
            name="first_name"
            value={editForm.first_name && row.last_name || ""}
            onChange={handleInputChange}
            className="w-full px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white"
          />
        ) : (
          <div className="font-medium text-white">{row.first_name}{' '}{row.last_name}</div>
        )
      ),
    },
    {
      name: Lang.email,
      selector: (row: User) => row.email,
      sortable: true,
      cell: (row: User) => (
        editingId === row.id ? (
          <input
            name="email"
            value={editForm.email || ""}
            onChange={handleInputChange}
            className="w-full px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white"
          />
        ) : (
          <div className="text-blue-300 hover:text-blue-200 transition-colors">
            {row.email.toLowerCase()}
          </div>
        )
      ),
    },
    {
      name: Lang.phone,
      selector: (row: User) => row.phone_number,
      sortable: true,
      cell: (row: User) => (
        editingId === row.id ? (
          <input
            name="email"
            value={editForm.phone_number || ""}
            onChange={handleInputChange}
            className="w-full px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white"
          />
        ) : (
          <div className="text-blue-300 hover:text-blue-200 transition-colors">
            {row.phone_number}
          </div>
        )
      ),
    },
    {
      name: Lang.gender,
      selector: (row: User) => row.gender || "-",
      minWidth: "150px",
      cell: (row: User) => (
        editingId === row.id ? (
          <input
            name="phone_number"
            value={editForm.gender || ""}
            onChange={handleInputChange}
            className="w-full px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white"
          />
        ) : (
          row.gender || "-"
        )
      ),
    },
    {
      name: Lang.hotel_name,
      selector: (row: User) => row.hotel_name || "-",
      minWidth: "150px",
      cell: (row: User) => (
        editingId === row.id ? (
          <input
            name="hotel_name"
            value={editForm.phone_number || ""}
            onChange={handleInputChange}
            className="w-full px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white"
          />
        ) : (
          row.hotel_name || "-"
        )
      ),
    },
    {
      name: Lang.address,
      selector: (row: User) => row.address || "-",
      minWidth: "200px",
      cell: (row: User) => (
        editingId === row.id ? (
          <input
            name="address"
            value={editForm.address || ""}
            onChange={handleInputChange}
            className="w-full px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white"
          />
        ) : (
          row.address || "-"
        )
      ),
    },
    {
      name: Lang.create_now,
      selector: (row: User) => new Date(row.date_of_birth).toLocaleString(),
      sortable: true,
      cell: (row: User) => (
        <div className="text-sm text-gray-300">
          {new Date(row.date_of_birth).toLocaleDateString()}
          <br />
          <span className="text-xs">
            {new Date(row.date_of_birth).toLocaleTimeString()}
          </span>
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row: User) => (
        <div className="flex space-x-2">
          {editingId === row.id ? (
            <>
              <button
                onClick={handleSaveEdit}
                className="p-1.5 rounded-full bg-green-600 hover:bg-green-500 transition-colors"
                title="Save"
              >
                <FaSave className="text-white text-sm" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-1.5 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors"
                title="Cancel"
              >
                <FaTimes className="text-white text-sm" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleEditClick(row)}
                className="p-1.5 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors"
                title="Edit"
              >
                <FaEdit className="text-white text-sm" />
              </button>
              <button
                onClick={() => handleDeleteClick(row.id)}
                className="p-1.5 rounded-full bg-red-600 hover:bg-red-500 transition-colors"
                title="Delete"
              >
                <FaTrash className="text-white text-sm" />
              </button>
            </>
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  return (
    <div className="box text-white">
      <div className="mx-auto px-10 min-h-screen sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold flex items-center">
              <FaUserAlt className="mr-3 text-pink-400" />
              {Lang.user}
            </h1>
            <p className="text-gray-400 mt-2 text-md">
              {Lang.user_list_description }
            </p>
          </div>
          
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full md:w-80 pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 text-white placeholder-gray-400 transition-all"
              placeholder={Lang.search_placeholder}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-pink-500">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider">{Lang.total_user}</h3>
            <p className="text-3xl font-bold mt-2">{totalCount}</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-green-500">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider">{Lang.active_today}</h3>
            <p className="text-3xl font-bold mt-2">
              {users.filter(u => new Date(u.created_at) > new Date(Date.now() - 86400000)).length}
            </p>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm  rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
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
                    backgroundColor: 'transparent',
                  },
                },
                header: {
                  style: {
                    backgroundColor: 'rgba(31, 41, 55, 0.7)',
                    borderBottom: '1px solid rgba(55, 65, 81, 0.5)',
                    fontSize: '0.9rem',
                    color: '#9CA3AF',
                    padding: '1rem',
                    paddingLeft: '2rem',
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: 'rgba(17, 24, 39, 0.8)',
                    backdropFilter: 'blur(4px)',
                  },
                },
                headCells: {
                  style: {
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: '#D1D5DB',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  },
                },
                cells: {
                  style: {
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                  },
                },
                rows: {
                  style: {
                    backgroundColor: 'rgba(31, 41, 55, 0.4)',
                    color: '#F3F4F6',
                    '&:hover': {
                      backgroundColor: 'rgba(59, 130, 246, 0.15)',
                    },
                  },
                  stripedStyle: {
                    backgroundColor: 'rgba(17, 24, 39, 0.4)',
                  },
                },
                pagination: {
                  style: {
                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                    borderTop: '1px solid rgba(55, 65, 81, 0.5)',
                    color: '#9CA3AF',
                    padding: '1.5rem',
                  },
                  pageButtonsStyle: {
                    color: '#9CA3AF',
                    fill: '#9CA3AF',
                    backgroundColor: 'transparent',
                    borderRadius: '0.375rem',
                    height: '2.25rem',
                    width: '2.25rem',
                    padding: '0',
                    margin: '0 3px',
                    '&:disabled': {
                      cursor: 'not-allowed',
                      opacity: 0.5,
                    },
                    '&:hover:not(:disabled)': {
                      backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    },
                  },
                },
              }}
              noDataComponent={
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="bg-gray-800 rounded-full p-5 mb-4">
                    <FaUserAlt className="text-gray-400 text-4xl" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-200 mb-2">
                    {Lang.no_users_found || "No users found"}
                  </h3>
                  <p className="text-gray-500 text-center max-w-md">
                    {Lang.try_different_search || "Try adjusting your search or filter to find what you're looking for."}
                  </p>
                </div>
              }
            />
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors text-white"
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin mx-auto" />
                ) : (
                  "Delete User"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}