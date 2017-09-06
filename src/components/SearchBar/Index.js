
import React from 'react';

import { Form, Row, Col, Button, Icon } from 'antd';
const FormItem = Form.Item;


class SearchBarComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      childrenData:[]
    }
  }

  componentWillMount () {
    this.setState({
      childrenData:this.props.children
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState ({
      childrenData:nextProps.children
    })
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //console.log('Received values of form: ', values);
      this.props.clickSearch(values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }


  // To generate mock Form.Item
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const children = this.state.childrenData ? this.state.childrenData.map((item, index)=>{
      return (
        <Col span={8} key={index} >
          <FormItem {...formItemLayout} label={item.label}>
            {getFieldDecorator(item.params)(
              item.type
            )}
          </FormItem>
        </Col>
      )
    }):''

    return children;
  }

  render() {
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">Search</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}


const SearchBar = Form.create()(SearchBarComponent);
export default SearchBar;