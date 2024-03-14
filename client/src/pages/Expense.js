import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Chart from "chart.js/auto";
const Expense = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };
      const formattedDateTime = now.toLocaleDateString(undefined, options);
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    // Bar chart
    const barChartOptions = {
      type: "bar",
      data: {
        labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        datasets: [
          {
            label: "Sales",
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
            backgroundColor: "rgb(255, 99, 132)",
          },
          {
            label: "Revenue",
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
            backgroundColor: "rgb(75, 192, 192)",
          },
          {
            label: "Free Cash Flow",
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
            backgroundColor: "rgb(255, 205, 86)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Bar Chart",
          },
        },
      },
    };

    const barChart = new Chart(
      document.querySelector("#barChart"),
      barChartOptions
    );

    // Polar area chart
    const polarAreaOptions = {
      type: "polarArea",
      data: {
        labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
        datasets: [
          {
            label: "My First Dataset",
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(201, 203, 207)",
              "rgb(54, 162, 235)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Polar Area Chart",
          },
        },
      },
    };

    const polarAreaChart = new Chart(
      document.querySelector("#polarAreaChart"),
      polarAreaOptions
    );
  
    // Clean up function
    return () => {
      barChart.destroy(); // Destroy the bar chart instance when the component unmounts
      polarAreaChart.destroy(); // Destroy the polar area chart instance when the component unmounts
      clearInterval(interval);
    };
  }, []);
  return (
    <>
    
      <Layout>
        {/* End Page Title */}
        <section className="section dashboard">
          <div className="row">
            {/* Left side columns */}
            <div className="col-lg-8">
              <div className="row">
                {/* Sales Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card ">
                    <div className="card-body ">
                      <h5 className="card-title">
                        Expense
                        <span> | Today</span>
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart" />
                        </div>
                        <div className="ps-3">
                          <h6>145</h6>
                          <span className="text-danger small pt-1 fw-bold">
                            12%
                          </span>{" "}
                          <span className="text-muted small pt-2 ps-1">
                            increase
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Sales Card */}
                {/* Revenue Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card revenue-card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Expense <span>| This Month</span>
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-currency-dollar" />
                        </div>
                        <div className="ps-3">
                          <h6>3,264</h6>
                          <span className="text-danger small pt-1 fw-bold">
                            8%
                          </span>{" "}
                          <span className="text-muted small pt-2 ps-1">
                            increase
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Revenue Card */}
                {/* Customers Card */}
                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card customers-card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Expense <span>| Total</span>
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-people" />
                        </div>
                        <div className="ps-3">
                          <h6>1244</h6>
                          <span className="text-danger small pt-1 fw-bold">
                            12%
                          </span>{" "}
                          <span className="text-muted small pt-2 ps-1">
                            decrease
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Customers Card */}
                {/* Reports */}
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Reports <span>/Today</span>
                      </h5>
                      {/* Line Chart */}
                      <canvas id="barChart" />
                      {/* End Line Chart */}
                    </div>
                  </div>
                </div>
                {/* End Reports */}
                {/* Recent Sales */}
                <div className="col-12">
                  <div className="card recent-sales overflow-auto">
                    <div className="card-body">
                      <h5 className="card-title">
                        Recent Sales <span>| Today</span>
                      </h5>
                      <table className="table table-borderless datatable">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <a href="#">#2457</a>
                            </th>
                            <td>Brandon Jacob</td>
                            <td>
                              <a href="#" className="text-primary">
                                At praesentium minu
                              </a>
                            </td>
                            <td>$64</td>
                            <td>
                              <span className="badge bg-success">Approved</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="#">#2147</a>
                            </th>
                            <td>Bridie Kessler</td>
                            <td>
                              <a href="#" className="text-primary">
                                Blanditiis dolor omnis similique
                              </a>
                            </td>
                            <td>$47</td>
                            <td>
                              <span className="badge bg-warning">Pending</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="#">#2049</a>
                            </th>
                            <td>Ashleigh Langosh</td>
                            <td>
                              <a href="#" className="text-primary">
                                At recusandae consectetur
                              </a>
                            </td>
                            <td>$147</td>
                            <td>
                              <span className="badge bg-success">Approved</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="#">#2644</a>
                            </th>
                            <td>Angus Grady</td>
                            <td>
                              <a href="#" className="text-primar">
                                Ut voluptatem id earum et
                              </a>
                            </td>
                            <td>$67</td>
                            <td>
                              <span className="badge bg-danger">Rejected</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="#">#2644</a>
                            </th>
                            <td>Raheem Lehner</td>
                            <td>
                              <a href="#" className="text-primary">
                                Sunt similique distinctio
                              </a>
                            </td>
                            <td>$165</td>
                            <td>
                              <span className="badge bg-success">Approved</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* End Recent Sales */}
              </div>
            </div>
            {/* End Left side columns */}

            {/* Right side columns  */}
            <div className="col-lg-4">
              {/* Website Traffic */}

              <div className="card info-card sales-card card-body pb-0">
                <h1 className="card-title">
                  Budget Left <span>| This Month</span>
                </h1>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-people" />
                  </div>
                  <div className="ps-3">
                    <h6>9000</h6>
                    <span className="text-danger small pt-1 fw-bold">
                      INR
                    </span>{" "}
                  </div>
                </div>
                <p>
                  <span style={{ color: "red", fontSize: "17px" }}>
                    {currentDateTime.split(",")[0]}
                  </span>
                  <span style={{ color: "green", fontSize: "17px" }}>
                    {currentDateTime.split(",")[1]}
                  </span>
                  <span style={{ color: "GrayText", fontSize: "17px" }}>
                    {currentDateTime.split(",")[2]}
                  </span>
                  <span style={{ color: "yellow", fontSize: "17px" }}>
                    {currentDateTime.split(",")[3]}
                  </span>
                </p>
              </div>
              {/* End Website Traffic */}

              {/* Budget Report */}
              <div className="card">
                <div className="card-body pb-0">
                  <h5 className="card-title">Polar Area Chart</h5>
                  <canvas id="polarAreaChart" />
                </div>
              </div>
              {/* End Budget Report */}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Expense;
