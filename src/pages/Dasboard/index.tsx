import RecentTasks from "../../components/dashboard/RecentTasks";
import StatsCards from "../../components/dashboard/StatsCards";
import TaskProgress from "../../components/dashboard/TaskProgress";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TaskProgress />

        <RecentTasks />
      </div>
    </div>
  );
};

export default DashboardPage;
