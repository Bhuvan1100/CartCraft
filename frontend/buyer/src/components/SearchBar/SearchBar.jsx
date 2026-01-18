import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useThemeStore from '../../Stores/ThemeStore';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const inputRef = useRef(null);
  const { darkMode } = useThemeStore();
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Men's T-Shirt", category: "men", type: "tshirt", collection: "mens collection", keywords: ["men","tshirt","shirt","mens collection"] },
    { id: 2, name: "Men's Kurta", category: "men", type: "kurta", collection: "mens collection", keywords: ["men","kurta","mens collection"] },
    { id: 3, name: "Men's Jeans", category: "men", type: "jeans", collection: "mens collection", keywords: ["men","jeans","mens collection"] },
    { id: 4, name: "Men's Shirt", category: "men", type: "shirt", collection: "mens collection", keywords: ["men","shirt","mens collection"] },
    { id: 5, name: "Men's Hoodie", category: "men", type: "hoodie", collection: "mens collection", keywords: ["men","hoodie","mens collection"] },
    { id: 6, name: "Women's T-Shirt", category: "women", type: "tshirt", collection: "womens collection", keywords: ["women","tshirt","womens collection"] },
    { id: 7, name: "Women's Dress", category: "women", type: "dress", collection: "womens collection", keywords: ["women","dress","womens collection"] },
    { id: 8, name: "Women's Kurta", category: "women", type: "kurta", collection: "womens collection", keywords: ["women","kurta","womens collection"] },
    { id: 9, name: "Women's Jeans", category: "women", type: "jeans", collection: "womens collection", keywords: ["women","jeans","womens collection"] },
    { id: 10, name: "Women's Top", category: "women", type: "top", collection: "womens collection", keywords: ["women","top","womens collection"] },
    { id: 11, name: "Child T-Shirt", category: "child", type: "tshirt", collection: "kids collection", keywords: ["child","tshirt","kids collection"] },
    { id: 12, name: "Child Dress", category: "child", type: "dress", collection: "kids collection", keywords: ["child","dress","kids collection"] },
    { id: 13, name: "Child Shorts", category: "child", type: "shorts", collection: "kids collection", keywords: ["child","shorts","kids collection"] },
    { id: 14, name: "Child Jeans", category: "child", type: "jeans", collection: "kids collection", keywords: ["child","jeans","kids collection"] }
  ];

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredResults([]);
      setSelectedIndex(-1);
      return;
    }
    const q = searchQuery.toLowerCase();
    setFilteredResults(products.filter(p => p.keywords.some(kw => kw.toLowerCase().includes(q))));
    setSelectedIndex(-1);
  }, [searchQuery]);

  const handleClose = () => {
    setSearchQuery('');
    setFilteredResults([]);
    setSelectedIndex(-1);
    onClose();
  };

  const handleSelectItem = (item) => {
    console.log('Selected:', item);
    handleClose();
  };

  // THIS IS THE KEY CHANGE
  const handleCollectionClick = (collectionName) => {
    const results = products.filter(p => p.collection.toLowerCase() === collectionName.toLowerCase());
    console.log(collectionName)
    const urlPath = collectionName.toLowerCase().replace(/\s+/g, "");
    results.forEach(item => handleSelectItem(item));
    handleClose();
    navigate(`/${urlPath}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') handleClose();
    else if (e.key === 'ArrowDown')
      setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
    else if (e.key === 'ArrowUp') setSelectedIndex((prev) => Math.max(prev - 1, -1));
    else if (e.key === 'Enter' && selectedIndex >= 0)
      handleSelectItem(filteredResults[selectedIndex]);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`}
      />

      <div
        className={`relative w-full max-w-2xl rounded-lg shadow-2xl transition-all duration-300 transform ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="flex items-center gap-3 p-4 border-b border-gray-300 dark:border-gray-700">
          <MagnifyingGlassIcon className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for men, women, child clothing..."
            className={`flex-1 outline-none text-lg ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
          />
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <XMarkIcon className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
        </div>

        {searchQuery || filteredResults.length ? (
          <div className="max-h-96 overflow-y-auto">
            {filteredResults.length ? (
              filteredResults.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${index === selectedIndex
                    ? darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                >
                  <MagnifyingGlassIcon className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.category} • {item.type}</p>
                  </div>
                </button>
              ))
            ) : (
              <div className={`py-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <p>No results found</p>
              </div>
            )}
          </div>
        ) : (
          <div className={`p-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-sm mb-3">Try Collections:</p>
            <div className="flex flex-wrap gap-2">
              {["mens collections", "womens collections", "kids collections"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleCollectionClick(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
