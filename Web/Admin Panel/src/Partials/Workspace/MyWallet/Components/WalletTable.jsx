/* eslint-disable react/prop-types */
import DataTable from "./DataTable";

const WalletTable = ({ paymentsData, isLoading }) => {
  const columns = [
    {
      Header: "SR. NO.",
      id: "serialNumber",
      Cell: ({ row }) => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      Header: "Customer Name",
      accessor: "name",
    },
    {
      Header: "Order Id",
      accessor: "razorpay_order_id",
    },
    {
      Header: "Payment Date",
      accessor: "addedon",
      filter: "dateRange",
    },
    {
      Header: "Transaction Id",
      accessor: "transaction_id",
      Cell: ({ row }) => {
        return <div>{row.original.transaction_id || "Admin Approved"}</div>;
      },
    },
    {
      Header: "Vendor",
      accessor: (row) => `${row.vendor_firstname} ${row.vendor_lastname}`,
      Cell: ({ row }) => (
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column">
            {row.original.vendor_firstname
              ? `${row.original.vendor_firstname} ${row.original.vendor_lastname}`
              : "No Vendor"}
          </div>
        </div>
      ),
    },
    {
      Header: "Transaction Status",
      accessor: "payment_status",
      Cell: ({ row }) => {
        return (
          <div
            className={`btn btn-sm text-white ${
              row.original.payment_status === "Success"
                ? "bg-success"
                : row.original.payment_status === "Pending"
                ? "bg-warning"
                : "bg-danger"
            }`}
          >
            {row.original.payment_status}
          </div>
        );
      },
    },
    {
      Header: "Order Total",
      accessor: "order_total",
      Cell: ({ row }) => {
        return (
          <div>
            {Number(row.original.order_total).toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </div>
        );
      },
    },
  ];

  return (
    <DataTable columns={columns} data={paymentsData} isLoading={isLoading} />
  );
};

export default WalletTable;
