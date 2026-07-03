import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

function ExpenseStackedBar({ data }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 mt-5">
            <h2 className="text-xl font-semibold mb-4">
                Spending by Month
            </h2>

            <ResponsiveContainer width="100%" height={350}>
                <BarChart
                    data={data}
                    layout="vertical"
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis type="number" />

                    <YAxis
                        type="category"
                        dataKey="month"
                    />

                    <Tooltip />
                    <Legend />

                    <Bar dataKey="Foods" stackId="expense" fill="#4F46E5" />
                    <Bar dataKey="Grocery" stackId="expense" fill="#DC2626" />
                    <Bar dataKey="Transportation" stackId="expense" fill="#06B6D4" />
                    <Bar dataKey="Shopping" stackId="expense" fill="#F59E0B" />
                    <Bar dataKey="Utilities" stackId="expense" fill="#10B981" />
                    <Bar dataKey="Entertainment" stackId="expense" fill="#8B5CF6" />
                    <Bar dataKey="Health" stackId="expense" fill="#EC4899" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ExpenseStackedBar;