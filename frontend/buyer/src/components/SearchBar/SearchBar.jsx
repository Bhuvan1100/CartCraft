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
  // ================= MEN =================
  { id: 1, name: "T-Shirts", category: "Men's", type: "T-Shirts", keywords: ["men","mens","man","male","guy","boy","gentleman","dude","chap","fella","tshirt","t-shirt","tee","tee shirt","t shirt","t shirts","top","casual top","formal shirt","polo","polo shirt","henley","crew neck","v-neck","round neck","long sleeve tshirt","short sleeve tshirt","casual wear","office wear","fashion","style","clothing","apparel","male fashion","menswear","men t shirts","mens t shirts","men's t shirts","male t shirts"] },

  { id: 2, name: "Leather Jackets", category: "Men's", type: "Jackets", keywords: ["men","mens","man","male","guy","boy","gentleman","dude","chap","fella","jacket","coat","leather jacket","bomber jacket","blazer","trench coat","hoodie","outerwear","winter wear","fashion","style","casual wear","formal wear","office wear","menswear","male fashion","men jackets","mens jackets","men's jackets","male jackets"] },

  { id: 3, name: "Slim Fit Jeans", category: "Men's", type: "Jeans", keywords: ["men","mens","man","male","guy","boy","gentleman","jeans","denim","slim fit","skinny jeans","straight fit","pants","trousers","casual wear","fashion","style","male fashion","menswear","bottom wear","men jeans","mens jeans","men's jeans","male jeans","men pants","mens pants"] },

  { id: 4, name: "Chino Pants", category: "Men's", type: "Pants", keywords: ["men","mens","man","male","guy","boy","gentleman","chino","chinos","pants","trousers","casual wear","formal pants","office wear","bottom wear","fashion","style","menswear","male fashion","men pants","mens pants","men's pants","male trousers"] },

  { id: 5, name: "Formal Shirts", category: "Men's", type: "Shirts", keywords: ["men","mens","man","male","guy","boy","gentleman","shirt","formal shirt","dress shirt","office wear","business shirt","work wear","fashion","style","clothing","menswear","male fashion","men shirts","mens shirts","men's shirts","male shirts"] },

  { id: 6, name: "Polo T-Shirts", category: "Men's", type: "Polo Shirts", keywords: ["men","mens","man","male","guy","boy","gentleman","polo","polo shirt","tshirt","t-shirt","tee","casual wear","fashion","style","menswear","male fashion","men polo shirts","mens polo shirts","men's polo shirts","male polo shirts"] },

  { id: 7, name: "Winter Hoodies", category: "Men's", type: "Hoodies", keywords: ["men","mens","man","male","guy","boy","gentleman","hoodie","sweatshirt","pullover","zip hoodie","winter wear","warm","casual wear","fashion","style","menswear","male fashion","men hoodies","mens hoodies","men's hoodies","male hoodies"] },

  { id: 8, name: "Tailored Blazers", category: "Men's", type: "Blazers", keywords: ["men","mens","man","male","guy","boy","gentleman","blazer","tailored blazer","jacket","formal wear","office wear","suit jacket","fashion","style","menswear","male fashion","men blazers","mens blazers","men's blazers","male blazers"] },

  { id: 9, name: "Wool Sweaters", category: "Men's", type: "Sweaters", keywords: ["men","mens","man","male","guy","boy","gentleman","sweater","wool sweater","pullover","knitwear","winter wear","warm","fashion","style","casual wear","menswear","male fashion","men sweaters","mens sweaters","men's sweaters","male sweaters"] },

  { id: 10, name: "Cargo Pants", category: "Men's", type: "Cargo Pants", keywords: ["men","mens","man","male","guy","boy","gentleman","cargo pants","cargo trousers","pants","trousers","pockets","utility wear","casual wear","fashion","style","menswear","male fashion","men cargo pants","mens cargo pants","men's cargo pants","male cargo pants"] },

  { id: 11, name: "Bomber Jackets", category: "Men's", type: "Jackets", keywords: ["men","mens","man","male","guy","boy","gentleman","bomber jacket","jacket","coat","outerwear","casual wear","fashion","style","menswear","male fashion","men bomber jackets","mens bomber jackets"] },

  { id: 12, name: "Jogger Trackpants", category: "Men's", type: "Trackpants", keywords: ["men","mens","man","male","guy","boy","gentleman","joggers","trackpants","sweatpants","pants","trousers","athletic wear","sportswear","gym wear","casual wear","fashion","style","menswear","male fashion","men joggers","mens joggers","men trackpants"] },

  { id: 13, name: "Puffer Vests", category: "Men's", type: "Vests", keywords: ["men","mens","man","male","guy","boy","gentleman","puffer vest","vest","sleeveless jacket","jacket","outerwear","winter wear","warm","casual wear","fashion","style","menswear","male fashion","men vests","mens vests"] },

  { id: 14, name: "Casual Shorts", category: "Men's", type: "Shorts", keywords: ["men","mens","man","male","guy","boy","gentleman","shorts","casual shorts","summer wear","beach wear","half pants","fashion","style","menswear","male fashion","men shorts","mens shorts"] },

  { id: 15, name: "Trench Coats", category: "Men's", type: "Coats", keywords: ["men","mens","man","male","guy","boy","gentleman","trench coat","coat","long coat","outerwear","winter wear","formal wear","fashion","style","menswear","male fashion","men coats","mens coats"] },

  { id: 16, name: "Henley T-Shirts", category: "Men's", type: "T-Shirts", keywords: ["men","mens","man","male","guy","boy","gentleman","henley","tshirt","t-shirt","tee","buttoned shirt","casual wear","fashion","style","menswear","male fashion","men henley tshirts","mens henley tshirts"] },

  { id: 17, name: "Formal Trousers", category: "Men's", type: "Dress Pants", keywords: ["men","mens","man","male","guy","boy","gentleman","formal pants","dress trousers","office wear","business wear","bottom wear","fashion","style","menswear","male fashion","men dress pants","mens dress pants"] },

  // ================= WOMEN =================
  { id: 18, name: "Summer Dresses", category: "Women's", type: "Dresses", keywords: ["women","womens","woman","female","lady","girl","feminine","dress","summer dress","frock","gown","casual wear","party dress","fashion","style","apparel","female fashion","womenswear","women dresses","womens dresses","female dresses"] },

  { id: 19, name: "Casual Tops", category: "Women's", type: "Tops", keywords: ["women","womens","woman","female","lady","girl","feminine","top","casual top","shirt","blouse","tshirt","tee","fashion","style","apparel","female fashion","womenswear","women tops","womens tops","female tops"] },

  { id: 20, name: "Skinny Jeans", category: "Women's", type: "Jeans", keywords: ["women","womens","woman","female","lady","girl","feminine","jeans","denim","skinny jeans","pants","trousers","tight fit","casual wear","fashion","style","female fashion","womenswear","bottom wear","women jeans","womens jeans","female jeans"] },

  { id: 21, name: "Designer Handbags", category: "Women's", type: "Handbags", keywords: ["women","womens","woman","female","lady","girl","feminine","handbag","bag","purse","designer handbag","fashion","style","accessory","female fashion","womenswear","women handbags","womens handbags"] },

  { id: 22, name: "Mini Skirts", category: "Women's", type: "Skirts", keywords: ["women","womens","woman","female","lady","girl","feminine","skirt","mini skirt","short skirt","casual wear","party wear","fashion","style","female fashion","womenswear","women skirts","womens skirts"] },

  { id: 23, name: "Blazers", category: "Women's", type: "Jackets", keywords: ["women","womens","woman","female","lady","girl","feminine","blazer","jacket","formal wear","office wear","business wear","coat","fashion","style","female fashion","womenswear","women blazers","womens blazers"] },

  { id: 24, name: "Knit Sweaters", category: "Women's", type: "Sweaters", keywords: ["women","womens","woman","female","lady","girl","feminine","sweater","knit sweater","pullover","winter wear","warm","fashion","style","female fashion","womenswear","women sweaters","womens sweaters"] },

  { id: 25, name: "Wide Leg Pants", category: "Women's", type: "Pants", keywords: ["women","womens","woman","female","lady","girl","feminine","pants","trousers","wide leg pants","palazzo","loose fit","casual wear","fashion","style","female fashion","womenswear","bottom wear","women pants","womens pants"] },

  { id: 26, name: "Winter Coats", category: "Women's", type: "Coats", keywords: ["women","womens","woman","female","lady","girl","feminine","coat","winter coat","long coat","outerwear","warm","fashion","style","female fashion","womenswear","women coats","womens coats"] },

  { id: 27, name: "Heels & Pumps", category: "Women's", type: "Footwear", keywords: ["women","womens","woman","female","lady","girl","feminine","heels","pumps","footwear","shoes","high heels","formal wear","party wear","fashion","style","female fashion","womenswear","women footwear","womens footwear"] },

  { id: 28, name: "Yoga Pants", category: "Women's", type: "Activewear", keywords: ["women","womens","woman","female","lady","girl","feminine","yoga pants","leggings","activewear","gym wear","sportswear","athletic wear","fashion","style","female fashion","womenswear","women activewear","womens activewear"] },

  { id: 29, name: "Silk Blouses", category: "Women's", type: "Blouses", keywords: ["women","womens","woman","female","lady","girl","feminine","blouse","silk blouse","shirt","formal wear","office wear","top","fashion","style","female fashion","womenswear","women blouses","womens blouses"] },

  { id: 30, name: "Denim Shorts", category: "Women's", type: "Shorts", keywords: ["women","womens","woman","female","lady","girl","feminine","denim shorts","shorts","summer wear","casual wear","bottom wear","fashion","style","female fashion","womenswear","women shorts","womens shorts"] },

  { id: 31, name: "Casual Jumpsuits", category: "Women's", type: "Jumpsuits", keywords: ["women","womens","woman","female","lady","girl","feminine","jumpsuit","romper","one piece","casual wear","fashion","style","female fashion","womenswear","women jumpsuits","womens jumpsuits"] },

  { id: 32, name: "Scarves", category: "Women's", type: "Accessories", keywords: ["women","womens","woman","female","lady","girl","feminine","scarf","stole","dupatta","shawl","fashion","style","accessory","female fashion","womenswear","women scarves","womens scarves"] },

  { id: 33, name: "Fashion Leggings", category: "Women's", type: "Leggings", keywords: ["women","womens","woman","female","lady","girl","feminine","leggings","fashion leggings","tights","pants","casual wear","fitness wear","fashion","style","female fashion","womenswear","women leggings","womens leggings"] },

  // ================= KIDS =================
  { id: 34, name: "Graphic Tees", category: "Kids", type: "T-Shirts", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","tshirt","t-shirt","tee","graphic tshirt","graphic tee","top","casual wear","fashion","style","clothing","kidswear","kids t shirts","children t shirts"] },

  { id: 35, name: "Kids Denim", category: "Kids", type: "Jeans", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","jeans","denim","pants","trousers","casual wear","fashion","style","bottom wear","kidswear","kids jeans","children jeans","kids pants"] },

  { id: 36, name: "Party Dresses", category: "Kids", type: "Dresses", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","dress","party dress","frock","gown","casual wear","fashion","style","kidswear","kids dresses","children dresses"] },

  { id: 37, name: "Kids Jackets", category: "Kids", type: "Jackets", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","jacket","coat","winter wear","outerwear","casual wear","fashion","style","kidswear","kids jackets","children jackets"] },

  { id: 38, name: "Cozy Hoodies", category: "Kids", type: "Hoodies", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","hoodie","sweatshirt","pullover","warm","casual wear","fashion","style","kidswear","kids hoodies","children hoodies"] },

  { id: 39, name: "Summer Shorts", category: "Kids", type: "Shorts", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","shorts","casual shorts","summer wear","half pants","fashion","style","kidswear","kids shorts","children shorts"] },

  { id: 40, name: "Sneakers", category: "Kids", type: "Footwear", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","sneakers","shoes","sports shoes","casual wear","fashion","style","kidswear","kids footwear","children footwear"] },

  { id: 41, name: "Joggers", category: "Kids", type: "Pants", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","joggers","trackpants","pants","trousers","casual wear","sportswear","fashion","style","kidswear","kids pants","children pants"] },

  { id: 42, name: "Knit Sweaters", category: "Kids", type: "Sweaters", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","sweater","knit sweater","pullover","warm","winter wear","fashion","style","kidswear","kids sweaters","children sweaters"] },

  { id: 43, name: "Sports Sets", category: "Kids", type: "Activewear", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","sportswear","activewear","gym wear","athletic wear","fashion","style","kidswear","kids activewear","children activewear"] },

  { id: 44, name: "Casual Sweatshirts", category: "Kids", type: "Sweatshirts", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","sweatshirt","hoodie","casual wear","warm","fashion","style","kidswear","kids sweatshirts","children sweatshirts"] },

  { id: 45, name: "Cute Skirts", category: "Kids", type: "Skirts", keywords: ["kids","kid","child","children","girl","baby","toddler","skirt","cute skirt","dress","fashion","style","casual wear","kidswear","kids skirts","children skirts"] },

  { id: 46, name: "Kids Polos", category: "Kids", type: "Polo Shirts", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","polo","polo shirt","tshirt","shirt","casual wear","fashion","style","kidswear","kids polo shirts","children polo shirts"] },

  { id: 47, name: "Winter Coats", category: "Kids", type: "Coats", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","coat","winter coat","jacket","warm","outerwear","fashion","style","kidswear","kids coats","children coats"] },

  { id: 48, name: "Denim Overalls", category: "Kids", type: "Overalls", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","denim overalls","dungaree","pants","trousers","casual wear","fashion","style","kidswear","kids overalls","children overalls"] },

  { id: 49, name: "Caps & Hats", category: "Kids", type: "Accessories", keywords: ["kids","kid","child","children","boy","girl","baby","toddler","cap","hat","headwear","accessories","fashion","style","kidswear","kids caps","children hats"] }
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
    navigate(`/category/${item.category}-${item.name}`);
  };

  const handleCollectionClick = (collectionName) => {
    const urlPath = collectionName.toLowerCase().replace(/\s+/g, "");
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
            placeholder="Search for men, women, kids clothing..."
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
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.category} {item.name}</p>
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