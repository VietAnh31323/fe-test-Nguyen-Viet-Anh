import { useState, useEffect } from "react";
import { Skeleton } from "antd";
import RecentTasks from "../../components/dashboard/RecentTasks";
import StatsCards from "../../components/dashboard/StatsCards";
import TaskProgress from "../../components/dashboard/TaskProgress";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-6">
      <Skeleton active loading={isLoading} paragraph={{ rows: 3 }}>
        <StatsCards />
      </Skeleton>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Skeleton active loading={isLoading} paragraph={{ rows: 6 }}>
          <TaskProgress />
        </Skeleton>

        <Skeleton active loading={isLoading} paragraph={{ rows: 6 }}>
          <RecentTasks />
        </Skeleton>
      </div>
    </div>
  );
};

export default DashboardPage;
