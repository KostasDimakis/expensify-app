export default expenses => expenses.reduce(
    (total, {amount}) => amount + total,
    0,
);
