import { 
  ShoppingBag, 
  CreditCard, 
  Coffee, 
  Home, 
  Utensils, 
  Smartphone, 
  Car,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const transactions = [
  {
    id: 1,
    description: "Grocery Store",
    date: "Today, 12:30 PM",
    amount: -9637.50,
    category: "Shopping",
    icon: <ShoppingBag className="h-4 w-4" />,
    color: "bg-indigo-500/20 text-indigo-500"
  },
  {
    id: 2,
    description: "Monthly Salary",
    date: "Today, 9:15 AM",
    amount: 258750.00,
    category: "Income",
    icon: <CreditCard className="h-4 w-4" />,
    color: "bg-green-500/20 text-green-500"
  },
  {
    id: 3,
    description: "Coffee Shop",
    date: "Yesterday, 3:45 PM",
    amount: -615.00,
    category: "Food & Drink",
    icon: <Coffee className="h-4 w-4" />,
    color: "bg-amber-500/20 text-amber-500"
  },
  {
    id: 4,
    description: "Apartment Rent",
    date: "June 1, 9:00 AM",
    amount: -90000.00,
    category: "Housing",
    icon: <Home className="h-4 w-4" />,
    color: "bg-blue-500/20 text-blue-500"
  },
  {
    id: 5,
    description: "Restaurant Dinner",
    date: "May 31, 8:30 PM",
    amount: -4890.00,
    category: "Food & Drink",
    icon: <Utensils className="h-4 w-4" />,
    color: "bg-amber-500/20 text-amber-500"
  },
  {
    id: 6,
    description: "Phone Bill",
    date: "May 30, 2:00 PM",
    amount: -3375.00,
    category: "Utilities",
    icon: <Smartphone className="h-4 w-4" />,
    color: "bg-violet-500/20 text-violet-500"
  },
  {
    id: 7,
    description: "Car Insurance",
    date: "May 29, 11:15 AM",
    amount: -8437.50,
    category: "Insurance",
    icon: <Car className="h-4 w-4" />,
    color: "bg-red-500/20 text-red-500"
  },
  {
    id: 8,
    description: "Electricity Bill",
    date: "May 28, 9:30 AM",
    amount: -6551.25,
    category: "Utilities",
    icon: <Zap className="h-4 w-4" />,
    color: "bg-violet-500/20 text-violet-500"
  }
];

const TransactionList = () => {
  // Helper function to format rupee values
  const formatRupee = (value) => {
    return '₹' + Math.abs(value).toLocaleString('en-IN');
  };

  // We show only the first 5 transactions in this preview
  const displayedTransactions = transactions.slice(0, 5);
  
  return (
    <div className="space-y-1">
      {displayedTransactions.map((transaction) => (
        <div 
          key={transaction.id}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-full", transaction.color)}>
              {transaction.icon}
            </div>
            <div>
              <p className="text-sm font-medium">{transaction.description}</p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
          </div>
          <div className={cn(
            "text-sm font-medium",
            transaction.amount > 0 ? "text-green-600" : "text-foreground"
          )}>
            {transaction.amount > 0 ? '+' : '-'}{formatRupee(transaction.amount)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList; 