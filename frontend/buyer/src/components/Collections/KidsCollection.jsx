// KidsCollections.jsx
import Mainmarket from "../Shop/Mainmarket";

export default function KidsCollections(){
    const kidsCollectionsData = [
  {
    image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400&q=80",
    category: "T-Shirts",
    name: "Graphic Tees",
    itemCount: "180+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80",
    category: "Jeans",
    name: "Kids Denim",
    itemCount: "120+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&q=80",
    category: "Dresses",
    name: "Party Dresses",
    itemCount: "150+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc62a?w=400&q=80",
    category: "Jackets",
    name: "Kids Jackets",
    itemCount: "90+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80",
    category: "Hoodies",
    name: "Cozy Hoodies",
    itemCount: "140+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1514090458221-6e4fd9a19479?w=400&q=80",
    category: "Shorts",
    name: "Summer Shorts",
    itemCount: "110+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80",
    category: "Footwear",
    name: "Sneakers",
    itemCount: "160+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80",
    category: "Pants",
    name: "Joggers",
    itemCount: "100+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&q=80",
    category: "Sweaters",
    name: "Knit Sweaters",
    itemCount: "85+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80",
    category: "Activewear",
    name: "Sports Sets",
    itemCount: "130+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=400&q=80",
    category: "Sweatshirts",
    name: "Casual Sweatshirts",
    itemCount: "95+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1612967303614-b0e4836b9edc?w=400&q=80",
    category: "Skirts",
    name: "Cute Skirts",
    itemCount: "70+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1555488205-44d5f160e3f5?w=400&q=80",
    category: "Polo Shirts",
    name: "Kids Polos",
    itemCount: "80+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400&q=80",
    category: "Coats",
    name: "Winter Coats",
    itemCount: "60+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1624378440070-7b150139d056?w=400&q=80",
    category: "Overalls",
    name: "Denim Overalls",
    itemCount: "55+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&q=80",
    category: "Accessories",
    name: "Caps & Hats",
    itemCount: "120+ styles"
  }
];

 return(
    <>
        <Mainmarket heading="Kids Collection" productData={kidsCollectionsData} />
    </>
 )
}