import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts'

const PIE_COLORS = ['#10b981', '#ef4444']

function Analytics() {
    const { examId } = useParams()
    const navigate = useNavigate()
    const [analytics, setAnalytics] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await axios.get(
                    `http://localhost:5000/api/results/analytics/${examId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                setAnalytics(res.data.analytics)
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load analytics.')
            } finally {
                setLoading(false)
            }
        }

        fetchAnalytics()
    }, [examId])

    if (loading) {
        return (
            <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>
                Loading analytics...
            </div>
        )
    }

    if (error) {
        return (
            <div style={{ padding: '30px' }}>
                <p style={{ color: '#dc2626' }}>{error}</p>
                <button
                    onClick={() => navigate('/admin/exams')}
                    style={{ marginTop: '12px', cursor: 'pointer', padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#f1f5f9', color: '#374151' }}
                >
                    ← Back to Exams
                </button>
            </div>
        )
    }

    const { totalAttempts, passCount, failCount, avgPercentage, scoreDistribution } = analytics

    const pieData = [
        { name: 'Pass', value: passCount },
        { name: 'Fail', value: failCount }
    ]

    return (
        <div style={{ padding: '30px' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                <button
                    onClick={() => navigate('/admin/exams')}
                    style={{
                        cursor: 'pointer',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#f1f5f9',
                        color: '#374151',
                        fontWeight: '500'
                    }}
                >
                    ← Back
                </button>
                <h1 style={{ fontSize: '24px', margin: 0 }}>
                    Exam Analytics
                </h1>
            </div>

            {/* Summary Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '16px',
                marginBottom: '32px'
            }}>
                {[
                    { label: 'Total Attempts', value: totalAttempts, color: '#3b82f6', icon: '📝' },
                    { label: 'Passed', value: passCount, color: '#10b981', icon: '✅' },
                    { label: 'Failed', value: failCount, color: '#ef4444', icon: '❌' },
                    { label: 'Avg. Percentage', value: `${avgPercentage}%`, color: '#8b5cf6', icon: '📊' }
                ].map(card => (
                    <div key={card.label} style={{
                        backgroundColor: '#fff',
                        borderRadius: '14px',
                        padding: '20px',
                        borderLeft: `5px solid ${card.color}`,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
                    }}>
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>{card.icon}</div>
                        <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 4px' }}>{card.label}</p>
                        <h2 style={{ fontSize: '28px', color: card.color, fontWeight: '700', margin: 0 }}>
                            {card.value}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                {/* Bar Chart — Score Distribution */}
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '14px',
                    padding: '24px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
                }}>
                    <h2 style={{ fontSize: '16px', color: '#1e293b', marginBottom: '20px' }}>
                        Score Distribution
                    </h2>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={scoreDistribution}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Students" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart — Pass / Fail */}
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '14px',
                    padding: '24px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
                }}>
                    <h2 style={{ fontSize: '16px', color: '#1e293b', marginBottom: '20px' }}>
                        Pass / Fail Ratio
                    </h2>
                    <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    )
}

export default Analytics
