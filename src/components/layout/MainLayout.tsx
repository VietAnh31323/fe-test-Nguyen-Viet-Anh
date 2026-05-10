import { ConfigProvider, Layout, Menu } from "antd";
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
          background:
            "linear-gradient(180deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)",
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
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemColor: "#c7d2fe",
                  itemHoverColor: "#ffffff",
                  itemSelectedColor: "#ffffff",
                  itemBg: "transparent",
                  itemHoverBg: "rgba(255,255,255,0.1)",
                  itemSelectedBg: "rgba(255,255,255,0.15)",
                },
              },
            }}
          >
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              style={{ border: "none" }}
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
          </ConfigProvider>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 flex items-center gap-3">
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
