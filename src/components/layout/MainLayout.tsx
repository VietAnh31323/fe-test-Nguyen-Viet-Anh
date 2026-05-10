import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  CheckSquareOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout className="h-screen">
      <Sider
        width={220}
        style={{
          background: "linear-gradient(180deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)",
          boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
        }}
      >
        <div className="flex items-center justify-center gap-2 py-5 px-4 border-b border-white/10">
          <CheckSquareOutlined style={{ fontSize: 22, color: "#a5b4fc" }} />
          <span className="text-white font-bold text-lg tracking-wide">
            TaskBoard
          </span>
        </div>

        <div className="px-3 pt-4">
          <p className="text-indigo-300 text-xs uppercase tracking-widest px-3 mb-2 font-semibold">
            Main Menu
          </p>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ background: "transparent", border: "none", color: "#c7d2fe" }}
            items={[
              {
                key: "/",
                icon: <AppstoreOutlined />,
                label: "Dashboard",
                onClick: () => navigate("/"),
              },
              {
                key: "/tasks",
                icon: <CheckSquareOutlined />,
                label: "Tasks",
                onClick: () => navigate("/tasks"),
              },
            ]}
          />
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center">
            <UserOutlined style={{ color: "#fff", fontSize: 14 }} />
          </div>
          <div>
            <p className="text-white text-sm font-medium m-0">Admin</p>
            <p className="text-indigo-300 text-xs m-0">admin@taskboard.io</p>
          </div>
        </div>
      </Sider>

      <Layout className="h-screen">
        <Header
          style={{ background: "#fff", height: 64, padding: "0 24px" }}
          className="flex items-center justify-between shadow-sm"
        >
          <div>
            <h2 className="m-0 text-xl font-bold text-gray-800">
              Task Management
            </h2>
            <p className="m-0 text-gray-400 text-xs">
              Manage and track your team's tasks
            </p>
          </div>
        </Header>

        <Content
          style={{ background: "#f0f2f8" }}
          className="p-6 overflow-auto"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
