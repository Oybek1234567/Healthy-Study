import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import { MenuList } from "../../constants/router"; // Yuqoridagi filter orqali ro'yxatni olish
import { Content, Header } from "antd/es/layout/layout";
import { Button, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import HeaderPage from "../../page/header";
import { Icons } from "../../assets/Icons";
import { menu } from "../../constants/data";

const AppRouters = () => {
    const [data, setData] = useState({});
    const [role, setRole] = useState(""); // Role o'zgaruvchisini qo'shdik
    const [collapsed, setCollapsed] = useState(false);
    const token = localStorage.getItem("token");
    const API = "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const req = await axios.get(`${API}/users/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setData(req.data.user);
                    setRole(req.data.user.role); // Role ni olish
                    console.log(req.data.user);
                } catch (e) {
                    console.error("Error", e);
                }
            } else {
                console.log("Token not found");
            }
        };
        fetchData();
    }, [API, token]);

    // Menu elementlarini filtrlash
    const filteredMenu = menu
        .map((item) => {
            if (item.children) {
                const filteredChildren = item.children.filter((child) =>
                    child.roles.includes(role)
                );
                if (filteredChildren.length > 0) {
                    return {
                        ...item,
                        children: filteredChildren, // Attach filtered children
                    };
                }
                return null; // If no valid children, remove the item
            }

            // Return item if it has the current role
            return item.roles.includes(role) ? item : null;
        })
        .filter((item) => item !== null); // Remove null items

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <div>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    trigger={null}
                    width={collapsed ? "80px" : "280px"}
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
                            width: collapsed ? "70px" : "210px",
                            height: "150px",
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
                                label: <Link to={path} style={{
                                    textDecoration: "none", color: "black"
                                }}>{title}</Link>,
                                icon: icon,
                                children: children
                                    ? children.map(
                                          ({ id, path, title, icon }) => ({
                                              key: id,
                                              label: (
                                                  <Link to={path} style={{textDecoration: "none"}}>{title}</Link>
                                              ),
                                              icon: icon,
                                          })
                                      )
                                    : null,
                            })
                        )}
                    />
                </Sider>

                <Layout style={{ marginLeft: "200px" }}>
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
                                collapsed ? (
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
                                // Agar foydalanuvchi "student" ro'li bo'lsa, "/applications" sahifasini ko'rsatmaslik
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
                                    element={item.element}>
                                    {item.children?.map((child) => (
                                        <Route
                                            key={child.id}
                                            path={child.path}
                                            element={child.element}
                                        />
                                    ))}
                                </Route>
                            ))}
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default AppRouters;
