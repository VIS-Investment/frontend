import React, { useState } from "react";
import CandleChart from "../CandleChart";

const MatrixResult = () => {
  const [filters, setFilters] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);

  const allStocks = [
    { name: "AAPL", category: "Technology", value1: 1, weight1: 0, weight2: 0 },
    { name: "GOOGL", category: "Technology", value1: 1, weight1: 0, weight2: 0 },
    { name: "MSFT", category: "Technology", value1: 1, weight1: 0, weight2: 0 },
    { name: "JNJ", category: "Healthcare", value1: 1, weight1: 0, weight2: 0 },
    { name: "PFE", category: "Healthcare", value1: 1, weight1: 0, weight2: 0 },
    { name: "V", category: "Finance", value1: 1, weight1: 0, weight2: 0 },
    { name: "JPM", category: "Finance", value1: 1, weight1: 0, weight2: 0 },
    { name: "XOM", category: "Energy", value1: 1, weight1: 0, weight2: 0 },
    { name: "TSLA", category: "Automotive", value1: 1, weight1: 0, weight2: 0 },
  ];

  const [stocks, setStocks] = useState(allStocks);

  const availableFilters = ["Technology", "Healthcare", "Finance", "Energy", "Automotive"];

  const toggleFilter = (filter) => {
    setFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const applyFilters = () => {
    if (filters.length === 0) {
      setStocks(allStocks);
    } else {
      setStocks(allStocks.filter((stock) => filters.includes(stock.category)));
    }
  };

  const updateWeights = (index, weight1, weight2) => {
    setStocks((prev) => {
      const updated = [...prev];
      updated[index].weight1 = weight1 || 1;
      updated[index].weight2 = weight2 || 1;
      return updated;
    });
  };

  const filteredStocks = stocks.map((stock) => ({
    ...stock,
    finalValue: (stock.value1 * stock.weight1 * stock.weight2).toFixed(2),
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Matrix Page</h1>

      {/* 필터바 */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {availableFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`px-4 py-2 rounded ${
              filters.includes(filter)
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Apply Filters
        </button>
      </div>

      {/* 종목 리스트와 가중치 계산 표 */}
      <div className="p-4 rounded shadow-md bg-white dark:bg-black">
        <table className="table-auto w-full text-sm text-left text-black dark:text-white border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Weight 1</th>
              <th className="border px-4 py-2">Weight 2</th>
              <th className="border px-4 py-2">Final Value</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((stock, index) => (
              <tr key={stock.name} className="border-b">
                <td className="border px-4 py-2">{stock.name}</td>
                <td className="border px-4 py-2">{stock.category}</td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={stock.weight1}
                    step="0.01"
                    min="0"
                    onChange={(e) =>
                      updateWeights(index, parseFloat(e.target.value), stock.weight2)
                    }
                    className="w-20 p-1 border bg-gray-200 dark:bg-gray-900 text-black dark:text-white rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={stock.weight2}
                    step="0.01"
                    min="0"
                    onChange={(e) =>
                      updateWeights(index, stock.weight1, parseFloat(e.target.value))
                    }
                    className="w-20 p-1 border bg-gray-200 dark:bg-gray-900 text-black dark:text-white rounded"
                  />
                </td>
                <td className="border px-4 py-2">{stock.finalValue}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => setSelectedStock(stock.name)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 차트 및 메모장 */}
      {selectedStock && (
        <div className="flex gap-4 mt-6">
          <div className="w-4/5">
            <CandleChart stockName={selectedStock} />
          </div>
          <textarea
            placeholder="Notes"
            className="w-1/5 p-4 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded"
            rows={20}
          />
        </div>
      )}
    </div>
  );
};

export default MatrixResult;
