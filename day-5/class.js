// Collection 1 - Flipkart Orders - It's having all orders info
// Collection 2 - Flipkart Users - It's having all users info

const ordersColleciton = [
  {
    _id: "12345",
    orderId: "FK-101",
    buyerId: "432", // Customer who bought this
    products: [
      {
        id: "123",
        price: "234",
        name: "XYZ",
      },
      {
        id: "124",
        price: "1002",
        name: "ABC",
      },
    ],
    state: "ordered",
  },
];

const usersCollection = [
  {
    _id: "1234567",
    userId: "432", // Customer id
    name: "Ritesh Malviya",
    phone: "987654567",
    email: "ritesh.m@google.com",
  },
  {
    _id: "123456777",
    userId: "433",
    name: "Sanskrati Agrawal",
    phone: "987654565",
    email: "sanskrati.agr@google.com",
  },
  {
    _id: "1234567767",
    userId: "435",
    name: "Manas Srivastava",
    phone: "987654565",
    email: "manas.sri201@google.com",
  },
];
// Find all orders & their customer info
db.orders.aggregates([
  {
    $match: {
      orderId: "FK-101",
    },
  },
  {
    $lookup: {
      from: "users", // Ref collectionName
      localField: "buyerId", // Current collection mapping key
      foreignField: "userId", // Ref collection joining key
      as: "MyFinalUserDetails", // The output variable
    },
  },
  {
    $project: {
      _id: 0, // It will simply remove the _id
      orderId: "$orderId", // orderId: 1
      products: 1, // products: '$products'
      customerDetails: {
        customerId: "$buyerId",
        customerName: { $first: "$MyFinalUserDetails.name" },
      },
    },
  },
]);

// Without project
// select * from table

// With Project
// select fName, city from table

// New Query
db.tasks.aggregate([
  {
    $match: {
      ticketId: "Fastrack-101",
    },
  },
  {
    $lookup: {
      from: "sysusers",
      localField: "assignee",
      foreignField: "sysId",
      as: "UserInfo",
    },
  },
  {
    $project: {
      ticketId: 1,
      title: 1,
      description: 1,
      assigneeDetails: {
        assigneeId: { $arrayElemAt: ["$UserInfo.sysId", 0] },
        assigneeName: { $first: "$UserInfo.name" },
      },
    },
  },
]);

import { ISearchUserQuery } from "@api/sys-users/types";

export const GetAccountDetailsAggregation = (searchQuery: ISearchUserQuery) => {
  const agg = [
    { $match: searchQuery },
    {
      $lookup: {
        from: "businessaccounts",
        let: { sysId: "$employees.sysId" },
        pipeline: [
          { $match: { $expr: { $eq: ["$userSysId", "$$sysId"] } } },
          { $match: { $expr: { $eq: ["$isActive", true] } } },
          { $match: { $expr: { $eq: ["$STATUS", true] } } },
        ],
        as: "BusinessAccounts",
      },
    },
    {
      $lookup: {
        from: "businessaccounts",
        let: { sysId: "$employees.sysId" },
        pipeline: [
          { $match: { $expr: { $eq: ["$employees.sysId", "$$sysId"] } } },
          { $match: { $expr: { $eq: ["$employees.isActive", true] } } },
        ],
        as: "BusinessEmployees",
      },
    },
    {
      $project: {
        _id: 0,
        BusinessEmployees: "$BusinessEmployees",
        userName: "$name",
        contactNumber: "$contactNumber",
        businessAccounts: {
          $map: {
            input: "$business",
            as: "item",
            in: {
              sysId: "$$item.sysId",
              name: "$$item.name",
              category: "$$item.category",
              subCategory: "$$item.subCategory",
              employeesCount: {
                $size: {
                  input: {
                    $filter: {
                      input: "$$item.employees",
                      as: "elem",
                      cond: "$$elem.isActive",
                    },
                  },
                  as: "element",
                  in: {
                    sysId: "$$element.sysId",
                  },
                },
              },
            },
          },
        },
      },
    },
  ];
  return agg;
};
