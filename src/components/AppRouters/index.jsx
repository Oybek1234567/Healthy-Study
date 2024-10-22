import { Link, Route, Routes } from "react-router-dom";
import { MenuList } from "../../constants/router";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import { menu } from "../../constants/data";
import Sider from "antd/es/layout/Sider";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import HeaderPage from "../../page/header";
import { Icons } from "../../assets/Icons";

const AppRouters = ({ role }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [hidePart, setHidePart] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const filteredMenu = menu
        .map((item) => { 
            if (item.children) {
                const filteredChildren = item.children.filter((child) => {
                     return child.roles.includes(role);
                });
                 if (filteredChildren.length > 0) {
                    return {
                        ...item,
                        children: filteredChildren,  
                    };
                }
            }
            return item.roles.includes(role) ? item :  null;
        })
        .filter((item) => item !== null); 

    return (
        <div>
            <Layout style={{ minHeight: "100vh" }}>
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
                    <Menu
                        theme='light'
                        mode='inline'
                        defaultSelectedKeys={["1"]}
                        style={{
                            fontSize: "18px",
                            letterSpacing: "2px",
                            width: "100%",
                            marginBottom: "50px",
                            border: "none",
                        }}
                        items={filteredMenu.map(
                            ({ id, path, title, icon, children }) => ({
                                key: id,
                                label: <Link to={path}>{title}</Link>,
                                icon: icon,
                                children: children
                                    ? children.map(
                                          ({ id, path, title, icon }) => ({
                                              key: id,
                                              label: (
                                                  <Link to={path}>{title}</Link>
                                              ),
                                              icon: icon,
                                          })
                                      )
                                    : null,
                            })
                        )}
                    />
                </Sider>
                <Layout style={{ marginLeft: "210px" }}>
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
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
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
                            {MenuList.filter((item) => {
                                if (
                                    role === "student" &&
                                    item.path === "/applications"
                                ) {
                                    return false;
                                }
                                return true;
                            }).map((item) => (
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
