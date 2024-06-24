import React from "react";
import { Table } from "antd";

const Stats = ({list}) => {
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'E-mail',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Connections',
          dataIndex: 'connections',
          key: 'connections',
          render: (text) => <a>{text.replace(/\[|\]/g,'').split(',').length}</a>,
        },
      ];
      
      console.info('list', list, list[0].connections);
    return (
        <div>
            <Table dataSource={list} columns={columns} />
        </div>
    )
}

export default Stats;