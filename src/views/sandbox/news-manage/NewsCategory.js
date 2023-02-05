import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Form, Input, Popconfirm, Table,Modal,Space  } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import './NewsCategory.css'
const { confirm } = Modal;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};






export default function NewsCategory() {
  const [dataSource, setdataSource] = useState([])
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  function initdata(params) {
    axios.get(`/categories`).then(res=>{
      setdataSource(res.data)
 })
  }
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    axios.patch(`/categories/${row.id}`,{
      title:row.title
    }).then(res=>{
      setdataSource(newData);
 })

    
  };

  const defaultColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "分类名称",
      dataIndex: "title",
      key: "title",
      editable:true
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
            <Button danger shape="circle" onClick={() => { showConfirm(record); }} icon={<DeleteOutlined />}  />
        </Space>
      ),
    },
  ];
  
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  useEffect(() => {
    initdata()
  }, [])
  
  const showConfirm = (record) => {
    confirm({
      title: "确认要删除权限吗?",
      icon: <ExclamationCircleFilled />,
      content: "删除后不可恢复",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        axios
        .delete("/categories/" + record.id)
        .then((res) => {
          initdata()
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };




  return (
    <Table
    columns={columns}
    components={components}
    dataSource={dataSource}
    rowKey='id'
    rowClassName={() => 'editable-row'}
    pagination={{ pageSize: 14 }}
  />
  )
}
