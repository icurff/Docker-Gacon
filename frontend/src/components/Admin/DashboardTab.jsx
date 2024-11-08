import { useFetchDashboardMetrics } from "../../customHooks/Dashboard/useFetchDashboardMetrics";
import { useFetchChartMetrics } from "../../customHooks/Dashboard/useFetchChartMetrics";
import { FaBook } from "react-icons/fa6";
import { FormatNumber } from "../../utils/FormatNumber";
import { Bar, Line } from "react-chartjs-2";
import { FaUserAlt } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { RiBillLine } from "react-icons/ri";
import "chart.js/auto";
export function DashboardTab() {
  const { data: dashboardMetrics } = useFetchDashboardMetrics();
  const { data: chartMetrics } = useFetchChartMetrics();

  if (!dashboardMetrics || !chartMetrics) {
    return <div className="min-h-screen">Loading...</div>;
  }

  const orderCountData = {
    labels: chartMetrics.dates,
    datasets: [
      {
        label: "Order Counts",
        data: chartMetrics.orderCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: chartMetrics.dates,
    datasets: [
      {
        label: "Revenue (VND)",
        data: chartMetrics.revenues.map((rev) => parseInt(rev)),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="min-h-screen">
      {/* Dashboard */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
        {/* Total Books */}
        <div className="rounded-md bg-[#2557f6] text-white">
          <div className="flex flex-row justify-between p-4">
            <span className="text-2xl font-bold"> Books </span>
            <div className="flex items-center">
              <FaBook className="text-2xl" />
            </div>
          </div>
          <div className="p-4">
            <span className="text-2xl font-bold">
              {dashboardMetrics.totalBooks}
            </span>
          </div>
        </div>
        {/* Total Users */}
        <div className="rounded-md bg-[#ff6106] text-white">
          <div className="flex flex-row justify-between p-4">
            <span className="text-2xl font-bold"> Users </span>
            <div className="flex items-center">
              <FaUserAlt className="text-2xl" />
            </div>
          </div>
          <div className="p-4">
            <span className="text-2xl font-bold">
              {dashboardMetrics.totalUsers}
            </span>
          </div>
        </div>
        {/* Total Revenue */}
        <div className="rounded-md bg-[#2a7230] text-white">
          <div className="flex flex-row justify-between p-4">
            <span className="text-2xl font-bold"> Revenue </span>
            <div className="flex items-center">
              <FaMoneyBill1Wave className="text-2xl" />
            </div>
          </div>
          <div className="p-4">
            <span className="text-2xl font-bold">
              {FormatNumber(dashboardMetrics.totalRevenue)}
            </span>
          </div>
        </div>
        {/* Unresolved Orders */}
        <div className="rounded-md bg-[#d00002] text-white">
          <div className="flex flex-row justify-between p-4">
            <span className="text-2xl font-bold"> Unresolved Orders </span>
            <div className="flex items-center">
              <RiBillLine className="text-2xl" />
            </div>
          </div>
          <div className="p-4">
            <span className="text-2xl font-bold">
              {dashboardMetrics.unresolvedOrders}
            </span>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-[400px] w-full lg:h-[550px]">
          <Bar data={orderCountData} options={options} />
        </div>
        <div className="h-[400px] w-full lg:h-[550px]">
          <Line data={revenueData} options={options} />
        </div>
      </div>
    </div>
  );
}
