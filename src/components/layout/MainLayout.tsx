import { Layout, Menu } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout className="min-h-screen">
      <Sider>
        <div className="text-white text-center py-4 font-bold text-lg">
          TaskBoard
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: "/",
              label: "Dashboard",
              onClick: () => navigate("/"),
            },
            {
              key: "/tasks",
              label: "Tasks",
              onClick: () => navigate("/tasks"),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header className="bg-white px-6 flex items-center shadow-sm">
          <h2 className="m-0 text-xl font-semibold">Task Management</h2>
        </Header>

        <Content className="p-6 bg-gray-100">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
