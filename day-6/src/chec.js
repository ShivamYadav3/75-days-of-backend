export const GetBusinessTasksListQueryPagination = (
  searchQuery: ISearchTaskForBusinessQuery,
  sortQuery: ISortTaskQuery,
  page: number,
  limit: number
) => {
  let skip = 0;
  if (page > 1) {
    skip = (page - 1) * limit;
  }
  const agg = [
    { $match: searchQuery },
    {
      $facet: {
        records: [{ $sort: sortQuery }, { $skip: skip }, { $limit: limit }],
        info: [{ $group: { _id: null, count: { $sum: 1 } } }],
      },
    },
    {
      $lookup: {
        from: "sysusers",
        localField: "records.assignee",
        foreignField: "sysId",
        as: "Employees",
      },
    },
    {
      $project: {
        _id: 0,
        totalRecords: { $arrayElemAt: ["$info.count", 0] },
        response: {
          $map: {
            input: "$records",
            as: "item",
            in: {
              sysId: "$$item.sysId",
              ticketId: "$$item.ticketId",
              title: "$$item.title",
              state: "$$item.state",
              createdAt: "$$item.createdAt",
              updatedAt: "$$item.updatedAt",
              sysUser: {
                $ifNull: [
                  {
                    $first: {
                      $filter: {
                        input: {
                          $map: {
                            input: "$Employees",
                            as: "emp",
                            in: {
                              $cond: {
                                if: { $eq: ["$$emp.sysId", "$$item.assignee"] },
                                then: {
                                  name: "$$emp.name",
                                  sysId: "$$emp.sysId",
                                },
                                else: null,
                              },
                            },
                          },
                        },
                        as: "item",
                        cond: {
                          $ne: ["$$item", null],
                        },
                      },
                    },
                  },
                  {
                    name: "Unassigned",
                    sysId: "-1",
                  },
                ],
              },
            },
          },
        },
      },
    },
  ];
  return agg;
};
