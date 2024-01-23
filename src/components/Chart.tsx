import { useEffect, useState } from 'react'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

interface IChartProps {
	totalIncome: number
	totalExpense: number
}

interface IData {
	value: number
	name: string
}
 
 const COLORS = ['#ff8042', '#00c49f', ];


export const Chart = ({ totalExpense, totalIncome }: IChartProps) => {

	const [data, setData] = useState<IData[]>([
		{
			name: 'Expense',
			value: totalExpense
		},
		{
			name: 'Income',
			value: totalIncome
		}
	])

	useEffect(() => {
		setData([{
			name: 'Expense',
			value: totalExpense
		},
		{
			name: 'Income',
			value: totalIncome
		}])
	}, [totalExpense, totalIncome])


	return (
		// <ResponsiveContainer width="100%" height="100%">
		<PieChart width={260} height={300} >
				<Pie
				data={data}
				cx="50%"
				cy="50%"
				innerRadius={60}
				outerRadius={80}
				fill="#8884d8"
				paddingAngle={5}
				dataKey="value"
				>
				{data.map((_, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
	// </ResponsiveContainer>
		)
}