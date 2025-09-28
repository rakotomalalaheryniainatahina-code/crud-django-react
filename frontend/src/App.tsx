"use client"


import { useEffect, useState } from "react";
import api from './api';
import toast from "react-hot-toast";
import { Activity, ArrowDownCircle, ArrowUpCircle, Github, Moon, PlusCircle, Sun, Trash, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table"
import { Button } from "./components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"

type Transactoin = {
  id: string;
  text: string;
  amount: number;
  created_at: string;
}

function App() {
  const [transactions, setTransactions] = useState<Transactoin[]>([])
  const [text, setText] = useState<string>("")
  const [amounts, setAmounts] = useState<number | "">("")
  const [loading, setLoading] = useState<boolean>(false)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const getTransactions = async () => {
    try {
      const res = await api.get<Transactoin[]>("transaction/")
      setTransactions(res.data)
      toast.success("Transactions fetched successfully")
    } catch (error) {
      console.error("Error fetching transactions", error)
      toast.error("Error fetching transactions")
    }
  }

  const deleteTransactions = async (id: string) => {
    try {
      await api.delete(`transaction/${id}/`)
      getTransactions()
      toast.success("Transaction deleted successfully")
    } catch (error) {
      console.error("Error deleting transaction", error)
      toast.error("Error deleting transaction")
    }
  }

  const addTransactions = async () => {
    if (!text || amounts == "" || isNaN(Number(amounts))) {
      toast.error("Please enter a valid amount")
      return
    }
    setLoading(true)
    try {
      const res = await api.post<Transactoin>("transaction/", {
        text,
        amount: Number(amounts),
      })
      getTransactions()
      console.log(res.data)
      toast.success("Transaction added successfully")
      setText('')
      setAmounts('')
    } catch (error) {
      console.error("Error adding transaction", error)
      toast.error("Error adding transaction")
    }
  }

  useEffect(() => {
    getTransactions()
  }, [])

  const amount = transactions.map((t) => Number(t.amount) || 0)
  const balance = amount.reduce((acc, curr) => acc + curr, 0) || 0
  const income = amount.filter((t) => t > 0).reduce((acc, curr) => acc + curr, 0) || 0
  const expense = amount.filter((t) => t < 0).reduce((acc, curr) => acc + curr, 0) || 0
  const ratio = income > 0 ? Math.min((Math.abs(expense) / income) * 100, 100) : 0
  const formaDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  return (
    <div className={`min-h-screen transition-all duration-500 p-6 ${isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900'
      : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
      }`}>
      <div className="flex justify-between backdrop-blur-lg px-5 py-3 items-center sticky top-0 z-50">
        <img src="/logo.png" className="w-16 h-16" alt="logo" />
        {/* <p  className={`text-3xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-slate-800'
                }`}>Financial</p> */}
        <div className="flex gap-4">
          <div className="flex justify-center">
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <button
                    className="bg-gradient-to-r p-3 from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-lg font-semibold rounded-lg"
                  >
                    <PlusCircle className="w-6 h-6" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-transparent">
                      Ajouter une transaction
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-6 p-2">
                    <div className="grid gap-3">
                      <Label htmlFor="name-1" className="text-sm font-semibold text-slate-700 tracking-wide">
                        Description
                      </Label>
                      <Input
                        id="name-1"
                        name="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Entrez votre texte..."
                        className="rounded-md border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username-1" className="text-sm font-semibold text-slate-700 tracking-wide">
                        Montant (négatif - dépense, positif - revenu)
                      </Label>
                      <Input
                        id="username-1"
                        type="number"
                        name="amount"
                        placeholder="Votre mantant..."
                        value={amounts}
                        onChange={(e) => setAmounts(e.target.value === "" ? "" : Number(e.target.value))}
                        className="rounded-md border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  <DialogFooter className="gap-3 p-2">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-7">
                      <DialogClose asChild>
                        <Button variant="outline" className="rounded-md border-slate-200 px-10 hover:bg-slate-50">
                          Annuler
                        </Button>
                      </DialogClose>
                      <Button
                        onClick={addTransactions}
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none rounded-md px-10 shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Ajouter
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 shadow-lg ${isDarkMode
              ? 'bg-yellow-400 hover:bg-yellow-300 text-gray-900'
              : 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
              }`}
            title={isDarkMode ? 'Mode clair' : 'Mode sombre'}
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto space-y-8 mt-5 relative z-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          <div className={`backdrop-blur-sm rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${isDarkMode
            ? 'bg-gray-800/70 border border-gray-600/20'
            : 'bg-white/70 border border-white/20'
            }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'
                  }`}>Solde Total</p>
                <p className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-slate-900'
                  }`}>{balance.toFixed(2)}€</p>
              </div>
            </div>
            <div className="h-2 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full opacity-20"></div>
          </div>

          <div className={`backdrop-blur-sm rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${isDarkMode
            ? 'bg-gray-800/70 border border-gray-600/20'
            : 'bg-white/70 border border-white/20'
            }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-lg">
                <ArrowUpCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'
                  }`}>Revenus</p>
                <p className="text-3xl font-bold text-green-600">+{income.toFixed(2)}€</p>
              </div>
            </div>
            <div className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-20"></div>
          </div>

          <div className={`backdrop-blur-sm rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${isDarkMode
            ? 'bg-gray-800/70 border border-gray-600/20'
            : 'bg-white/70 border border-white/20'
            }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-red-400 to-red-600 rounded-lg shadow-lg">
                <ArrowDownCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'
                  }`}>Dépenses</p>
                <p className="text-3xl font-bold text-red-600">{expense.toFixed(2)}€</p>
              </div>
            </div>
            <div className="h-2 bg-gradient-to-r from-red-400 to-red-600 rounded-full opacity-20"></div>
          </div>
        </div>

        <div className={`backdrop-blur-sm rounded-lg shadow-lg p-8 transition-all duration-300 ${isDarkMode
          ? 'bg-gray-800/70 border border-gray-600/20'
          : 'bg-white/70 border border-white/20'
          }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-md">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-slate-800'
                }`}>Dépenses vs Revenus</h3>
            </div>
            <div className={`px-4 py-2 rounded-md transition-colors duration-300 ${isDarkMode
              ? 'bg-gradient-to-r from-orange-800/50 to-orange-700/50'
              : 'bg-gradient-to-r from-orange-100 to-orange-200'
              }`}>
              <span className={`text-lg font-bold transition-colors duration-300 ${isDarkMode ? 'text-orange-300' : 'text-orange-800'
                }`}>{ratio.toFixed(0)}%</span>
            </div>
          </div>

          <div className="relative">
            <div className={`w-full h-4 rounded-lg overflow-hidden transition-colors duration-300 ${isDarkMode
              ? 'bg-gradient-to-r from-gray-700 to-gray-600'
              : 'bg-gradient-to-r from-slate-200 to-slate-300'
              }`}>
              <div
                className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-lg transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${Math.min(ratio, 100)}%` }}
              ></div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-xs font-semibold text-white drop-shadow-lg">{ratio.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        <div className={`backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${isDarkMode
          ? 'bg-gray-800/70 border border-gray-600/20'
          : 'bg-white/70 border border-white/20'
          }`}>
          <div className={`p-8 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-600/50' : 'border-slate-200/50'
            }`}>
            <h3 className={`text-2xl font-semibold flex items-center gap-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-slate-800'
              }`}>
              <div className="p-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-md">
                <Activity className="w-5 h-5 text-white" />
              </div>
              Historique des Transactions
            </h3>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={`border-slate-200/50 transition-colors duration-300 ${isDarkMode ? 'bg-gray-700/50 border-gray-600/50' : 'bg-slate-50/50'
                  }`}>
                  <TableHead className={`w-[100px] font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'
                    }`}>#</TableHead>
                  <TableHead className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'
                    }`}>Description</TableHead>
                  <TableHead className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'
                    }`}>Montant</TableHead>
                  <TableHead className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'
                    }`}>Date</TableHead>
                  <TableHead className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'
                    }`}>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((t, index) => (
                  <TableRow key={t.id} className={`transition-colors duration-200 ${isDarkMode
                    ? 'border-gray-600/30 hover:bg-gray-700/30'
                    : 'border-slate-200/30 hover:bg-slate-50/50'
                    }`}>
                    <TableCell className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'
                      }`}>
                      <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold transition-colors duration-300 ${isDarkMode
                        ? 'bg-gradient-to-r from-gray-600 to-gray-500 text-gray-200'
                        : 'bg-gradient-to-r from-slate-100 to-slate-200'
                        }`}>
                        {index + 1}
                      </div>
                    </TableCell>
                    <TableCell className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'
                      }`}>{t.text}</TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-sm ${t.amount > 0
                        ? isDarkMode
                          ? 'bg-green-900/50 text-green-300'
                          : 'bg-green-100 text-green-700'
                        : isDarkMode
                          ? 'bg-red-900/50 text-red-300'
                          : 'bg-red-100 text-red-700'
                        }`}>
                        {t.amount > 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="font-semibold">
                          {t.amount > 0 ? `+${t.amount}` : `${t.amount}`}€
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'
                      }`}>
                      {formaDate(t.created_at)}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => deleteTransactions(t.id)}
                        className={`p-2 rounded-sm transition-all duration-200 hover:scale-105 active:scale-95 ${isDarkMode
                          ? 'bg-red-900/30 hover:bg-red-800/50 text-red-400 hover:text-red-300'
                          : 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700'
                          }`}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="w-full flex felx-row items-center justify-between">
          <p>© RAKOTOMALALA <a className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" target="_blank" href="https://mv-dev-me.vercel.app/">Hery Niaina Tahina</a></p>
          <div>
            <a href="#">
              <Github />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
