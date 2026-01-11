import Mainmarket from "../Shop/Mainmarket";

export default function MensCollections(){
    const menCollectionsData = [
  {
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
    category: "Jackets",
    name: "Leather Jackets",
    itemCount: "120+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
    category: "Jeans",
    name: "Slim Fit Jeans",
    itemCount: "150+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80",
    category: "Pants",
    name: "Chino Pants",
    itemCount: "90+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
    category: "Shirts",
    name: "Formal Shirts",
    itemCount: "180+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80",
    category: "Polo Shirts",
    name: "Polo T-Shirts",
    itemCount: "110+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
    category: "Hoodies",
    name: "Winter Hoodies",
    itemCount: "140+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
    category: "Blazers",
    name: "Tailored Blazers",
    itemCount: "70+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
    category: "Sweaters",
    name: "Wool Sweaters",
    itemCount: "85+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80",
    category: "Cargo Pants",
    name: "Cargo Pants",
    itemCount: "95+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
    category: "Jackets",
    name: "Bomber Jackets",
    itemCount: "60+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80",
    category: "Trackpants",
    name: "Jogger Trackpants",
    itemCount: "130+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
    category: "Vests",
    name: "Puffer Vests",
    itemCount: "55+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80",
    category: "Shorts",
    name: "Casual Shorts",
    itemCount: "100+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80",
    category: "Coats",
    name: "Trench Coats",
    itemCount: "40+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80",
    category: "T-Shirts",
    name: "Henley T-Shirts",
    itemCount: "160+ styles"
  },
  {
    image: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400&q=80",
    category: "Dress Pants",
    name: "Formal Trousers",
    itemCount: "75+ styles"
  }
];


 return(
    <>
        <Mainmarket heading="Mens Collection" productData={menCollectionsData} />
    </>
 )
}