const { useState, useEffect, useMemo } = React;

// --- Icons Component ---
const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {path}
    </svg>
);

const Icons = {
    Wallet: (props) => <Icon path={<><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></>} {...props} />,
    TrendingUp: (props) => <Icon path={<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />} {...props} />,
    TrendingDown: (props) => <Icon path={<polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />} {...props} />,
    Moon: (props) => <Icon path={<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />} {...props} />,
    Sun: (props) => <Icon path={<><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></>} {...props} />,
    Trash: (props) => <Icon path={<><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>} {...props} />,
    Search: (props) => <Icon path={<><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>} {...props} />,
    Filter: (props) => <Icon path={<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />} {...props} />,
        // Category Icons
    Home: (props) => <Icon path={<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />} {...props} />,
    Coffee: (props) => <Icon path={<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />} {...props} />,
    Car: (props) => <Icon path={<rect x="1" y="3" width="15" height="13" rx="2" ry="2" />} {...props} />,
    Shopping: (props) => <Icon path={<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />} {...props} />,
    Zap: (props) => <Icon path={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />} {...props} />,
    More: (props) => <Icon path={<circle cx="12" cy="12" r="1" />} {...props} />,
};

// --- Data & Config ---
const CATEGORIES = {
    expense: [
        { id: 'food', label: 'طعام', icon: Icons.Coffee, color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30' },
        { id: 'housing', label: 'سكن', icon: Icons.Home, color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' },
        { id: 'transport', label: 'نقل', icon: Icons.Car, color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30' },
        { id: 'shopping', label: 'تسوق', icon: Icons.Shopping, color: 'text-pink-500 bg-pink-100 dark:bg-pink-900/30' },
        { id: 'bills', label: 'فواتير', icon: Icons.Zap, color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30' },
        { id: 'other', label: 'أخرى', icon: Icons.More, color: 'text-gray-500 bg-gray-100 dark:bg-gray-700/50' },
    ],
    income: [
        { id: 'salary', label: 'راتب', icon: Icons.Wallet, color: 'text-green-500 bg-green-100 dark:bg-green-900/30' },
        { id: 'freelance', label: 'عمل حر', icon: Icons.TrendingUp, color: 'text-teal-500 bg-teal-100 dark:bg-teal-900/30' },
        { id: 'gift', label: 'هدايا', icon: Icons.Wallet, color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30' },
    ]
};

// --- Components ---

// 1. Stat Card
const StatCard = ({ title, amount, icon: IconComponent, type }) => {
    const colors = {
        balance: "from-indigo-600 to-blue-600 text-white shadow-indigo-500/20",
        income: "bg-white dark:bg-dark-card border-l-4 border-green-500 text-gray-800 dark:text-white",
        expense: "bg-white dark:bg-dark-card border-l-4 border-red-500 text-gray-800 dark:text-white"
    };

    const isBalance = type === 'balance';

    return (
        <div className={`rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden transition-all duration-300 ${isBalance ? 'bg-gradient-to-br shadow-lg ' + colors.balance : 'border border-gray-100 dark:border-gray-700 ' + colors[type]}`}>
            <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div>
                    <p className={`text-xs sm:text-sm font-medium mb-1 ${isBalance ? 'text-indigo-100' : 'text-gray-500 dark:text-gray-400'}`}>{title}</p>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight" dir="ltr">
                        {amount.toLocaleString()} <span className="text-xs sm:text-sm opacity-60 font-normal">ج.م</span>
                    </h3>
                </div>
                <div className={`p-2 sm:p-3 rounded-xl ${isBalance ? 'bg-white/20 backdrop-blur-md' : 'bg-gray-50 dark:bg-gray-800'}`}>
                    <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${isBalance ? 'text-white' : type === 'income' ? 'text-green-500' : 'text-red-500'}`} />
                </div>
            </div>
        </div>
    );
};

// 2. Donut Chart
const ExpenseChart = ({ data }) => {
    if (data.length === 0) return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-600">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-3">
                <Icons.TrendingUp className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-sm">لا توجد مصروفات</p>
        </div>
    );

    const gradientString = data.reduce((acc, item, index) => {
        const prev = index === 0 ? 0 : acc.prev;
        const current = prev + item.percentage;
        acc.str += `${getColor(index)} ${prev}% ${current}%, `;
        acc.prev = current;
        return acc;
    }, {str: '', prev: 0}).str.slice(0, -2);

    function getColor(i) {
        const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
        return colors[i % colors.length];
    }

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0">
                <div 
                    className="w-full h-full rounded-full"
                    style={{ background: `conic-gradient(${gradientString})` }}
                ></div>
                <div className="absolute inset-0 m-auto w-28 h-28 sm:w-32 sm:h-32 bg-white dark:bg-dark-card rounded-full flex items-center justify-center">
                    <span className="text-xs text-gray-500 font-bold">المصروفات</span>
                </div>
            </div>
            <div className="flex-1 w-full space-y-3">
                {data.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getColor(idx) }}></span>
                            <span className="text-gray-600 dark:text-gray-300 truncate max-w-[100px] sm:max-w-none">{item.label}</span>
                        </div>
                        <span className="font-bold dark:text-gray-200">{item.percentage}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 3. Transaction Item
const TransactionItem = ({ t, onDelete }) => {
    const isIncome = t.type === 'income';
    const catInfo = isIncome 
        ? CATEGORIES.income.find(c => c.label === t.category) 
        : CATEGORIES.expense.find(c => c.label === t.category);
    const IconComp = catInfo ? catInfo.icon : Icons.More;

    return (
        <div className="group flex items-center justify-between p-3 sm:p-4 mb-3 bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-all animate-slideUp">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex shrink-0 items-center justify-center ${catInfo?.color || 'bg-gray-100 text-gray-500'}`}>
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-200 truncate">{t.desc}</h4>
                    <div className="flex gap-2 text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">
                        <span className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded whitespace-nowrap">{t.category}</span>
                        <span className="whitespace-nowrap">{t.date}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 pl-1">
                <span className={`text-sm sm:text-lg font-bold whitespace-nowrap ${isIncome ? 'text-green-500' : 'text-gray-800 dark:text-gray-200'}`} dir="ltr">
                    {isIncome ? '+' : '-'}{t.amount.toLocaleString()}
                </span>
                {/* Delete button: Visible always on mobile (opacity-100), hidden on desktop until hover */}
                <button 
                    onClick={() => onDelete(t.id)}
                    className="text-gray-400 hover:text-red-500 p-1.5 sm:p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                >
                    <Icons.Trash className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

// --- Main App ---
const App = () => {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('mahfazty_pro_data');
        return saved ? JSON.parse(saved) : [
            { id: 1, type: 'income', amount: 5000, desc: 'راتب شهر أكتوبر', category: 'راتب', date: '2023-10-01' },
            { id: 2, type: 'expense', amount: 120, desc: 'قهوة وكرواسون', category: 'طعام', date: '2023-10-02' },
        ];
    });

    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('mahfazty_theme') === 'dark');
    const [searchTerm, setSearchTerm] = useState('');
    const [newTrans, setNewTrans] = useState({ type: 'expense', amount: '', desc: '', category: '' });

    useEffect(() => {
        localStorage.setItem('mahfazty_pro_data', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('mahfazty_theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('mahfazty_theme', 'light');
        }
    }, [darkMode]);

    const stats = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
        return { income, expense, balance: income - expense };
    }, [transactions]);

    const expenseData = useMemo(() => {
        const expenses = transactions.filter(t => t.type === 'expense');
        const total = expenses.reduce((a, b) => a + b.amount, 0);
        const byCat = expenses.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {});
        
        return Object.entries(byCat)
            .sort(([,a], [,b]) => b - a)
            .map(([label, amount]) => ({
                label,
                amount,
                percentage: total ? Math.round((amount / total) * 100) : 0
            }));
    }, [transactions]);

    const filteredTransactions = transactions.filter(t => 
        t.desc.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.category.includes(searchTerm)
    );

    const addTransaction = () => {
        if (!newTrans.amount || !newTrans.desc) return;
        const category = newTrans.category || (newTrans.type === 'income' ? 'راتب' : 'أخرى');
        
        const item = {
            id: Date.now(),
            type: newTrans.type,
            amount: parseFloat(newTrans.amount),
            desc: newTrans.desc,
            category,
            date: new Date().toISOString().split('T')[0]
        };
        
        setTransactions([item, ...transactions]);
        setNewTrans({ type: newTrans.type, amount: '', desc: '', category: '' });
    };

    return (
        <div className="min-h-screen pb-12 transition-colors duration-300">
            
            {/* Header */}
            <nav className="fixed w-full z-20 top-0 left-0 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-1.5 sm:p-2 rounded-lg">
                            <Icons.Wallet className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-lg sm:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">محفظتي برو</h1>
                    </div>
                    <button 
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-yellow-400 active:scale-90"
                    >
                        {darkMode ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            <main className="pt-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-6 sm:space-y-8">
                
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <StatCard title="الرصيد الحالي" amount={stats.balance} icon={Icons.Wallet} type="balance" />
                    <div className="grid grid-cols-2 gap-3 md:col-span-2 md:grid-cols-2">
                        <StatCard title="الدخل" amount={stats.income} icon={Icons.TrendingUp} type="income" />
                        <StatCard title="المصروفات" amount={stats.expense} icon={Icons.TrendingDown} type="expense" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    
                    {/* Left Column: Form & Analytics */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Add Form */}
                        <div className="bg-white dark:bg-dark-card p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-lg mb-4 dark:text-white">عملية جديدة</h3>
                            
                            {/* Type Switcher */}
                            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-4">
                                <button 
                                    onClick={() => setNewTrans({...newTrans, type: 'expense'})}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${newTrans.type === 'expense' ? 'bg-white dark:bg-dark-bg shadow text-red-500' : 'text-gray-500'}`}
                                >مصروف</button>
                                <button 
                                    onClick={() => setNewTrans({...newTrans, type: 'income'})}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${newTrans.type === 'income' ? 'bg-white dark:bg-dark-bg shadow text-green-500' : 'text-gray-500'}`}
                                >دخل</button>
                            </div>

                            <div className="space-y-3">
                                <input 
                                    type="number" 
                                    placeholder="المبلغ (0.00)"
                                    value={newTrans.amount}
                                    onChange={e => setNewTrans({...newTrans, amount: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-3 text-lg font-bold outline-none focus:ring-2 ring-indigo-500 dark:text-white"
                                />
                                <input 
                                    type="text" 
                                    placeholder="الوصف (مثال: فاتورة نت)"
                                    value={newTrans.desc}
                                    onChange={e => setNewTrans({...newTrans, desc: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-indigo-500 dark:text-white text-sm sm:text-base"
                                />
                                
                                {/* Categories Grid */}
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    {CATEGORIES[newTrans.type].map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setNewTrans({...newTrans, category: cat.label})}
                                            className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${newTrans.category === cat.label 
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300' 
                                                : 'border-transparent bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                        >
                                            <cat.icon className="w-5 h-5" />
                                            <span className="text-[10px] sm:text-xs">{cat.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    onClick={addTransaction}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl mt-2 transition-transform active:scale-95 shadow-lg shadow-indigo-500/30 text-sm sm:text-base"
                                >
                                    حفظ العملية
                                </button>
                            </div>
                        </div>

                        {/* Analytics Chart */}
                        <div className="bg-white dark:bg-dark-card p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-lg mb-6 dark:text-white">توزيع المصروفات</h3>
                            <ExpenseChart data={expenseData} />
                        </div>
                    </div>

                    {/* Right Column: List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-dark-card p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 min-h-[500px]">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h3 className="font-bold text-lg dark:text-white">سجل المعاملات</h3>
                                
                                {/* Search Input */}
                                <div className="relative w-full sm:w-64">
                                    <Icons.Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                                    <input 
                                        type="text" 
                                        placeholder="بحث..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-800 rounded-full py-2 pr-10 pl-4 text-sm focus:ring-2 ring-indigo-500 outline-none dark:text-white transition-all focus:bg-white dark:focus:bg-dark-bg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map(t => (
                                        <TransactionItem 
                                            key={t.id} 
                                            t={t} 
                                            onDelete={(id) => setTransactions(transactions.filter(x => x.id !== id))} 
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-20 opacity-50">
                                        <Icons.Filter className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                        <p>لا توجد نتائج</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);