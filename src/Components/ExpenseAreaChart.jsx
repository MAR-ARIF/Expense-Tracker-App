import { AreaChartIcon, ChevronRight} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function ExpenseAreaChart({ data  , isNoTransaction=false}) {
  const navigate = useNavigate()
  return isNoTransaction ? (
    <div className="bg-white p-4 border border-gray-200 rounded-xl">
      <div className="h-72 flex flex-col items-center justify-center">
        <AreaChartIcon className="w-16 h-16 text-gray-400 mb-4" />

        <p className="font-semibold">
            No spending data
        </p>

        <p className="text-gray-500 text-sm">
            Your charts will appear here.
        </p>
      </div>

    </div>
  ) :(
    <div className="bg-white p-4 border border-gray-200 rounded-xl">
      <div className="flex justify-between">
        <h1 className="text-2xl m-4 font-semibold">
          Spending By Category
        </h1>
        <button 
        className="text-indigo-500 cursor-pointer group items-center text-sm font-medium flex"
        onClick={() => navigate("/analytics")}
        >
          <span>
          Full analytics
          <span className="block w-20 h-px scale-x-0 duration-300 group-hover:scale-x-100 bg-indigo-500 transition-transform origin-left"></span>
          </span>
          
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 duration-300 transition-transform"/>
          </button>

      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

        
          <XAxis
            dataKey="category"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#g)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseAreaChart;