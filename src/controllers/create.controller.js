import Card from "../models/card.model.js";
import Owner from "../models/owner.model.js";

export const createUserBank = async (req, res) => {
  const { name, email, DNI } = req.body;
  if (!name || !email || !DNI)
    return res.status(400).json({ message: "Missing parameters" });
  try {
    await Owner.create({
      name,
      email,
      DNI,
    });
    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createCard = async (req, res) => {
  const {
    owner,
    owner_id,
    exp_month,
    exp_year,
    cvv,
    amount,
    card_number,
    card_franchise_id,
    card_type_id,
  } = req.body;
  if (
    !owner ||
    !owner_id ||
    !exp_month ||
    !exp_year ||
    !cvv ||
    !amount ||
    !card_number ||
    !card_franchise_id ||
    !card_type_id
  )
    return res.status(400).json({ message: "Missing parameters" });

  try {
    await Card.create({
      owner,
      owner_id,
      exp_month,
      exp_year,
      cvv,
      amount,
      card_number,
      card_franchise_id,
      card_type_id,
    });
    return res.status(201).json();
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
