import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaSpinner } from "react-icons/fa";
import { useSearchParams } from "react-router";
import { authLoader } from "../../hooks/useAuthUser";
import Lang from "../../lang/lang";
import { useUser } from "../../provider/userContext";
import { Helper } from "../../utils/helper";
import type { Route } from ".././+types/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: Lang.title + " - " + Lang.user },
    {
      name: "description",
      content: Lang.welcome_fx + " - " + Lang.user,
    },
  ];
}

interface LedgerEntry {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone_number: string;
  address: string;
  created_at: string;
}

export default function Profile() {
  const { user } = useUser();
  const { BASE_API } = new Helper();
  const [filtered, setFiltered] = useState<LedgerEntry[]>([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams] = useSearchParams();
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);

  useEffect(() => {
    authLoader();
  }, [user]);

  useEffect(() => {
    const fetchLedger = async () => {
      const res = await fetch(
        `${BASE_API}/auth/ledger?page=${page}&perPage=${perPage}&searchText=${searchText}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setLedger(data.ledger.ledger || []);
      setFiltered(data.ledger.ledger || []);
      setTotalCount(data.ledger.totalCount || 0);
    };
    if (user?.id) fetchLedger();
  }, [user, page, perPage, searchText]);

  useEffect(() => {
    const filteredData = ledger?.filter((entry) =>
      `${entry.first_name} ${entry.last_name} ${entry.email} ${entry.created_at} ${entry.phone_number}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFiltered(filteredData || []);
  }, [searchText, ledger]);

  const columns = [
    {
      name: Lang.first_name,
      selector: (row: LedgerEntry) => row.first_name,
      sortable: true,
    },
    {
      name: Lang.last_name,
      selector: (row: LedgerEntry) => row.last_name,
      sortable: true,
    },
    {
      name: Lang.email,
      selector: (row: LedgerEntry) => row.email.toUpperCase(),
      sortable: true,
    },
    {
      name: Lang.email,
      selector: (row: LedgerEntry) => row.email.toUpperCase(),
      sortable: true,
    },
    {
      name: Lang.address,
      selector: (row: LedgerEntry) => row.address || "-",
    },
    {
      name: Lang.create_now,
      selector: (row: LedgerEntry) => new Date(row.created_at).toLocaleString(),
      sortable: true,
    },
  ];

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-gray-300 text-4xl" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
      {/* Profile */}

      {/* Ledger Section */}
      <div className="py-6 max-w-7xl mx-auto">
        <div className="mb-4">
          <h2 className="text-white text-xl font-bold mb-2">{Lang.user}</h2>
          <input
            type="text"
            className="w-full md:w-96 px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-white"
            placeholder={Lang.search}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          pagination
          paginationServer
          paginationTotalRows={totalCount}
          paginationDefaultPage={page}
          paginationPerPage={perPage}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          onChangePage={(page) => setPage(page)}
          onChangeRowsPerPage={(perPage) => setPerPage(perPage)}
          highlightOnHover
          striped
          theme="dark"
          customStyles={{
            rows: {
              style: {
                backgroundColor: "#111827", // default row background
                color: "white",
              },
            },
            headCells: {
              style: {
                backgroundColor: "#374151", // header background color
                color: "#d1d5db", // text color in header
                fontWeight: "bold", // bold text
                fontSize: "1rem", // increase font size for header
              },
            },
            pagination: {
              style: {
                backgroundColor: "#1f2937",
                color: "white",
                borderTop: "1px solid #374151",
                padding: "10px 20px",
              },
              pageButtonsStyle: {
                fill: "#d1d5db",
                "&:hover": {
                  backgroundColor: "#374151",
                  color: "#ffffff",
                },
              },
            },
          }}
          conditionalRowStyles={[
            {
              when: (row: any, index: number) => index % 2 === 0,
              style: {
                backgroundColor: "#1e293b", // custom color for even-indexed rows (first, third, etc.)
              },
            },
            {
              when: (row: any, index: number) => index % 2 !== 0,
              style: {
                backgroundColor: "#111827", // custom color for odd-indexed rows (second, fourth, etc.)
              },
            },
          ]}
          noDataComponent={
            <div
              style={{
                textAlign: "center",
                backgroundColor: "#111827", // Set the background color to #111827 when no data is available
                color: "#ffffff", // White text color
                padding: "30px",
                width: "100%",
                fontSize: "1.2rem", // Optional: increase font size for better visibility
              }}
            >
              {Lang.no_data_found}{" "}
              {/* Assuming Lang.no_data contains the message */}
            </div>
          }
        />
      </div>
    </div>
  );
}
