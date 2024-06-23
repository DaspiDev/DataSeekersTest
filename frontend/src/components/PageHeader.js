import React, { useState } from 'react';
import { PlusOutlined, ShrinkOutlined, TeamOutlined, BarChartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
    {
      label: 'Users',
      key: 'users',
      icon: <TeamOutlined />,
    },
    {
      label: 'Add user',
      key: 'addUser',
      icon: <PlusOutlined />,
    },
    {
      label: 'Add connection',
      key: 'addConnection',
      icon: <ShrinkOutlined />,
    },
    {
      label: 'Stats',
      key: 'stats',
      icon: <BarChartOutlined />
    },
  ];

const PageHeader = ({page, setPage}) => {
    return (
        <Menu 
            onClick={(e) => setPage(e.key)} 
            selectedKeys={[page]} 
            mode="horizontal" 
            items={items} />
    )
}

export default PageHeader;