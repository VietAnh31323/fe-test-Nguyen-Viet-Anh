import { ConfigProvider, Layout, Menu, Switch, theme } from "antd";
import {
  AppstoreOutlined,
  BulbFilled,
  BulbOutlined,
  CheckSquareOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleDarkMode } from "../../features/theme/themeSlice";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const headerBg = isDarkMode ? "#141414" : "#ffffff";
  const contentBg = isDarkMode ? "#1f1f1f" : "#f0f2f8";

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
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
            style={{ background: headerBg, height: 64, padding: "0 24px" }}
            className="flex items-center justify-between shadow-sm"
          >
            <h2
              className="m-0 text-xl font-bold"
              style={{ color: isDarkMode ? "#ffffff" : "#1f2937" }}
            >
              Task Management
            </h2>

            <div className="flex items-center gap-2">
              <BulbOutlined
                style={{ color: isDarkMode ? "#6b7280" : "#f59e0b" }}
              />
              <Switch
                checked={isDarkMode}
                onChange={() => dispatch(toggleDarkMode())}
                size="small"
              />
              <BulbFilled
                style={{ color: isDarkMode ? "#facc15" : "#d1d5db" }}
              />
            </div>
          </Header>

          <Content
            style={{ background: contentBg }}
            className="p-6 overflow-auto"
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
