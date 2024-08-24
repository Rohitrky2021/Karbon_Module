const FLAGS = {
    GREEN: 1,
    AMBER: 2,
    RED: 0,
    MEDIUM_RISK: 3, // for display purpose only
    WHITE: 4 // data is missing for this field
  };
  
  // Function to determine the index of the latest standalone financial entry
  export function latest_financial_index(data) {
    const financials = data.financials;
    for (let i = 0; i < financials.length; i++) {
      if (financials[i].nature === "STANDALONE") {
        return i;
      }
    }
    return 0;
  }
  
  // Function to calculate the total revenue from financial data
  export function total_revenue(data, financial_index) {
    const financial = data.financials[financial_index];
    return financial.pnl.lineItems.net_revenue;
  }
  
  // Function to calculate the total borrowings from financial data
  export function total_borrowing(data, financial_index) {
    const financial = data.financials[financial_index];
    const longTermBorrowings = financial.bs.liabilities.long_term_borrowings;
    const shortTermBorrowings = financial.bs.liabilities.short_term_borrowings;
    return longTermBorrowings + shortTermBorrowings;
  }
  
  // Function to determine the ISCR flag
  export  function iscr_flag(data, financial_index) {
    const iscrValue = iscr(data, financial_index);
    return iscrValue >= 2 ? FLAGS.GREEN : FLAGS.RED;
  }
  
  // Function to determine the ISCR value
  export function iscr(data, financial_index) {
    const financial = data.financials[financial_index];
    const profitBeforeInterestAndTax = financial.pnl.lineItems.profit_before_interest_and_tax;
    const depreciation = financial.pnl.lineItems.depreciation;
    const interest = financial.pnl.lineItems.interest;
  
    return (profitBeforeInterestAndTax + depreciation + 1) / (interest + 1);
  }
  
  // Function to determine the flag based on total revenue exceeding 5 crores
  export function total_revenue_5cr_flag(data, financial_index) {
    const revenue = total_revenue(data, financial_index);
    return revenue >= 50000000 ? FLAGS.GREEN : FLAGS.RED;
  }
  
  // Function to determine the flag based on borrowing to revenue ratio
  export function borrowing_to_revenue_flag(data, financial_index) {
    const borrowing = total_borrowing(data, financial_index);
    const revenue = total_revenue(data, financial_index);
    const ratio = borrowing / revenue;
  
    return ratio <= 0.25 ? FLAGS.GREEN : FLAGS.AMBER;
  }
  



  // Model.js 


  // Main function to evaluate all financial flags
  export function probe_model_5l_profit(data) {
    const latestIndex = latest_financial_index(data);
  
    return {
      flags: {
        TOTAL_REVENUE_5CR_FLAG: total_revenue_5cr_flag(data, latestIndex),
        BORROWING_TO_REVENUE_FLAG: borrowing_to_revenue_flag(data, latestIndex),
        ISCR_FLAG: iscr_flag(data, latestIndex),
      }
    };
  }
  
