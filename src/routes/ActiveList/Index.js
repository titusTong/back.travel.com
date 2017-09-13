import React from 'react';
import { Table, Input, DatePicker, Select, Button, Tag, Pagination } from 'antd';
import SearchBar from '../../components/SearchBar/Index';
import request from '../../utils/request';

const Option = Select.Option;

const data = [
	{
		id:1,
		title:'中秋节西山徒步',
		leader:'佟硕',
		start_date:'2017-12-01',
		end_date:'2017-12-03',
		min_num:30,
		really_num:33,
		max_num:45,
		status:'火热报名中'
	},{
		id:2,
		title:'中秋节西山徒步',
		leader:'佟硕',
		start_date:'2017-12-01',
		end_date:'2017-12-03',
		min_num:30,
		really_num:33,
		max_num:45,
		status:'火热报名中'
	},{
		id:3,
		title:'中秋节西山徒步',
		leader:'佟硕',
		start_date:'2017-12-01',
		end_date:'2017-12-03',
		min_num:30,
		really_num:33,
		max_num:45,
		status:'火热报名中'
	},{
		id:4,
		title:'中秋节西山徒步',
		leader:'佟硕',
		start_date:'2017-12-01',
		end_date:'2017-12-03',
		min_num:30,
		really_num:33,
		max_num:45,
		status:'火热报名中'
	},{
		id:5,
		title:'中秋节西山徒步',
		leader:'佟硕',
		start_date:'2017-12-01',
		end_date:'2017-12-03',
		min_num:30,
		really_num:33,
		max_num:45,
		status:'火热报名中'
	},{
		id:6,
		title:'中秋节西山徒步',
		leader:'佟硕',
		start_date:'2017-12-01',
		end_date:'2017-12-03',
		min_num:30,
		really_num:33,
		max_num:45,
		status:'火热报名中'
	},{
		id:7,
		title:'中秋节西山徒步',
		leader:'佟硕',
		start_date:'2017-12-01',
		end_date:'2017-12-03',
		min_num:30,
		really_num:33,
		max_num:45,
		status:'火热报名中'
	},{
    id:8,
    title:'中秋节西山徒步',
    leader:'佟硕',
    start_date:'2017-12-01',
    end_date:'2017-12-03',
    min_num:30,
    really_num:33,
    max_num:45,
    status:'火热报名中'
  },{
    id:9,
    title:'中秋节西山徒步',
    leader:'佟硕',
    start_date:'2017-12-01',
    end_date:'2017-12-03',
    min_num:30,
    really_num:33,
    max_num:45,
    status:'火热报名中'
  },{
    id:10,
    title:'中秋节西山徒步',
    leader:'佟硕',
    start_date:'2017-12-01',
    end_date:'2017-12-03',
    min_num:30,
    really_num:33,
    max_num:45,
    status:'火热报名中'
  },{
    id:11,
    title:'中秋节西山徒步',
    leader:'佟硕',
    start_date:'2017-12-01',
    end_date:'2017-12-03',
    min_num:30,
    really_num:33,
    max_num:45,
    status:'火热报名中'
  },
]



export default class ListView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
      data:[],
      count:0,
      params:{},
      page:1,
      loading:false,

		}
	}
	componentWillMount () {
	  this.getData({page:1, page_size:20});
  }

	getData = (params={}) => {
	  this.setState({loading:true})
	  request('op/article/list',params,'POST')
      .then(data=>{
        if(data.data.code >= 0) {
          this.setState({
            data:data.data.lists,
            count:data.data.count,
            loading:false
          })
        }
      })
  }

  handleSearch = (values) => {
	  const options = {
      ...values,
      start_time:values['start_date'] ? values['start_date'].format('YYYY-MM-DD'):'',
      page:1,
      page_size:20
    };
	  this.setState({
      params:options
    })
    this.getData(options);
  }

  pageChange = (page) => {
	  this.setState({page});
	  let options = this.state.params
    options.page = page;
	  this.getData(options);
  }

  buttonClick = () =>{
    window.open('#/ActiveNewCreate');
  }



	render () {
		const columns = [
			{
				title:'ID',
				dataIndex:'id'
			},{
				title:'标题',
				dataIndex:'title'
			},{
				title:'领队',
				dataIndex:'leader_name'
			},{
				title:'起始时间',
				dataIndex:'',
				render (text,record) {
					return (
						<span>{record.start_time} 至 {record.end_time}</span>
					)
				}
			},{
				title:'成团人数',
				dataIndex:'least_num'
			},{
				title:'已报名人数',
				dataIndex:'join_num'
			},{
				title:'人数上限',
				dataIndex:'most_num'
			},{
				title:'状态',//  活动成型/火热报名中/已结束/
				dataIndex:'join_status',
        render: (text, record) => {
          if(record.join_status === 1) {
            return (<Tag color="#87d068" >名额充足</Tag>)
          } else if(record.join_status === 2) {
            return (<Tag color="#108ee9" >活动成行</Tag>)
          } else if(record.join_status === 3) {
            return (<Tag color="#f00" >名额紧缺</Tag>)
          } else {
            return (<Tag color="#000" >已结束</Tag>)
          }
        }
			},{
				title:'操作',
				dataIndex:'',
				render (text,record) {
					return (
						<div>
							<a target="_blank" href={`#/ActiveNewCreate?id=${record.id}`} >查看详情</a>
						</div>
					)
				}
			}
		];
    const childrenArr = [
      {
        label:'ID',
        params:'id',
        type:<Input placeholder="ID查询" />
      },{
        label:'标题',
        params:'title',
        type:<Input placeholder="标题查询" />
      },{
        label:'领队',
        params:'leader_name',
        type:<Input placeholder="领队查询" />
      },{
        label:'开始时间',
        params:'start_date',
        type:<DatePicker style={{ width:'100%' }} />
      },{
        label:'状态',
        params:'join_status',
        type:<Select>
          <Option value="0" >全部</Option>
          <Option value="1" >名额充足</Option>
          <Option value="2" >活动成行</Option>
          <Option value="3" >名额紧缺</Option>
          <Option value="-1" >已结束</Option>
        </Select>,
        defaultValue:'0'
      }
    ];
		return (
			<div>
        <div style={{ paddingBottom:15 }}>
          <SearchBar children={childrenArr} clickSearch={this.handleSearch} addButton={<Button style={{ marginLeft:20 }} onClick={this.buttonClick} >创建新活动</Button>} />
        </div>
				<Table columns={columns} loading={this.state.loading} dataSource={this.state.data} pagination={false} rowKey={(record)=>record.id.toString()}  />
        <Pagination style={{ marginTop:20 }} showTotal={total => `共 ${total} 条`} onChange={this.pageChange} current={this.state.page} total={this.state.count} defaultPageSize={20} />
			</div>
		)
	}
}