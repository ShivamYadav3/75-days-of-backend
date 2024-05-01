// {
//     from: <foreign collection>,
//     localField: <field from local collection's documents>,
//     foreignField: <field from foreign collection's documents>,
//     as: <output array field>
// }

// db.tasks.aggregate([
// {
// $match: {
//  state: 'started'
// }
// },{
// $project: {
//    _id:0,
//    taskId: '$sysId',
//    myTiketId: '$ticketId',
//    shortMessage:'$title',
//    fullMessage: '$description'
// }
// }
// ]);

// db.tasks.aggregate([
// {
// $match: {
//  state: "started"
// }
// },
// {
// $lookup: {
//  from: "sysusers",
//  localField: "assignee",
//  foreignField: "sysId",
//  as: "Users"
// }
// },
// {
// $project: {
//  _id: 0,
//  message: "$title",
//  state: "$state",
//  userDetails: "$Users"
// }
// }
// ]);

// [
// {
// message: 'Task for Amardeep',
// state: 'started',
// userDetails: [
//  {
//    _id: ObjectId('623a02579c126c85f22ac1be'),
//    sysId: 'ef3e21de-6868-4cee-9135-9d96fd430547',
//    name: 'Ankit Jain',
//    contactNumber: '9977092455',
//    email: 'ankit@vidhyaskillschool.com',
//    roles: [],
//    isActive: true,
//    STATUS: true,
//    createdAt: ISODate('2022-03-22T17:07:35.078Z'),
//    updatedAt: ISODate('2022-03-22T17:07:35.078Z'),
//    __v: 0
//  }
// ]
// },
// {
// message: 'Test new game on XBox',
// state: 'started',
// userDetails: [
//  {
//    _id: ObjectId('651f97046ed6686b3922b9f6'),
//    sysId: 'dfd3a526-e955-4be5-a490-320335e09322',
//    name: 'Manas Srivastava',
//    contactNumber: '7007022949',
//    roles: [],
//    isActive: true,
//    STATUS: true,
//    createdAt: ISODate('2023-10-06T05:11:32.448Z'),
//    updatedAt: ISODate('2023-10-06T05:11:32.448Z'),
//    __v: 0
//  }
// ]
// }
// ]

// db.tasks.aggregate([
// {
// $match: {
//  state: "started"
// }
// },
// {
// $lookup: {
//  from: "sysusers",
//  localField: "assignee",
//  foreignField: "sysId",
//  as: "Users"
// }
// },
// {
// $project: {
//  _id: 0,
//  message: "$title",
//  state: "$state",
//  userDetails: {
//    userName:  { $first: "$Users.name" } ,
//    userId:{ $first: "$Users.sysId" }
//  }
// }
// }
// ]);

// // code from ankit bhai

// import * as Moment from 'moment';
// import { ISortEmployeesQuery } from '@api/business-accounts/types';
// import { GetApplicationAddress } from '@utils';
// import { ISearchTaskForBusinessQuery, ISortTaskQuery, ITaskDetailsSearchQuery } from './types';

// export const GetBusinessTasksListQueryPagination = (
// searchQuery: ISearchTaskForBusinessQuery,
// sortQuery: ISortTaskQuery,
// page: number,
// limit: number
// ) => {
// let skip = 0;
// if (page > 1) {
// skip = (page - 1) * limit;
// }
// const agg = [
// { $match: searchQuery },
// {
//  $facet: {
//    records: [{ $sort: sortQuery }, { $skip: skip }, { $limit: limit }],
//    info: [{ $group: { _id: null, count: { $sum: 1 } } }]
//  }
// },
// {
//  $lookup: {
//    from: 'sysusers',
//    localField: 'records.assignee',
//    foreignField: 'sysId',
//    as: 'Employees'
//  }
// },
// {
//  $project: {
//    _id: 0,
//    totalRecords: { $arrayElemAt: ['$info.count', 0] },
//    response: {
//      $map: {
//        input: '$records',
//        as: 'item',
//        in: {
//          sysId: '$$item.sysId',
//          ticketId: '$$item.ticketId',
//          title: '$$item.title',
//          state: '$$item.state',
//          createdAt: '$$item.createdAt',
//          updatedAt: '$$item.updatedAt',
//          sysUser: {
//            $ifNull: [
//              {
//                $first: {
//                  $filter: {
//                    input: {
//                      $map: {
//                        input: '$Employees',
//                        as: 'emp',
//                        in: {
//                          $cond: {
//                            if: { $eq: ['$$emp.sysId', '$$item.assignee'] },
//                            then: {
//                              name: '$$emp.name',
//                              sysId: '$$emp.sysId'
//                            },
//                            else: null
//                          }
//                        }
//                      }
//                    },
//                    as: 'item',
//                    cond: {
//                      $ne: ['$$item', null]
//                    }
//                  }
//                }
//              },
//              {
//                name: 'Unassigned',
//                sysId: '-1'
//              }
//            ]
//          }
//        }
//      }
//    }
//  }
// }
// ];
// return agg;
// };

// export const GetEmployeeTasksListQueryPagination = (
// searchQuery: ISearchTaskForBusinessQuery,
// sortQuery: ISortTaskQuery,
// page: number,
// limit: number
// ) => {
// let skip = 0;
// if (page > 1) {
// skip = (page - 1) * limit;
// }
// const agg = [
// { $match: searchQuery },
// {
//  $facet: {
//    records: [{ $sort: sortQuery }, { $skip: skip }, { $limit: limit }],
//    info: [{ $group: { _id: null, count: { $sum: 1 } } }]
//  }
// },
// {
//  $project: {
//    _id: 0,
//    totalRecords: { $arrayElemAt: ['$info.count', 0] },
//    response: {
//      $map: {
//        input: '$records',
//        as: 'item',
//        in: {
//          sysId: '$$item.sysId',
//          ticketId: '$$item.ticketId',
//          title: '$$item.title',
//          state: '$$item.state',
//          createdAt: '$$item.createdAt',
//          updatedAt: '$$item.updatedAt'
//        }
//      }
//    }
//  }
// }
// ];
// return agg;
// };

// export const GetBusinessTasksWorkLogQueryPagination = (
// searchQuery: ISearchTaskForBusinessQuery,
// sortQuery: ISortTaskQuery,
// page: number,
// limit: number
// ) => {
// let skip = 0;
// if (page > 1) {
// skip = (page - 1) * limit;
// }
// const agg = [
// { $match: searchQuery },
// {
//  $project: {
//    workLogs: { $reverseArray: '$workLogs' },
//    sysId: '$sysId'
//  }
// },
// {
//  $lookup: {
//    from: 'sysusers',
//    localField: 'workLogs.editorId',
//    foreignField: 'sysId',
//    as: 'Editor'
//  }
// },
// {
//  $lookup: {
//    from: 'sysusers',
//    localField: 'workLogs.assigne',
//    foreignField: 'sysId',
//    as: 'Assignee'
//  }
// },
// {
//  $project: {
//    _id: 0,
//    response: {
//      $map: {
//        input: '$workLogs',
//        as: 'item',
//        in: {
//          workLogId: '$$item._id',
//          sysId: '$sysId',
//          state: '$$item.state',
//          comment: '$$item.comment',
//          editorType: '$$item.editorType',
//          location: '$$item.location',
//          createdAt: '$$item.createdAt',
//          updatedAt: '$$item.updatedAt',
//          assignee: {
//            $ifNull: [
//              {
//                $first: {
//                  $filter: {
//                    input: {
//                      $map: {
//                        input: '$Assignee',
//                        as: 'emp',
//                        in: {
//                          $cond: {
//                            if: { $eq: ['$$emp.sysId', '$$item.assigne'] },
//                            then: {
//                              name: '$$emp.name',
//                              sysId: '$$emp.sysId'
//                            },
//                            else: null
//                          }
//                        }
//                      }
//                    },
//                    as: 'item',
//                    cond: {
//                      $ne: ['$$item', null]
//                    }
//                  }
//                }
//              },
//              {
//                name: 'Unassigned',
//                sysId: '-1'
//              }
//            ]
//          },
//          editor: {
//            $ifNull: [
//              {
//                $first: {
//                  $filter: {
//                    input: {
//                      $map: {
//                        input: '$Editor',
//                        as: 'emp',
//                        in: {
//                          $cond: {
//                            if: { $eq: ['$$emp.sysId', '$$item.editorId'] },
//                            then: {
//                              name: '$$emp.name',
//                              sysId: '$$emp.sysId'
//                            },
//                            else: null
//                          }
//                        }
//                      }
//                    },
//                    as: 'item',
//                    cond: {
//                      $ne: ['$$item', null]
//                    }
//                  }
//                }
//              },
//              {
//                name: 'NA',
//                sysId: '-1'
//              }
//            ]
//          }
//        }
//      }
//    }
//  }
// }
// ];
// return agg;
// };

// export const GetBusinessTasksWorkLogQueryPagination_ = (
// searchQuery: ISearchTaskForBusinessQuery,
// sortQuery: ISortTaskQuery,
// page: number,
// limit: number
// ) => {
// let skip = 0;
// if (page > 1) {
// skip = (page - 1) * limit;
// }
// const agg = [
// { $match: searchQuery },
// {
//  $facet: {
//    records: [{ $sort: sortQuery }, { $skip: skip }, { $limit: limit }],
//    info: [{ $group: { _id: null, count: { $sum: 1 } } }]
//  }
// },

// { $unwind: { path: '$records' } },
// {
//  $lookup: {
//    from: 'sysusers',
//    let: { sysId: '$records.assignee' },
//    pipeline: [
//      { $match: { $expr: { $eq: ['$sysId', '$$sysId'] } } },
//      { $match: { $expr: { $eq: ['$isActive', true] } } },
//      { $match: { $expr: { $eq: ['$STATUS', true] } } }
//    ],

//    as: 'Employees'
//  }
// },
// {
//  $project: {
//    _id: 0,
//    workLogs: '$records.workLogs',
//    Employees: '$Employees'
//  }
// }
// ];
// return agg;
// };

// export const GetBusinessTasksCommentsPagination = (
// searchQuery: ISearchTaskForBusinessQuery,
// sortQuery: ISortTaskQuery,
// page: number,
// limit: number
// ) => {
// let skip = 0;
// if (page > 1) {
// skip = (page - 1) * limit;
// }
// const agg = [
// { $match: searchQuery },
// { $unwind: '$comments' },

// {
//  $lookup: {
//    from: 'sysusers',
//    let: { sysId: '$comments.authorId' },
//    pipeline: [
//      { $match: { $expr: { $eq: ['$sysId', '$$sysId'] } } },
//      { $match: { $expr: { $eq: ['$isActive', true] } } },
//      { $match: { $expr: { $eq: ['$STATUS', true] } } }
//    ],

//    as: 'Employees'
//  }
// },
// {
//  $project: {
//    _id: 0,
//    taskId: '$sysId',
//    sysId: '$comments._id',
//    message: '$comments.comment',
//    sysUser: {
//      sysId: '$comments.authorId',
//      name: { $arrayElemAt: ['$Employees.name', 0] }
//    },
//    createdAt: '$comments.createdAt'
//  }
// }
// ];
// return agg;
// };

// export const GetTasksDetailsAggregatedQuery = (searchQuery: ITaskDetailsSearchQuery) => {
// const agg = [
// { $match: searchQuery },
// {
//  $lookup: {
//    from: 'businessaccounts',
//    let: { sysId: '$businessAccount.sysId' },
//    pipeline: [{ $match: { $expr: { $eq: ['$sysId', '$$sysId'] } } }],
//    as: 'BusinessAccounts'
//  }
// },
// {
//  $lookup: {
//    from: 'sysusers',
//    let: { sysId: '$assignee' },
//    pipeline: [{ $match: { $expr: { $eq: ['$sysId', '$$sysId'] } } }],
//    as: 'SysUsers'
//  }
// },
// {
//  $lookup: {
//    from: 'sysusers',
//    localField: 'comments.authorId',
//    foreignField: 'sysId',
//    as: 'commentUser'
//  }
// },
// { $unwind: '$BusinessAccounts' },
// {
//  $project: {
//    _id: 0,
//    sysId: '$sysId',
//    ticketId: '$ticketId',
//    businessId: '$BusinessAccounts.sysId',
//    businessName: '$BusinessAccounts.name',
//    employee: {
//      sysId: { $ifNull: [{ $first: '$SysUsers.sysId' }, '-1'] },
//      name: { $ifNull: [{ $first: '$SysUsers.name' }, 'Unassigned'] }
//    },
//    title: '$title',
//    customerDetails: {
//      name: { $ifNull: ['$customerDetails.name', ''] },
//      contactNumber: { $ifNull: ['$customerDetails.contactNumber', ''] },
//      address: { $ifNull: ['$customerDetails.address', ''] },
//      location: { $ifNull: ['$customerDetails.location', ''] }
//    },
//    state: '$state',
//    description: '$description',
//    attachments: {
//      $ifNull: [
//        {
//          $map: {
//            input: '$attachments',
//            as: 'attachments',
//            in: {
//              name: '$$attachments.name',
//              url: {
//                $concat: [
//                  GetApplicationAddress(),
//                  '/attachment?',
//                  'businessId=',
//                  '$BusinessAccounts.sysId',
//                  '&file=',
//                  '$$attachments.name',
//                  '&sysId=',
//                  '$sysId'
//                ]
//              },
//              type: '$$attachments.type',
//              size: '$$attachments.size'
//            }
//          }
//        },
//        []
//      ]
//    },
//    workLogsCount: { $size: '$workLogs' },
//    createdAt: '$createdAt',
//    updatedAt: '$updatedAt',
//    comments: {
//      $map: {
//        input: '$comments',
//        as: 'comment',
//        in: {
//          $filter: {
//            input: {
//              $map: {
//                input: '$commentUser',
//                as: 'users',
//                in: {
//                  $cond: {
//                    if: { $eq: ['$$users.sysId', '$$comment.authorId'] },
//                    then: {
//                      authorName: '$$users.name',
//                      message: '$$comment.comment',
//                      updatedAt: '$$comment.updatedAt',
//                      authorId: '$$comment.authorId'
//                    },
//                    else: null
//                  }
//                }
//              }
//            },
//            as: 'item',
//            cond: {
//              $ne: ['$$item', null]
//            }
//          }
//        }
//      }
//    }
//  }
// },
// {
//  $project: {
//    sysId: 1,
//    ticketId: 1,
//    businessId: 1,
//    businessName: 1,
//    employee: 1,
//    title: 1,
//    customerDetails: 1,
//    state: 1,
//    description: 1,
//    attachments: 1,
//    workLogsCount: 1,
//    createdAt: 1,
//    updatedAt: 1,
//    comments: {
//      $filter: {
//        input: {
//          $map: {
//            input: '$comments',
//            as: 'item',
//            in: {
//              $arrayElemAt: ['$$item', 0]
//            }
//          }
//        },
//        as: 'item',
//        cond: {
//          $ne: ['$$item', null]
//        }
//      }
//    }
//  }
// }
// ];
// return agg;
// };
