import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, Input, Modal, Table, message } from "antd";
import Layout from "../components/Layout/Layout";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Spinner from "../components/Layout/Spinner";
import moment from "moment";

const CategoryPage = () => {
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(null);
  const [categories, setCategories] = useState([]);
  //table data
  const columns = [
    {
      title: "Serial Number",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Category",
      dataIndex: "name",
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
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/category/get-category");
      setCategories(res.data);
      setLoading(false);
    } catch (error) {
      message.error("Fetch Issue With Category");
    }
  }, []);

  //useEffect hook
  useEffect(() => {
    
    fetchCategories();
  }, [fetchCategories]);

  //Delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/category/delete-category", {
        categoryId: record._id,
      });
      fetchCategories();
      setLoading(false);
      message.success("Category Deleted!");
    } catch (error) {
      setLoading(false);
      message.error("unable to delete");
    }
  };

  const handleAdd = async (values) => {
    
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("/api/v1/category/add-category", {
        ...values,
        userId: user._id,
      });
      console.log("Response data:", res.data);
      if (res.status === 201) {
        message.success("Category Added Successfully");
        fetchCategories();
        handleModalVisibility(false);
      }
      // else if (res.status === 403) {
      //   message.error("Category Already Exist");
      // }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 403) {
        message.error("Category Already Exists");
    } else {
        message.error("An error occurred while adding the category");
    }
    }
  };

  // Edit handler
  const handleEdit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      await axios.post("/api/v1/category/edit-category", {
        payload: {
          ...values,
          userId: user._id,
        },
        categoryId: editable._id,
      });
      message.success("Category Updated Successfully");
      fetchCategories();
      setLoading(false);
      handleModalVisibility(false);
    } catch (error) {
      setLoading(false);
      message.error("An error occurred while updating the category");
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
    : {};

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn border" onClick={() => setShowModel(true)}>
          Add Category
        </button>
      </div>
      <div className="content my-2">
        <Table columns={columns} dataSource={categories} />
      </div>
      <Modal
        title={editable ? "Edit Category" : "Add Category"}
        open={showModel}
        onCancel={() => handleModalVisibility(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          variant="filled"
          style={{
            maxWidth: 600,
          }}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={formInitialValues}
        >
          <Form.Item
            label="Category"
            name="name"
            rules={[
              {
                required: true,
                message: " Category required!",
              },
            ]}
          >
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

export default CategoryPage;
