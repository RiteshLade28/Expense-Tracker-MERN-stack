import Transaction from "../models/transaction.js";

export const index = async (req, res) => {
  const transaction = await Transaction.find({ user_id: req.user._id }).sort({
    createdAt: -1,
  });

  const demo = await Transaction.aggregate([
    {
      $match: { user_id: req.user._id },
    },
    {
      $group: {
        _id: { $month: "$date" },
        transactions: {
          $push: {
            amount: "$amount",
            details: "$details",
            date: "$date",
            type: "$type",
            _id: "$_id",
          },
        },
        totalExpenses: {
          $sum: "$amount",
        },
      },
    },
  ]);

  res.json({ data: demo });
};

export const create = async (req, res) => {
  console.log("create");
  // console.log(req);
  const { amount, details, date, category_id } = req.body;
  const transaction = new Transaction({
    amount,
    details,
    date,
    user_id: req.user._id,
    category_id,
  });
  await transaction.save();
  res.json({ message: "Success" });
};

export const destroy = async (req, res) => {
  console.log(req.params.id);
  await Transaction.deleteOne({ _id: req.params.id });
  res.json({ message: "Success" });
};

export const update = async (req, res) => {
  await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json({ message: "Success" });
};
