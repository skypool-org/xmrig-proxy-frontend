import React, {useState, useEffect} from 'react';
import { Table, Input, Layout } from 'antd';
import axios from 'axios';
const { Content } = Layout;
const { Search } = Input;

const columns = [
  {
    title: '矿机名',
    dataIndex: 'workername',
    key: 'workername',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: '连接数',
    dataIndex: 'connections',
    key: 'connections',
  },
  {
    title: '有效提交',
    dataIndex: 'acceptShares',
    key: 'acceptShares',
  },
  {
    title: '过期提交',
    dataIndex: 'rejectShares',
    key: 'rejectShares',
  },
  {
    title: '无效提交',
    dataIndex: 'invalidShares',
    key: 'invalidShares',
  },
  {
    title: '1分',
    dataIndex: 'min1',
    key: 'min1',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.min1 - b.min1,
  },
  {
    title: '10分',
    dataIndex: 'min10',
    key: 'min10',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.min10 - b.min10,
  },
  {
    title: '1时',
    dataIndex: 'hour1',
    key: 'hour1',
    sorter: (a, b) => a.hour1 - b.hour1,
  },
  {
    title: '12时',
    dataIndex: 'hour12',
    key: 'hour12',
    sorter: (a, b) => a.hour12 - b.hour12,
  },
  {
    title: '24时',
    dataIndex: 'hour24',
    key: 'hour24',
    sorter: (a, b) => a.hour24 - b.hour24,
  },
];


export default function App () {

  const [url, setUrl] = useState('http://127.0.0.1:1888/1/workers');
  const [data, setData] = useState([]);

  const onSearch = (value, _e, info) => {
    console.log(value);
    setUrl(value);
    updateSearch(url);
  }

  const updateSearch = async (url) => {
    const res = await axios.get(url);
    const newData = [];
    const resData = res.data;
    const lists = resData.workers;
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      newData.push({
        key: i.toString(),
        workername: list[0],
        ip: list[1],
        connections: list[2],
        acceptShares: list[3],
        rejectShares: list[4],
        invalidShares: list[5],
        min1: list[8],
        min10: list[9],
        hour1: list[10],
        hour12: list[11],
        hour24: list[12],
      });
    }
    setData(newData);
  }

  useEffect(() => {
    setInterval(() => {
      updateSearch(url);
    }, 60 * 1000);
  });


  return (
    <div className="App">
      <Layout>
        <Content style={{ padding: '48px' }}>
          <Search placeholder="url" onSearch={onSearch} defaultValue={url} enterButton style={{ padding: '0px 48px'}}/>
          <Table dataSource={data} columns={columns} pagination={false}/>;
        </Content>
      </Layout>
    </div>
  );
}

