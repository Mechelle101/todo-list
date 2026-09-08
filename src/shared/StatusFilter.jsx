import { useSearchParams } from "react-router";

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("status") || "all";

  const handleStatusChange = (status) => {
    if (status === "all") {
      searchParams.delete("status");
    } else {
      searchParams.set("status", status);
    }
    setSearchParams(searchParams);
  };

  return (
    <div>
      <label htmlFor="statusFilter">Show:</label>
      <select
        id="statusFilter"
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value="all">All Todos</option>
        <option value="active">Active Todos</option>
        <option value="completed">Completed Todos</option>
      </select>
    </div>
  );
}

export default StatusFilter;
