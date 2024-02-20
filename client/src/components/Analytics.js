import React from "react";
import { Progress } from "antd";
const Analytics = ({ allTransection }) => {
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fees",
    "tax",
  ];

  //total transections
  const totalTransection = allTransection.length;
  const totalIncomeTransection = allTransection.filter(
    (transection) => transection.type === "income"
  );
  const totalExpenseTransection = allTransection.filter(
    (transection) => transection.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransection.length / totalTransection) * 100;
  const totalExpensePercent =
    (totalExpenseTransection.length / totalTransection) * 100;
  //total turnover
  const totalTurnOver = allTransection.reduce(
    (acc, transection) => acc + transection.amount,
    0
  );
  const totalIncomeTurnOver = allTransection
    .filter((transection) => transection.type === "income")
    .reduce((acc, transection) => acc + transection.amount, 0);
  const totalExpenseTurnOver = allTransection
    .filter((transection) => transection.type === "expense")
    .reduce((acc, transection) => acc + transection.amount, 0);
  const totalIncomeTurnOverPercent =
    (totalIncomeTurnOver / totalTurnOver) * 100;
  const totalExpenseTurnOverPercent =
    (totalExpenseTurnOver / totalTurnOver) * 100;
  return (
    <>
      <div className="row m-3">
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              Total Transections : {totalTransection}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTransection.length}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTransection.length}
              </h5>
              <div className="d-flex flex-column align-items-center">
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2 mt-3"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">Total TurnOver : {totalTurnOver}</div>
            <div className="card-body">
              <h5 className="text-success">Income : {totalIncomeTurnOver}</h5>
              <h5 className="text-danger">Expense : {totalExpenseTurnOver}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnOverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2 mt-3"
                  percent={totalExpenseTurnOverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
        <h6 className="bg-success p-2 text-light">Category-wise Income</h6>
          {categories.map((category) => {
            const amount = allTransection
              .filter(
                (transection) =>
                  transection.type === "income" &&
                  transection.category === category
              )
              .reduce((acc, transection) => acc + transection.amount, 0);
            return (
              amount > 0 && (
                <div className="card mt-2">
                  <div className="card-body">
                    <h6>{category}</h6>
                    <Progress
                      percent={((amount / totalIncomeTurnOver) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="col-md-3">
        <h6 className="bg-danger p-2 text-light">Category-wise Expense</h6>
          {categories.map((category) => {
            const amount = allTransection
              .filter(
                (transection) =>
                  transection.type === "expense" &&
                  transection.category === category
              )
              .reduce((acc, transection) => acc + transection.amount, 0);
            return (
              amount > 0 && (
                <div className="card mt-2">
                  <div className="card-body">
                    <h6>{category}</h6>
                    <Progress
                      percent={((amount / totalExpenseTurnOver) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        </div>
        <div className="row mt-3 analytics"></div>
    </>
  );
};

export default Analytics;
