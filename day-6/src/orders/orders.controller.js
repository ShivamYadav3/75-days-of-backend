import { OrderModel } from "./orders.model.js";

export const getOrdersList = async (req, res) => {
  try {
    const results = await OrderModel.aggregate([
      { $match: {} },
      {
        $lookup: {
          from: "users",
          let: { dhirajObjectId: { $toObjectId: "$customerId" } }, // Convert customerId to ObjectId
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$dhirajObjectId"] }, // Perform the lookup using ObjectId
              },
            },
          ],
          as: "UserDetails",
        },
      },
      {
        $project: {
          _id: 0,
          orderId: "$_id",
          orderTransactionId: "$transactionId",
          products: 1,
          deliverDetails: "$deliveryAddress",
          customerDetails: {
            customerId: { $first: "$UserDetails._id" },
            customerName: { $first: "$UserDetails.userName" },
          },
        },
      },
    ]);
    res.send(results);
  } catch (err) {
    console.log("Err: ", err);
    res.send({ message: "Unable to get orders list" });
  }
};
