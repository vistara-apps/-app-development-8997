export const mockMarkets = [
  {
    id: 1,
    title: "Will Bitcoin reach $100k by end of 2024?",
    description: "Prediction on whether Bitcoin will hit the $100,000 price point before December 31, 2024.",
    category: "crypto",
    odds: { yes: 65, no: 35 },
    volume: "1.2k",
    tvl: "45k",
    endDate: "2024-12-31",
    provider: "Polymarket"
  },
  {
    id: 2,
    title: "Will Arsenal win the Premier League 2024/25?",
    description: "Arsenal FC to win the English Premier League title for the 2024/25 season.",
    category: "sports",
    odds: { yes: 28, no: 72 },
    volume: "890",
    tvl: "23k",
    endDate: "2025-05-25",
    provider: "Polymarket"
  },
  {
    id: 3,
    title: "US Elections: Will Trump win 2024?",
    description: "Donald Trump to win the 2024 US Presidential Election.",
    category: "politics",
    odds: { yes: 45, no: 55 },
    volume: "5.7k",
    tvl: "120k",
    endDate: "2024-11-05",
    provider: "Polymarket"
  },
  {
    id: 4,
    title: "Will Ethereum 2.0 launch by Q2 2024?",
    description: "Full Ethereum 2.0 transition to be completed by June 30, 2024.",
    category: "crypto",
    odds: { yes: 80, no: 20 },
    volume: "2.1k",
    tvl: "67k",
    endDate: "2024-06-30",
    provider: "Polymarket"
  },
  {
    id: 5,
    title: "Will there be a Base TVL milestone of $10B?",
    description: "Total Value Locked on Base network to exceed $10 billion.",
    category: "crypto",
    odds: { yes: 70, no: 30 },
    volume: "3.4k",
    tvl: "89k",
    endDate: "2024-12-31",
    provider: "Polymarket"
  }
];

export const mockUserBets = [
  {
    id: 1,
    marketId: 1,
    prediction: "yes",
    amount: 100,
    timestamp: "2024-01-15",
    outcome: null,
    status: "active"
  },
  {
    id: 2,
    marketId: 2,
    prediction: "no",
    amount: 50,
    timestamp: "2024-01-10",
    outcome: "win",
    status: "resolved"
  }
];

export const mockAnalytics = {
  totalBets: 47,
  winRate: 65,
  totalProfit: 1250,
  bestCategory: "crypto",
  worstCategory: "politics"
};