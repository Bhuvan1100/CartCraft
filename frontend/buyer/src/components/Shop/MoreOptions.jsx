import React from "react";
import CategoryCard from "../Cards/Card1";

const MoreOptions = ({ name="" }) => {
  const categories = {
    Kids: {
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
      category: "Kids Collection",
      name: "Kids Fashion",
      itemCount: "120+ styles"
    },
    Mens: {
      image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&q=80",
      category: "Mens Collection",
      name: "Mens Fashion",
      itemCount: "180+ styles"
    },
    Womens: {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
      category: "Womens Collection",
      name: "Womens Fashion",
      itemCount: "200+ styles"
    }
  };

  const otherCategories = Object.keys(categories).filter(
    (cat) => cat.toLowerCase() !== name.toLowerCase()
  );

  const handleCategoryClick = (categoryName) => {
    console.log(`Navigate to ${categoryName} Collection`);
    // router.push(`/collections/${categoryName.toLowerCase()}`)
  };

  return (
    <div className="w-2/3 max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Explore More Collections
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {otherCategories.map((key) => {
          const data = categories[key];
          return (
            <div key={key} onClick={() => handleCategoryClick(key)}>
              <CategoryCard {...data} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoreOptions;
