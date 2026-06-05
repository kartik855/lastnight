import Razorpay from "razorpay";

const PLAN_PRICES = {
  exam_pass:    6900,
  smart:        9900,
  rank_booster: 14900,
  dominator:    19900
};

const PLAN_NAMES = {
  exam_pass:    "Exam Pass (14 days)",
  smart:        "Smart Prep (1 month)",
  rank_booster: "Rank Booster (1 month)",
  dominator:    "Exam Dominator (1 month)"
};

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const plan = req.body?.plan;
    const amount = PLAN_PRICES[plan];

    if (!plan || !amount) {
      return res.status(400).json({
        error: "Invalid plan: " + plan + ". Use: exam_pass, smart, rank_booster, or dominator"
      });
    }

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "ln_" + plan + "_" + Date.now(),
      notes: { plan, planName: PLAN_NAMES[plan] }
    });

    return res.status(200).json(order);
  } catch (err) {
    console.error("Create order error:", err);
    return res.status(500).json({ error: err.message });
  }
}
