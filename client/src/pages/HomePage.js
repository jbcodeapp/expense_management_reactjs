import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Table,
  message,
} from "antd";
import Layout from "../components/Layout/Layout";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Spinner from "../components/Layout/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [categories, setCategories] = useState([]);

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModel(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  //getAll transection
  const getAllTransections = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      // console.log("User ID:", user._id);
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/v1/transections/get-transection",
        {
          userId: user._id,
          frequency,
          selectedDate,
          type,
        }
      );
      setAllTransection(res.data);
      setLoading(false);
    } catch (error) {
      message.error("Fetch Issue With Transection");
    }
  }, [frequency, selectedDate, type]);

  // Fetch categories from backend
  const fetchCategories = useCallback(async () => {
    try {
      const res = await axios.post("/api/v1/category/get-category");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  //useEffect hook
  useEffect(() => {
    getAllTransections();
    fetchCategories();
  }, [getAllTransections, fetchCategories]);

  //Delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/transections/delete-transection", {
        transectionId: record._id,
      });
      getAllTransections();
      setLoading(false);
      message.success("Transaction Deleted!");
    } catch (error) {
      setLoading(false);
      message.error("unable to delete");
    }
  };

  const handleAdd = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const dataToSend = {
        ...formInitialValues, // Assuming formInitialValues contains default values
        ...values,
        userId: user._id,
      };
      await axios.post("/api/v1/transections/add-transection", dataToSend);
      message.success("Transaction Added Successfully");
      getAllTransections();
      setLoading(false);
      handleModalVisibility(false);
    } catch (error) {
      setLoading(false);
      message.error("Please fill all fields");
    }
  };

  // Edit handler
  const handleEdit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      await axios.post("/api/v1/transections/edit-transection", {
        payload: {
          ...values,
          userId: user._id,
        },
        transectionId: editable._id,
      });
      message.success("Transaction Updated Successfully");
      getAllTransections(); // Update state with the updated transaction
      setLoading(false);
      handleModalVisibility(false);
    } catch (error) {
      setLoading(false);
      message.error("Please fill all fields");
    }
  };

  // Function to reset editable state
  const resetEditableState = () => {
    setEditable(null);
  };

  // Function to handle modal visibility
  const handleModalVisibility = (visible) => {
    if (!visible) {
      resetEditableState();
    }
    setShowModel(visible);
  };

  //form handling
  const handleSubmit = async (values) => {
    if (editable) {
      handleEdit(values);
    } else {
      handleAdd(values);
    }
  };

  // Form initial values
  const formInitialValues = editable
    ? { ...editable, date: moment(editable.date) }
    : {
        category: categories.length > 0 ? categories[0].name : undefined,
        type: "expense", // Assuming "expense" is the default type
        date: moment(), // Assuming today's date is the default date
      };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div className="filter-tab">
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModel(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content my-2">
        {viewData === "table" ? (
          <Table
            columns={columns}
            dataSource={allTransection.map((transections, index) => ({
              ...transections,
              key: index,
            }))}
          />
        ) : (
          <Analytics allTransection={allTransection} />
        )}{" "}
      </div>
      <Modal
        title={editable ? "Edit Transection" : "Add Transection"}
        open={showModel}
        onCancel={() => handleModalVisibility(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          //  variant="filled"
          //  style={{
          //    maxWidth: 600,
          //  }}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={formInitialValues}
        >
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please enter a valid number for amount!",
              },
            ]}
          >
            <Input type="Number" autofocus />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("type") !== "") {
                    return Promise.resolve();
                  }
                  return Promise.reject("Type required!");
                },
              }),
            ]}
          >
            <Select defaultValue={"expense"}>
              <Select.Option value="expense">Expense</Select.Option>
              <Select.Option value="income">Income</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("category") !== "") {
                    return Promise.resolve();
                  }
                  return Promise.reject("Category required!");
                },
              }),
            ]}
          >
            <Select
              defaultValue={
                categories.length > 0 ? categories[0].name : undefined
              }
            >
              {categories.map((category) => (
                <Select.Option key={category._id} value={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("date") !== "") {
                    return Promise.resolve();
                  }
                  return Promise.reject("Date required!");
                },
              }),
            ]}
          >
            <DatePicker defaultValue={moment()} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Reference"
            name="reference"
            rules={[
              {
                required: true,
                message: " Reference required!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              {editable ? "Update" : "Save"}{" "}
              {/* Change button text based on edit or add */}
            </Button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
