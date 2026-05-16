import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`)
      setOrders(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, { status })
      setOrders(orders.map(o => o.id === id ? { ...o, status } : o))
    } catch (err) {
      console.error(err)
    }
  }

  const deleteOrder = async (id) => {
    if (!confirm('Delete this order?')) return
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/orders/${id}`)
      setOrders(orders.filter(o => o.id !== id))
      setSelectedOrder(null)
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    reviewed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-950 mesh-gradient">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="AG DEV" className="w-10 h-10" />
            <div>
              <h1 className="font-display text-2xl font-bold gradient-text">Admin Dashboard</h1>
              <p className="text-dark-500 text-sm">{orders.length} total orders</p>
            </div>
          </div>
          <button onClick={fetchOrders} className="glass px-4 py-2 rounded-xl text-dark-300 hover:text-white transition-colors text-sm">
            ↻ Refresh
          </button>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'pending', 'reviewed', 'accepted', 'rejected'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === s ? 'bg-primary-600 text-white' : 'glass text-dark-400 hover:text-white'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
              {s !== 'all' && ` (${orders.filter(o => o.status === s).length})`}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {filtered.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedOrder(order)}
                  className={`glass rounded-2xl p-5 cursor-pointer transition-all hover:shadow-lg hover:shadow-primary-900/10 ${
                    selectedOrder?.id === order.id ? 'ring-1 ring-primary-500/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-lg">{order.project_type === 'website' ? '🌐' : '📱'}</span>
                        <h3 className="font-semibold text-white">{order.name}</h3>
                      </div>
                      <p className="text-dark-400 text-sm">{order.email}</p>
                      <p className="text-dark-500 text-xs mt-1">
                        {new Date(order.created_at).toLocaleDateString()} · {order.budget} · {order.timeline}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs border ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-dark-500">No orders found.</div>
            )}
          </div>

          <div className="lg:col-span-1">
            {selectedOrder ? (
              <motion.div
                key={selectedOrder.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-strong rounded-2xl p-6 sticky top-8"
              >
                <h3 className="font-display text-lg font-bold text-white mb-4">Order Details</h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-dark-500">Name</span>
                    <p className="text-white">{selectedOrder.name}</p>
                  </div>
                  <div>
                    <span className="text-dark-500">Email</span>
                    <p className="text-white">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <span className="text-dark-500">Phone</span>
                    <p className="text-white">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <span className="text-dark-500">Company</span>
                    <p className="text-white">{selectedOrder.company || '—'}</p>
                  </div>
                  <div>
                    <span className="text-dark-500">Type</span>
                    <p className="text-white capitalize">{selectedOrder.project_type}</p>
                  </div>
                  <div>
                    <span className="text-dark-500">Budget</span>
                    <p className="text-white">{selectedOrder.budget}</p>
                  </div>
                  <div>
                    <span className="text-dark-500">Timeline</span>
                    <p className="text-white">{selectedOrder.timeline}</p>
                  </div>
                  <div>
                    <span className="text-dark-500">Description</span>
                    <p className="text-white whitespace-pre-wrap">{selectedOrder.description}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <p className="text-dark-500 text-xs mb-2">Update Status</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['pending', 'reviewed', 'accepted', 'rejected'].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selectedOrder.id, s)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                          selectedOrder.status === s ? statusColors[s] : 'glass text-dark-400 hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => deleteOrder(selectedOrder.id)}
                    className="w-full mt-3 px-3 py-2 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
                  >
                    Delete Order
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="glass rounded-2xl p-8 text-center text-dark-500">
                <p>Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
