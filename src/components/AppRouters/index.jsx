import { Button, Layout, Menu, theme } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Icons } from "../../assets/Icons";
import { menu } from "../../constants/data";
import { Route, Routes, Link } from "react-router-dom";
import { MenuList } from "../../constants/router";
const { Header, Sider, Content } = Layout;
const AppRouters = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [hidePart, setHidePart] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const toggleHidePart = () => {
        setHidePart(!hidePart);
    };
    return (
        <div>
            <Layout
                style={{
                    minHeight: "100vh",
                }}>
                <Sider
                    trigger={null}
                    width={"20%"}
                    style={{ backgroundColor: "white" }}
                    collapsible
                    collapsed={collapsed}>
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            width: hidePart ? "70px" : "210px",
                            height: hidePart ? "150px" : "150px",
                        }}>
                        <Icons.logo
                            style={{
                                width: "200px",
                                height: "150px",
                                marginLeft: "10px",
                            }}
                        />
                    </div>
                    <div className='demo-logo-vertical' />
                    <Menu
                        theme='light'
                        mode='inline'
                        style={{
                            fontSize: "18px",
                            letterSpacing: "2px",
                            width: "100%",
                            marginBottom: "50px",
                            border: "none",
                            marginRight: "20px",
                        }}
                        defaultSelectedKeys={["1"]}
                        items={menu.map(({id, path, title, icon, children}) => {
                            if(children){
                                return{
                                    key: id,
                                    label: <Link to={path}>{title}</Link>,
                                    icon: icon,
                                    children: children.map(
                                        ({title, path, id, icon}) => ({
                                            key: id,
                                            icon: icon,
                                            label: <Link to={path}>{title}</Link>,
                                        })
                                    )
                                }
                            }
                            return{
                                key: id,
                                label: <Link to={path}>{title}</Link>,
                                icon: icon
                            }
                        })}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}>
                        <Button
                            type='text'
                            icon={
                                collapsed || hidePart ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() =>
                                setCollapsed(!collapsed) ||
                                toggleHidePart(hidePart)
                            }
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}>
                        <Routes>
                            {MenuList.map((item) => (
                                <Route
                                    key={item.id}
                                    path={item.path}
                                    element={item.element}
                                />
                            ))}
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default AppRouters;
