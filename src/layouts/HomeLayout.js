import React, {Component} from 'react';
import {Menu, Icon} from "antd";
import {spawn} from 'child_process';
import style from '../styles/home-layout.less';
import {Link} from "react-router-dom";

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

class HomeLayout extends Component {
    render() {
        const {title, children} = this.props;
        return (
            <div>
                <header className={style.header}>
                    <Link to="/">react manager</Link>
                </header>
                <main className={style.main}>
                    <div className={style.menu}>
                        <Menu
                            mode="inline"
                            theme="dark"
                            style={{
                            width: '240px'
                        }}>
                            <SubMenu
                                key="user"
                                title={<span><Icon type="user"/><span>用户管理</span></span>}>
                                <MenuItem key="user-list">
                                    <Link to="/user/list">user list</Link>
                                </MenuItem>
                                <MenuItem key="user-add">
                                    <Link to="/user/add">user add</Link>
                                </MenuItem>
                            </SubMenu>

                            <SubMenu
                                key="book"
                                title={<span><Icon type="book"/><span>图书管理</span></span>}>
                                <MenuItem key="book-list">
                                    <Link to="/book/list">book list</Link>
                                </MenuItem>
                                <MenuItem key="book-add">
                                    <Link to="/book/add">book add</Link>
                                </MenuItem>
                            </SubMenu>
                        </Menu>
                    </div>

                    <div className={style.content}>
                        {children}
                    </div>
                </main>
            </div>
        );
    }
}

export default HomeLayout;