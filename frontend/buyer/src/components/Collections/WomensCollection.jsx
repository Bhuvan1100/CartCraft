// WomensCollections.jsx
import Mainmarket from "../Shop/Mainmarket";

export default function WomensCollections(){
    const womensCollectionsData = [
  {
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&q=80",
    category: "Dresses",
    name: "Summer Dresses",
    itemCount: "200+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&q=80",
    category: "Tops",
    name: "Casual Tops",
    itemCount: "250+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=400&q=80",
    category: "Jeans",
    name: "Skinny Jeans",
    itemCount: "180+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
    category: "Handbags",
    name: "Designer Handbags",
    itemCount: "120+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&q=80",
    category: "Skirts",
    name: "Mini Skirts",
    itemCount: "90+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=400&q=80",
    category: "Jackets",
    name: "Blazers",
    itemCount: "110+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&q=80",
    category: "Sweaters",
    name: "Knit Sweaters",
    itemCount: "140+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1585487000143-3b3a326f0361?w=400&q=80",
    category: "Pants",
    name: "Wide Leg Pants",
    itemCount: "95+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
    category: "Coats",
    name: "Winter Coats",
    itemCount: "75+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&q=80",
    category: "Footwear",
    name: "Heels & Pumps",
    itemCount: "160+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=400&q=80",
    category: "Activewear",
    name: "Yoga Pants",
    itemCount: "130+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&q=80",
    category: "Blouses",
    name: "Silk Blouses",
    itemCount: "105+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80",
    category: "Shorts",
    name: "Denim Shorts",
    itemCount: "85+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=400&q=80",
    category: "Jumpsuits",
    name: "Casual Jumpsuits",
    itemCount: "65+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&q=80",
    category: "Accessories",
    name: "Scarves",
    itemCount: "100+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=400&q=80",
    category: "Leggings",
    name: "Fashion Leggings",
    itemCount: "150+ styles"
  }
];

 return(
    <>
        <Mainmarket heading="Womens Collection" productData={womensCollectionsData} />
    </>
 )
}