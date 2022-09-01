export const formatMoney = (revenue: number) => {
    if (revenue === 0) return "N/A";
    return revenue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  };