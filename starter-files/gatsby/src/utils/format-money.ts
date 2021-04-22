const formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;

const formatMoney = (cents: number) => {
  return formatter(cents/100);
}

export default formatMoney;
