import { Button, Layout, Menu, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Icons } from "../../assets/Icons";
import { menu } from "../../constants/data";
import { Route, Routes, Link } from "react-router-dom";
import { MenuList } from "../../constants/router";
import HeaderPage from "../../page/header";

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
                    style={{
                        backgroundColor: "white",
                        overflowY: "auto",
                        zIndex: "2",
                        position: "fixed",
                        height: "100vh",
                    }}
                    collapsible
                    collapsed={collapsed}>
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            width: hidePart ? "70px" : "210px",
                            height: hidePart ? "150px" : "150px",
                        }}>
                        <Link to={"/"}>
                            <Icons.logo
                                style={{
                                    width: "200px",
                                    height: "150px",
                                    marginLeft: "10px",
                                }}
                            />
                        </Link>
                    </div>
                    <div className='demo-logo-vertical' />
                    <Menu
                        theme='light'
                        mode='inline'
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        style={{
                            fontSize: "18px",
                            letterSpacing: "2px",
                            width: "100%",
                            marginBottom: "50px",
                            border: "none",
                            marginRight: "20px",
                        }}
                        items={menu.map(
                            ({ id, path, title, icon, children }) => {
                                if (children) {
                                    return {
                                        key: id,
                                        label: title,
                                        icon: icon,
                                        children: children.map(
                                            ({
                                                id,
                                                title,
                                                path,
                                                icon,
                                                children,
                                            }) => {
                                                if (children) {
                                                    return {
                                                        key: id,
                                                        label: title,
                                                        icon: icon,
                                                        children: children.map(
                                                            ({
                                                                id,
                                                                title,
                                                                path,
                                                                icon,
                                                            }) => ({
                                                                key: id,
                                                                label: (
                                                                    <Link
                                                                        to={
                                                                            path
                                                                        }>
                                                                        {title}
                                                                    </Link>
                                                                ),
                                                                icon: icon,
                                                            })
                                                        ),
                                                    };
                                                }
                                                return {
                                                    key: id,
                                                    label: (
                                                        <Link to={path}>
                                                            {title}
                                                        </Link>
                                                    ),
                                                    icon: icon,
                                                };
                                            }
                                        ),
                                    };
                                }
                                return {
                                    key: id,
                                    label: <Link to={path}>{title}</Link>,
                                    icon: icon,
                                };
                            }
                        )}
                    />
                </Sider>
                <Layout
                    style={{
                        marginLeft: "210px",
                        transition: "margin-left 0.2s",
                    }}>
                    <Header
                        style={{
                            width: "90%",
                            display: "flex",
                            marginLeft: "110px",
                            padding: 0,
                            background: colorBgContainer,
                            zIndex: 1,
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
                            className='show--hide_btn'
                        />
                        <HeaderPage />
                    </Header>
                    <Content
                        style={{
                            backgroundColor: "white",
                            overflowY: "scroll",
                            margin: "30px 16px 24px 16px",
                            marginLeft: "110px",
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
