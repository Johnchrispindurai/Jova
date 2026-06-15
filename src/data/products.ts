import type { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    "id": "1",
    "name": "Essential Oxford Shirt",
    "price": 2499,
    "description": "A classic, regular-fit button-down shirt woven from premium long-staple combed cotton oxford. Finished with a neat button-down collar.",
    "category": "men",
    "subcategory": "Shirts",
    "images": [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      },
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.1,
    "reviews": [
      {
        "id": "rev_1_1",
        "userName": "Dev K.",
        "rating": 4,
        "date": "2026-05-11",
        "comment": "Pure luxury. Butter soft fabric. Fits beautifully."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "100% Combed Cotton Oxford",
      "Button-down collar",
      "Machine wash warm"
    ],
    "badge": "New"
  },
  {
    "id": "2",
    "name": "Slim Fit Linen Shirt",
    "price": 2999,
    "description": "Woven from premium French flax linen, this shirt offers breezy comfort on warm days. Tailored in a modern slim silhouette.",
    "category": "men",
    "subcategory": "Shirts",
    "images": [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      },
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.2,
    "reviews": [
      {
        "id": "rev_2_1",
        "userName": "Rohan M.",
        "rating": 4,
        "date": "2026-05-12",
        "comment": "Exceptional drape and fit. Looks very high-end."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "100% French Flax Linen",
      "Breathable band collar",
      "Machine wash cold, hang dry"
    ],
    "badge": "Trending"
  },
  {
    "id": "3",
    "name": "Classic Cotton Poplin Shirt",
    "price": 2799,
    "description": "A lightweight formal shirt crafted from dense, crisp cotton poplin. Perfect for corporate attire or smart dressing.",
    "category": "men",
    "subcategory": "Shirts",
    "images": [
      "https://images.unsplash.com/photo-1499971856191-1a1203a03a78?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#111111"
      },
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.3,
    "reviews": [
      {
        "id": "rev_3_1",
        "userName": "Neil P.",
        "rating": 4,
        "date": "2026-05-13",
        "comment": "Extremely clean design. Better quality than designers twice the price."
      },
      {
        "id": "rev_3_2",
        "userName": "Sophie M.",
        "rating": 5,
        "date": "2026-06-03",
        "comment": "Extremely chic. Drape is incredibly clean and structured."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": false,
    "isFeatured": true,
    "details": [
      "100% Cotton Poplin",
      "Spread collar",
      "Easy-iron finish",
      "Machine wash cold"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "4",
    "name": "Relaxed Fit Utility Overshirt",
    "price": 3499,
    "description": "A rugged yet refined utility overshirt in heavy cotton twill, featuring chest patch pockets and a button-front closure.",
    "category": "men",
    "subcategory": "Shirts",
    "images": [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550412931-4355a5b51d2f?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      },
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.4,
    "reviews": [
      {
        "id": "rev_4_1",
        "userName": "Priya R.",
        "rating": 4,
        "date": "2026-05-14",
        "comment": "Absolutely stunning piece. The drape is incredibly flattering."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": true,
    "details": [
      "100% Cotton Twill (320gsm)",
      "Two buttoned chest pocket details",
      "Machine wash cold inside out"
    ]
  },
  {
    "id": "5",
    "name": "Grandad Collar Linen Shirt",
    "price": 2999,
    "description": "Lightweight pure linen shirt with a modern band collar and regular fit. garment-washed for a softer handle.",
    "category": "men",
    "subcategory": "Shirts",
    "images": [
      "https://images.unsplash.com/photo-1524250502761-136f9002274b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf8?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      },
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.5,
    "reviews": [
      {
        "id": "rev_5_1",
        "userName": "Ananya V.",
        "rating": 4,
        "date": "2026-05-15",
        "comment": "The cut is so chic! Extremely flattering and high quality fabric."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% French Flax Linen",
      "Grandad style collar",
      "Wash cold, air dry"
    ],
    "badge": "New"
  },
  {
    "id": "6",
    "name": "Premium Silk-Blend Shirt",
    "price": 4499,
    "description": "An elegant drape shirt with a smooth silk-combed cotton blend fabric. Ideal for evening campaigns and formal settings.",
    "category": "men",
    "subcategory": "Shirts",
    "images": [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      },
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.6,
    "reviews": [
      {
        "id": "rev_6_1",
        "userName": "Sophie M.",
        "rating": 4,
        "date": "2026-05-16",
        "comment": "Extremely chic. Drape is incredibly clean and structured."
      },
      {
        "id": "rev_6_2",
        "userName": "Armaan K.",
        "rating": 5,
        "date": "2026-06-06",
        "comment": "Clean, elegant, minimal design. Highly recommend."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "70% Cotton, 30% Mulberry Silk",
      "Soft pointed collar",
      "Dry clean recommended"
    ],
    "badge": "Trending"
  },
  {
    "id": "7",
    "name": "Tailored Corduroy Shirt",
    "price": 3299,
    "description": "Fine-wale cotton corduroy shirt tailored for a smart-casual silhouette. Warm, textured, and incredibly durable.",
    "category": "men",
    "subcategory": "Shirts",
    "images": [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603252109303-2751441dd158?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620012253295-c05cdee5e0b3?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      },
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.7,
    "reviews": [
      {
        "id": "rev_7_1",
        "userName": "Kavita L.",
        "rating": 4,
        "date": "2026-05-17",
        "comment": "Perfect finish, structured form looks extremely clean."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Cotton Fine Corduroy",
      "Single chest pocket",
      "Wash with similar colors"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "8",
    "name": "Striped Seersucker Shirt",
    "price": 2699,
    "description": "Lightweight, crinkled seersucker fabric shirt. Ideal for tropical climates, maintaining dry, breathable comfort.",
    "category": "men",
    "subcategory": "Shirts",
    "images": [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620012253295-c05cdee5e0b2?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      },
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.8,
    "reviews": [
      {
        "id": "rev_8_1",
        "userName": "Aditya V.",
        "rating": 4,
        "date": "2026-05-18",
        "comment": "Bespoke tailoring level fit. Very smart details."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Organic Cotton Seersucker",
      "Button-down collar",
      "No-iron texture",
      "Machine wash cold"
    ]
  },
  {
    "id": "9",
    "name": "Oversized Heavyweight Tee",
    "price": 1699,
    "description": "Crafted from heavy 240gsm cotton jersey, this oversized tee features a clean, minimal streetwear fit with tight crew neck.",
    "category": "men",
    "subcategory": "T-Shirts",
    "images": [
      "https://images.unsplash.com/photo-1489980508314-941910ded1f4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514989940723-e8e5163ccbe8?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      },
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.9,
    "reviews": [
      {
        "id": "rev_9_1",
        "userName": "Armaan K.",
        "rating": 4,
        "date": "2026-05-19",
        "comment": "Clean, elegant, minimal design. Highly recommend."
      },
      {
        "id": "rev_9_2",
        "userName": "Rohan M.",
        "rating": 5,
        "date": "2026-06-09",
        "comment": "Exceptional drape and fit. Looks very high-end."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "100% Organic Cotton (240gsm)",
      "Ribbed crew neck",
      "Machine wash cold"
    ],
    "badge": "New"
  },
  {
    "id": "10",
    "name": "Premium Pima Cotton Tee",
    "price": 1499,
    "description": "Extremely soft, long-staple Pima cotton tee with a tailored modern fit. Holds shape and color through washes.",
    "category": "men",
    "subcategory": "T-Shirts",
    "images": [
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      },
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.0,
    "reviews": [
      {
        "id": "rev_10_1",
        "userName": "Kabir S.",
        "rating": 4,
        "date": "2026-05-20",
        "comment": "Excellent quality fabric, fits true to size. Perfect for smart-casual wear."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Supima Cotton",
      "Silk-smooth texture",
      "Machine wash warm"
    ],
    "badge": "Trending"
  },
  {
    "id": "11",
    "name": "Minimalist Mercerized T-Shirt",
    "price": 1999,
    "description": "Double-mercerized t-shirt offering a subtle lustrous sheen and a structured silhouette. Suitable for dressing up under blazers.",
    "category": "men",
    "subcategory": "T-Shirts",
    "images": [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1569074187119-c87815b476da?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      },
      {
        "name": "Matte Black",
        "hex": "#111111"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.1,
    "reviews": [
      {
        "id": "rev_11_1",
        "userName": "Dev K.",
        "rating": 4,
        "date": "2026-05-21",
        "comment": "Pure luxury. Butter soft fabric. Fits beautifully."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": false,
    "isFeatured": true,
    "details": [
      "100% Mercerized Cotton",
      "High neck crew collar",
      "Cold hand wash or dry clean"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "12",
    "name": "Relaxed Graphic T-Shirt",
    "price": 1699,
    "description": "A relaxed fit cotton tee featuring a small, clean typographic chest print. Laid-back streetwear aesthetic.",
    "category": "men",
    "subcategory": "T-Shirts",
    "images": [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      },
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.2,
    "reviews": [
      {
        "id": "rev_12_1",
        "userName": "Rohan M.",
        "rating": 4,
        "date": "2026-05-22",
        "comment": "Exceptional drape and fit. Looks very high-end."
      },
      {
        "id": "rev_12_2",
        "userName": "Ananya V.",
        "rating": 5,
        "date": "2026-06-12",
        "comment": "The cut is so chic! Extremely flattering and high quality fabric."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": true,
    "details": [
      "100% Combed Cotton",
      "High-density front print",
      "Machine wash cold inside out"
    ]
  },
  {
    "id": "13",
    "name": "Slub Cotton V-Neck Tee",
    "price": 1299,
    "description": "Textured slub-yarn cotton tee in a comfortable v-neck cut. Breathable fabric with a slightly uneven, natural weave.",
    "category": "men",
    "subcategory": "T-Shirts",
    "images": [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      },
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.3,
    "reviews": [
      {
        "id": "rev_13_1",
        "userName": "Neil P.",
        "rating": 4,
        "date": "2026-05-23",
        "comment": "Extremely clean design. Better quality than designers twice the price."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Slub Cotton",
      "Soft V-neckline",
      "Machine wash cold"
    ],
    "badge": "New"
  },
  {
    "id": "14",
    "name": "Organic Cotton Pocket Tee",
    "price": 1399,
    "description": "Classic crewneck t-shirt with a single patch pocket at the chest. Soft, organic combed cotton for everyday comfort.",
    "category": "men",
    "subcategory": "T-Shirts",
    "images": [
      "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      },
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.4,
    "reviews": [
      {
        "id": "rev_14_1",
        "userName": "Priya R.",
        "rating": 4,
        "date": "2026-05-24",
        "comment": "Absolutely stunning piece. The drape is incredibly flattering."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Certified Organic Cotton",
      "Chest pocket",
      "Machine wash warm"
    ],
    "badge": "Trending"
  },
  {
    "id": "15",
    "name": "Premium Cotton Polo",
    "price": 1999,
    "description": "Refined knit polo shirt in double-mercerized cotton. Features a stable ribbed collar and clean 3-button placket.",
    "category": "men",
    "subcategory": "Polos",
    "images": [
      "https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137984525-63e75a8507c9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626497764746-6dc364469558?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#111111"
      },
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.5,
    "reviews": [
      {
        "id": "rev_15_1",
        "userName": "Ananya V.",
        "rating": 4,
        "date": "2026-05-25",
        "comment": "The cut is so chic! Extremely flattering and high quality fabric."
      },
      {
        "id": "rev_15_2",
        "userName": "Aditya V.",
        "rating": 5,
        "date": "2026-06-01",
        "comment": "Bespoke tailoring level fit. Very smart details."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "100% Pima Cotton",
      "Double-mercerized luster",
      "Side-slit hem",
      "Wash flat"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "16",
    "name": "Fine-Knit Zip Polo",
    "price": 2499,
    "description": "Modern knit polo with a zip-up metal closure instead of traditional buttons. Sleek and smart fashion choice.",
    "category": "men",
    "subcategory": "Polos",
    "images": [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      },
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.6,
    "reviews": [
      {
        "id": "rev_16_1",
        "userName": "Sophie M.",
        "rating": 4,
        "date": "2026-05-26",
        "comment": "Extremely chic. Drape is incredibly clean and structured."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "85% Cotton, 15% Nylon knit",
      "YKK metal zipper pull",
      "Hand wash cold, dry flat"
    ]
  },
  {
    "id": "17",
    "name": "Textured Silk-Cotton Polo",
    "price": 3999,
    "description": "A luxurious blend of silk and cotton knit in a textured stitch. Superbly soft feel and elegant drape.",
    "category": "men",
    "subcategory": "Polos",
    "images": [
      "https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      },
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.7,
    "reviews": [
      {
        "id": "rev_17_1",
        "userName": "Kavita L.",
        "rating": 4,
        "date": "2026-05-27",
        "comment": "Perfect finish, structured form looks extremely clean."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": true,
    "details": [
      "55% Silk, 45% Cotton",
      "Ribbed collar and cuffs",
      "Dry clean or delicate hand wash"
    ],
    "badge": "New"
  },
  {
    "id": "18",
    "name": "Mercerized Pique Polo",
    "price": 2299,
    "description": "Premium pique knit polo shirt featuring a soft collar and classic tennis tail. Crisp structured smart fit.",
    "category": "men",
    "subcategory": "Polos",
    "images": [
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      },
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.8,
    "reviews": [
      {
        "id": "rev_18_1",
        "userName": "Aditya V.",
        "rating": 4,
        "date": "2026-05-28",
        "comment": "Bespoke tailoring level fit. Very smart details."
      },
      {
        "id": "rev_18_2",
        "userName": "Dev K.",
        "rating": 5,
        "date": "2026-06-04",
        "comment": "Pure luxury. Butter soft fabric. Fits beautifully."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": true,
    "details": [
      "100% Mercerized Pique Cotton",
      "Ribbed cuffs",
      "Machine wash cold"
    ],
    "badge": "Trending"
  },
  {
    "id": "19",
    "name": "Tailored Formal Trousers",
    "price": 3499,
    "description": "Elegant formal trousers tailored in a lightweight, crease-resistant wool blend. Features single front pleats.",
    "category": "men",
    "subcategory": "Trousers",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551854838-212c50b4c184?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      },
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.9,
    "reviews": [
      {
        "id": "rev_19_1",
        "userName": "Armaan K.",
        "rating": 4,
        "date": "2026-05-29",
        "comment": "Clean, elegant, minimal design. Highly recommend."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "55% Polyester, 40% Virgin Wool, 5% Elastane",
      "Concealed hook-and-bar fly",
      "Dry clean only"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "20",
    "name": "Relaxed Fit Chinos",
    "price": 2799,
    "description": "A classic everyday chino crafted from stretch-cotton twill. Relaxed fit through the thigh with a tapered leg.",
    "category": "men",
    "subcategory": "Trousers",
    "images": [
      "https://images.unsplash.com/photo-1536243298747-ea8874136d64?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      },
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.0,
    "reviews": [
      {
        "id": "rev_20_1",
        "userName": "Kabir S.",
        "rating": 4,
        "date": "2026-05-10",
        "comment": "Excellent quality fabric, fits true to size. Perfect for smart-casual wear."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "98% Cotton, 2% Elastane twill",
      "Slanted side pockets",
      "Machine wash warm"
    ]
  },
  {
    "id": "21",
    "name": "Slim Fit Cotton Chinos",
    "price": 2799,
    "description": "Clean-cut slim fit chinos in premium stretch cotton. Perfect smart-casual bottoms for the modern silhouette.",
    "category": "men",
    "subcategory": "Trousers",
    "images": [
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      },
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.1,
    "reviews": [
      {
        "id": "rev_21_1",
        "userName": "Dev K.",
        "rating": 4,
        "date": "2026-05-11",
        "comment": "Pure luxury. Butter soft fabric. Fits beautifully."
      },
      {
        "id": "rev_21_2",
        "userName": "Priya R.",
        "rating": 5,
        "date": "2026-06-07",
        "comment": "Absolutely stunning piece. The drape is incredibly flattering."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "97% Cotton, 3% Spandex",
      "Sleek welt back pockets",
      "Machine wash cold"
    ],
    "badge": "New"
  },
  {
    "id": "22",
    "name": "Pleated Wool-Blend Trousers",
    "price": 4299,
    "description": "Mid-weight wool-blend trousers with sharp front pleats and side belt tab adjusters. Truly bespoke aesthetics.",
    "category": "men",
    "subcategory": "Trousers",
    "images": [
      "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a902?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a903?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      },
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.2,
    "reviews": [
      {
        "id": "rev_22_1",
        "userName": "Rohan M.",
        "rating": 4,
        "date": "2026-05-12",
        "comment": "Exceptional drape and fit. Looks very high-end."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "60% Virgin Wool, 40% Polyester",
      "Adjustable side tabs",
      "Unhemmed finish for custom length",
      "Dry clean"
    ],
    "badge": "Trending"
  },
  {
    "id": "23",
    "name": "Drawstring Linen Trousers",
    "price": 3299,
    "description": "Breezy and relaxed trousers woven from premium linen. Features an elasticated waist with drawcord.",
    "category": "men",
    "subcategory": "Trousers",
    "images": [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae81?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3248?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      },
      {
        "name": "Matte Black",
        "hex": "#111111"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.3,
    "reviews": [
      {
        "id": "rev_23_1",
        "userName": "Neil P.",
        "rating": 4,
        "date": "2026-05-13",
        "comment": "Extremely clean design. Better quality than designers twice the price."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "100% Linen",
      "Elastic waistband with cotton drawcord",
      "Wash cold, hang dry"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "24",
    "name": "Utility Cargo Pants",
    "price": 3499,
    "description": "Modern cargo pants with discrete flat pockets on the sides. Durable cotton ripstop fabric with relaxed straight leg.",
    "category": "men",
    "subcategory": "Trousers",
    "images": [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      },
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.4,
    "reviews": [
      {
        "id": "rev_24_1",
        "userName": "Priya R.",
        "rating": 4,
        "date": "2026-05-14",
        "comment": "Absolutely stunning piece. The drape is incredibly flattering."
      },
      {
        "id": "rev_24_2",
        "userName": "Kavita L.",
        "rating": 5,
        "date": "2026-06-10",
        "comment": "Perfect finish, structured form looks extremely clean."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Cotton Ripstop",
      "Flat cargo side utility pockets",
      "Machine wash cold"
    ]
  },
  {
    "id": "25",
    "name": "Classic Denim Jeans",
    "price": 3299,
    "description": "Five-pocket denim jeans made from durable heavyweight indigo cotton. Classic straight fit with minor stretch.",
    "category": "men",
    "subcategory": "Jeans",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2af?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551854838-212c50b4c185?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a904?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      },
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.5,
    "reviews": [
      {
        "id": "rev_25_1",
        "userName": "Ananya V.",
        "rating": 4,
        "date": "2026-05-15",
        "comment": "The cut is so chic! Extremely flattering and high quality fabric."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "99% Cotton, 1% Elastane denim",
      "Indigo dye",
      "Button fly",
      "Wash inside out"
    ]
  },
  {
    "id": "26",
    "name": "Slim Fit Stretch Jeans",
    "price": 3299,
    "description": "Tailored slim fit jeans in a soft washed black denim with high stretch retention. Modern comfortable everyday fit.",
    "category": "men",
    "subcategory": "Jeans",
    "images": [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      },
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.6,
    "reviews": [
      {
        "id": "rev_26_1",
        "userName": "Sophie M.",
        "rating": 4,
        "date": "2026-05-16",
        "comment": "Extremely chic. Drape is incredibly clean and structured."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "92% Cotton, 6% Polyester, 2% Spandex",
      "Zip fly closure",
      "Machine wash cold inside out"
    ]
  },
  {
    "id": "27",
    "name": "Relaxed Straight-Leg Jeans",
    "price": 3499,
    "description": "90s-inspired relaxed fit denim jeans with a wider leg opening. Premium washed indigo cotton for a soft hand.",
    "category": "men",
    "subcategory": "Jeans",
    "images": [
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511130558045-c3328575e4bb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#111111"
      },
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.7,
    "reviews": [
      {
        "id": "rev_27_1",
        "userName": "Kavita L.",
        "rating": 4,
        "date": "2026-05-17",
        "comment": "Perfect finish, structured form looks extremely clean."
      },
      {
        "id": "rev_27_2",
        "userName": "Kabir S.",
        "rating": 5,
        "date": "2026-06-13",
        "comment": "Excellent quality fabric, fits true to size. Perfect for smart-casual wear."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Cotton rigid denim",
      "Faded vintage wash",
      "Machine wash hot"
    ]
  },
  {
    "id": "28",
    "name": "Selvedge Raw Denim Jeans",
    "price": 4999,
    "description": "Premium selvedge denim jeans. Woven on traditional shuttle looms. Left unwashed to break in uniquely to your body.",
    "category": "men",
    "subcategory": "Jeans",
    "images": [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3247?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      },
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.8,
    "reviews": [
      {
        "id": "rev_28_1",
        "userName": "Aditya V.",
        "rating": 4,
        "date": "2026-05-18",
        "comment": "Bespoke tailoring level fit. Very smart details."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Cotton Selvedge Denim",
      "Raw unwashed indigo",
      "Do not wash frequently, spot clean"
    ]
  },
  {
    "id": "29",
    "name": "Minimal Knit Sweater",
    "price": 3999,
    "description": "A soft knit crewneck sweater crafted from fine wool. Clean silhouette with ribbed finishes.",
    "category": "men",
    "subcategory": "Knitwear",
    "images": [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      },
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.9,
    "reviews": [
      {
        "id": "rev_29_1",
        "userName": "Armaan K.",
        "rating": 4,
        "date": "2026-05-19",
        "comment": "Clean, elegant, minimal design. Highly recommend."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Merino Wool",
      "Seamless knit construction",
      "Hand wash cold, dry flat"
    ]
  },
  {
    "id": "30",
    "name": "Cashmere Crewneck Sweater",
    "price": 7999,
    "description": "Ultra-soft grade-A cashmere crewneck sweater. Offers exceptional warmth and a buttery-soft texture.",
    "category": "men",
    "subcategory": "Knitwear",
    "images": [
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511130558045-c3328575e4bb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8909?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      },
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.0,
    "reviews": [
      {
        "id": "rev_30_1",
        "userName": "Kabir S.",
        "rating": 4,
        "date": "2026-05-20",
        "comment": "Excellent quality fabric, fits true to size. Perfect for smart-casual wear."
      },
      {
        "id": "rev_30_2",
        "userName": "Neil P.",
        "rating": 5,
        "date": "2026-06-02",
        "comment": "Extremely clean design. Better quality than designers twice the price."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Cashmere",
      "Premium 12-gauge knit",
      "Dry clean only"
    ]
  },
  {
    "id": "31",
    "name": "Fine Merino Wool Cardigan",
    "price": 4999,
    "description": "V-neck cardigan sweater crafted in premium merino wool. Features faux-horn button closures and sleek welt pockets.",
    "category": "men",
    "subcategory": "Knitwear",
    "images": [
      "https://images.unsplash.com/photo-1501127122-f385ca6ddd96?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      },
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.1,
    "reviews": [
      {
        "id": "rev_31_1",
        "userName": "Dev K.",
        "rating": 4,
        "date": "2026-05-21",
        "comment": "Pure luxury. Butter soft fabric. Fits beautifully."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Extra-Fine Merino Wool",
      "V-neck profile",
      "Horn-effect buttons",
      "Hand wash cold"
    ]
  },
  {
    "id": "32",
    "name": "Cable-Knit Mock-Neck Sweater",
    "price": 4499,
    "description": "Heavyweight cable-knit mock-neck sweater. Textured winter piece with elegant cable detailing and warm insulation.",
    "category": "men",
    "subcategory": "Knitwear",
    "images": [
      "https://images.unsplash.com/photo-1524250502761-136f9002274b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550412931-4355a5b51d2f?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      },
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.2,
    "reviews": [
      {
        "id": "rev_32_1",
        "userName": "Rohan M.",
        "rating": 4,
        "date": "2026-05-22",
        "comment": "Exceptional drape and fit. Looks very high-end."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "70% Wool, 30% Acrylic",
      "Thick cable stitch",
      "Mock neckline",
      "Hand wash"
    ]
  },
  {
    "id": "33",
    "name": "Zip-Up Bomber Jacket",
    "price": 4999,
    "description": "Classic bomber jacket in matte technical fabric. Elasticated cuffs and hem, complete with zippered arm details.",
    "category": "men",
    "subcategory": "Jackets",
    "images": [
      "https://images.unsplash.com/photo-1611601679655-7c8bc197f0c6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611601679949-74d115fa016c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3614a?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      },
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.3,
    "reviews": [
      {
        "id": "rev_33_1",
        "userName": "Neil P.",
        "rating": 4,
        "date": "2026-05-23",
        "comment": "Extremely clean design. Better quality than designers twice the price."
      },
      {
        "id": "rev_33_2",
        "userName": "Sophie M.",
        "rating": 5,
        "date": "2026-06-05",
        "comment": "Extremely chic. Drape is incredibly clean and structured."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Nylon shell, Polyester lining",
      "Water-resistant coating",
      "Ribbed collar",
      "Machine wash cold"
    ]
  },
  {
    "id": "34",
    "name": "Premium Leather Biker Jacket",
    "price": 9999,
    "description": "Classic asymmetrical leather jacket crafted from supple full-grain sheepskin. Heavy metal hardware details.",
    "category": "men",
    "subcategory": "Jackets",
    "images": [
      "https://images.unsplash.com/photo-1620012253000-880c5cefac5d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621072156002-e2fcc10d7875?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622445229267-be086d061c56?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      },
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.4,
    "reviews": [
      {
        "id": "rev_34_1",
        "userName": "Priya R.",
        "rating": 4,
        "date": "2026-05-24",
        "comment": "Absolutely stunning piece. The drape is incredibly flattering."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Genuine Sheepskin Leather",
      "Polyester satin lining",
      "YKK heavy zippers",
      "Professional leather clean only"
    ]
  },
  {
    "id": "35",
    "name": "Overshirt Utility Jacket",
    "price": 4499,
    "description": "A structured jacket with utility pockets and premium horn buttons. Made in thick, durable cotton canvas.",
    "category": "men",
    "subcategory": "Jackets",
    "images": [
      "https://images.unsplash.com/photo-1623164973347-bf843b0d2685?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625413156686-27bc89d2d854?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627225925345-552d49cf47ae?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      },
      {
        "name": "Matte Black",
        "hex": "#111111"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.5,
    "reviews": [
      {
        "id": "rev_35_1",
        "userName": "Ananya V.",
        "rating": 4,
        "date": "2026-05-25",
        "comment": "The cut is so chic! Extremely flattering and high quality fabric."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Heavy Cotton Canvas",
      "Four patch pockets",
      "Unlined for lightweight layering"
    ]
  },
  {
    "id": "36",
    "name": "Classic Trench Coat",
    "price": 7999,
    "description": "Double-breasted gabardine trench coat with a waist belt and storm flaps. Timeless silhouette for wet and cold seasons.",
    "category": "men",
    "subcategory": "Outerwear",
    "images": [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548624149-f7b2e65922b1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      },
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.6,
    "reviews": [
      {
        "id": "rev_36_1",
        "userName": "Sophie M.",
        "rating": 4,
        "date": "2026-05-26",
        "comment": "Extremely chic. Drape is incredibly clean and structured."
      },
      {
        "id": "rev_36_2",
        "userName": "Armaan K.",
        "rating": 5,
        "date": "2026-06-08",
        "comment": "Clean, elegant, minimal design. Highly recommend."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "65% Cotton, 35% Polyester Gabardine",
      "Belted waist",
      "Storm flap detail",
      "Dry clean only"
    ]
  },
  {
    "id": "37",
    "name": "Water-Resistant Technical Parka",
    "price": 8999,
    "description": "Minimalist insulated winter parka with a concealed hood and taped seams. Designed for harsh weather conditions.",
    "category": "men",
    "subcategory": "Outerwear",
    "images": [
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      },
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.7,
    "reviews": [
      {
        "id": "rev_37_1",
        "userName": "Kavita L.",
        "rating": 4,
        "date": "2026-05-27",
        "comment": "Perfect finish, structured form looks extremely clean."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Recycled Polyester shell",
      "Duck down alternative insulation",
      "Taped windproof seams",
      "Machine wash cold"
    ]
  },
  {
    "id": "38",
    "name": "Suede Trucker Jacket",
    "price": 8499,
    "description": "Premium trucker jacket crafted in fine goat suede leather. Features classic chest flaps and snap button front.",
    "category": "men",
    "subcategory": "Jackets",
    "images": [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f11?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      },
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.8,
    "reviews": [
      {
        "id": "rev_38_1",
        "userName": "Aditya V.",
        "rating": 4,
        "date": "2026-05-28",
        "comment": "Bespoke tailoring level fit. Very smart details."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Goat Suede Leather",
      "Lined sleeves",
      "Professional suede clean only"
    ],
    "badge": "Limited Edition"
  },
  {
    "id": "39",
    "name": "Wool Blend Blazer",
    "price": 6999,
    "description": "A structured slim-cut blazer jacket crafted from premium wool-blend twill. Notch lapels and double-vent back.",
    "category": "men",
    "subcategory": "Suits",
    "images": [
      "https://images.unsplash.com/photo-1618886614638-80e3c103d314?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#111111"
      },
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.9,
    "reviews": [
      {
        "id": "rev_39_1",
        "userName": "Armaan K.",
        "rating": 4,
        "date": "2026-05-29",
        "comment": "Clean, elegant, minimal design. Highly recommend."
      },
      {
        "id": "rev_39_2",
        "userName": "Rohan M.",
        "rating": 5,
        "date": "2026-06-11",
        "comment": "Exceptional drape and fit. Looks very high-end."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "60% Wool, 38% Polyester, 2% Spandex",
      "Half-canvas construction",
      "Dry clean only"
    ]
  },
  {
    "id": "40",
    "name": "Double-Breasted Suit Jacket",
    "price": 8499,
    "description": "Elegant double-breasted formal blazer. Sharp peak lapels, gold-toned button accents, and premium structured fit.",
    "category": "men",
    "subcategory": "Suits",
    "images": [
      "https://images.unsplash.com/photo-1617137968427-85924c800a23?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      },
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.0,
    "reviews": [
      {
        "id": "rev_40_1",
        "userName": "Kabir S.",
        "rating": 4,
        "date": "2026-05-10",
        "comment": "Excellent quality fabric, fits true to size. Perfect for smart-casual wear."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "70% Polyester, 30% Viscose crepe",
      "Peak lapels",
      "Satin inner lining",
      "Dry clean"
    ]
  },
  {
    "id": "41",
    "name": "Structured Linen Blazer",
    "price": 5999,
    "description": "Lightweight, unlined linen blazer. Offers a relaxed, sophisticated silhouette for warm-weather formal campaigns.",
    "category": "men",
    "subcategory": "Suits",
    "images": [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603252109303-2751441dd158?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620012253295-c05cdee5e0b3?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      },
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.1,
    "reviews": [
      {
        "id": "rev_41_1",
        "userName": "Dev K.",
        "rating": 4,
        "date": "2026-05-11",
        "comment": "Pure luxury. Butter soft fabric. Fits beautifully."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Italian Linen",
      "Patch pockets",
      "Double back vent",
      "Dry clean only"
    ]
  },
  {
    "id": "42",
    "name": "Slim-Fit Tuxedo Blazer",
    "price": 7999,
    "description": "Luxury evening blazer with glossy satin shawl lapels. Designed for modern black-tie events.",
    "category": "men",
    "subcategory": "Suits",
    "images": [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      },
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.2,
    "reviews": [
      {
        "id": "rev_42_1",
        "userName": "Rohan M.",
        "rating": 4,
        "date": "2026-05-12",
        "comment": "Exceptional drape and fit. Looks very high-end."
      },
      {
        "id": "rev_42_2",
        "userName": "Ananya V.",
        "rating": 5,
        "date": "2026-06-00",
        "comment": "The cut is so chic! Extremely flattering and high quality fabric."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "80% Polyester, 20% Rayon",
      "Satin shawl collar",
      "Single button fastening",
      "Dry clean"
    ]
  },
  {
    "id": "43",
    "name": "White Leather Sneakers",
    "price": 4999,
    "description": "Clean court sneakers handcrafted from full-grain Italian leather. Detailed with Margom rubber cupsoles.",
    "category": "men",
    "subcategory": "Footwear",
    "images": [
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      },
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "rating": 4.3,
    "reviews": [
      {
        "id": "rev_43_1",
        "userName": "Neil P.",
        "rating": 4,
        "date": "2026-05-13",
        "comment": "Extremely clean design. Better quality than designers twice the price."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Italian Calfskin Leather",
      "Margom rubber cupsole",
      "Calfskin lining",
      "Made in Portugal"
    ]
  },
  {
    "id": "44",
    "name": "Suede Penny Loafers",
    "price": 5499,
    "description": "Elegant, unstructured slip-on loafers in premium water-repellent suede. Detailed with leather outsoles.",
    "category": "men",
    "subcategory": "Footwear",
    "images": [
      "https://images.unsplash.com/photo-1560243563-062bff001d68?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      },
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      }
    ],
    "sizes": [
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "rating": 4.4,
    "reviews": [
      {
        "id": "rev_44_1",
        "userName": "Priya R.",
        "rating": 4,
        "date": "2026-05-14",
        "comment": "Absolutely stunning piece. The drape is incredibly flattering."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Suede leather upper",
      "Leather sole",
      "Blake stitch construction",
      "Handcrafted"
    ]
  },
  {
    "id": "45",
    "name": "Leather Chelsea Boots",
    "price": 6999,
    "description": "Handcrafted leather chelsea boots. Elasticated side gusset and rear pull loops, set on a durable leather stacked heel.",
    "category": "men",
    "subcategory": "Footwear",
    "images": [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524513688864-aee2f35d119c?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      },
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      }
    ],
    "sizes": [
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "rating": 4.5,
    "reviews": [
      {
        "id": "rev_45_1",
        "userName": "Ananya V.",
        "rating": 4,
        "date": "2026-05-15",
        "comment": "The cut is so chic! Extremely flattering and high quality fabric."
      },
      {
        "id": "rev_45_2",
        "userName": "Aditya V.",
        "rating": 5,
        "date": "2026-06-03",
        "comment": "Bespoke tailoring level fit. Very smart details."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Full-grain leather",
      "Blake welted sole",
      "Elastic side panels",
      "Clean with leather balm"
    ]
  },
  {
    "id": "46",
    "name": "Classic Leather Derbies",
    "price": 5999,
    "description": "Handcrafted formal lace-up derby shoes in polished box-calf leather. Sturdy Goodyear welt construction.",
    "category": "men",
    "subcategory": "Footwear",
    "images": [
      "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611085583191-a3b1a1e27d81?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      },
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      }
    ],
    "sizes": [
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "rating": 4.6,
    "reviews": [
      {
        "id": "rev_46_1",
        "userName": "Sophie M.",
        "rating": 4,
        "date": "2026-05-16",
        "comment": "Extremely chic. Drape is incredibly clean and structured."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Box-calf leather upper",
      "Goodyear welted leather sole",
      "Lace-up dress shoe"
    ]
  },
  {
    "id": "47",
    "name": "Woven Leather Sandals",
    "price": 3999,
    "description": "Elegant summer sandals featuring woven leather straps and a soft, padded leather footbed.",
    "category": "men",
    "subcategory": "Footwear",
    "images": [
      "https://images.unsplash.com/photo-1617354964903-7f28df13b194?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627225925001-880c5cefac5d?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      },
      {
        "name": "Matte Black",
        "hex": "#111111"
      }
    ],
    "sizes": [
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "rating": 4.7,
    "reviews": [
      {
        "id": "rev_47_1",
        "userName": "Kavita L.",
        "rating": 4,
        "date": "2026-05-17",
        "comment": "Perfect finish, structured form looks extremely clean."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Cowhide leather straps",
      "Cushioned footbed",
      "Rubber grip outsole"
    ]
  },
  {
    "id": "48",
    "name": "Signature Chronograph Watch",
    "price": 7999,
    "description": "Minimalist chronograph watch with a matte black steel case and a genuine leather strap. Japanese quartz movement.",
    "category": "men",
    "subcategory": "Accessories",
    "images": [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560243563-062bff001d68?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      },
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.8,
    "reviews": [
      {
        "id": "rev_48_1",
        "userName": "Aditya V.",
        "rating": 4,
        "date": "2026-05-18",
        "comment": "Bespoke tailoring level fit. Very smart details."
      },
      {
        "id": "rev_48_2",
        "userName": "Dev K.",
        "rating": 5,
        "date": "2026-06-06",
        "comment": "Pure luxury. Butter soft fabric. Fits beautifully."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "316L Stainless Steel case",
      "Genuine leather strap",
      "5 ATM water resistance",
      "Japan Quartz movement"
    ]
  },
  {
    "id": "49",
    "name": "Saffiano Leather Cardholder",
    "price": 1999,
    "description": "Compact pocket wallet in durable scratch-resistant Saffiano leather. Four card slots and a center compartment.",
    "category": "men",
    "subcategory": "Accessories",
    "images": [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      },
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.9,
    "reviews": [
      {
        "id": "rev_49_1",
        "userName": "Armaan K.",
        "rating": 4,
        "date": "2026-05-19",
        "comment": "Clean, elegant, minimal design. Highly recommend."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Saffiano leather",
      "Polyester canvas lining",
      "4 card slots",
      "Spot clean"
    ]
  },
  {
    "id": "50",
    "name": "Polarized Acetate Sunglasses",
    "price": 2499,
    "description": "Classic D-frame sunglasses handcrafted in premium acetate with dark polarized lenses. 100% UVA/UVB protection.",
    "category": "men",
    "subcategory": "Accessories",
    "images": [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      },
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.0,
    "reviews": [
      {
        "id": "rev_50_1",
        "userName": "Kabir S.",
        "rating": 4,
        "date": "2026-05-20",
        "comment": "Excellent quality fabric, fits true to size. Perfect for smart-casual wear."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "Premium Cellulose Acetate frame",
      "Polarized CR-39 lenses",
      "100% UVA/UVB protection"
    ]
  },
  {
    "id": "51",
    "name": "Satin Slip Dress",
    "price": 4499,
    "description": "An elegant bias-cut midi dress with a fluid satin drape. Features delicate adjustable spaghetti straps.",
    "category": "women",
    "subcategory": "Dresses",
    "images": [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693af?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4c?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#111111"
      },
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.1,
    "reviews": [
      {
        "id": "rev_51_1",
        "userName": "Dev K.",
        "rating": 4,
        "date": "2026-05-21",
        "comment": "Pure luxury. Butter soft fabric. Fits beautifully."
      },
      {
        "id": "rev_51_2",
        "userName": "Priya R.",
        "rating": 5,
        "date": "2026-06-09",
        "comment": "Absolutely stunning piece. The drape is incredibly flattering."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "100% Viscose Satin",
      "Adjustable shoulder straps",
      "Dry clean only"
    ],
    "badge": "New"
  },
  {
    "id": "52",
    "name": "Floral Silk Midi Dress",
    "price": 6999,
    "description": "Breezy midi dress in premium silk chiffon, adorned with a delicate botanical print and gathered waist detail.",
    "category": "women",
    "subcategory": "Dresses",
    "images": [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78g?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43e?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      },
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.2,
    "reviews": [
      {
        "id": "rev_52_1",
        "userName": "Rohan M.",
        "rating": 4,
        "date": "2026-05-22",
        "comment": "Exceptional drape and fit. Looks very high-end."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "100% Silk Chiffon",
      "Polyester lining",
      "Concealed back zip",
      "Dry clean"
    ],
    "badge": "Trending"
  },
  {
    "id": "53",
    "name": "Linen Blend Halter Dress",
    "price": 3499,
    "description": "A chic halterneck dress in a breathable linen-cotton blend. Features an open back and flattering A-line skirt.",
    "category": "women",
    "subcategory": "Dresses",
    "images": [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f93?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f2?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      },
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.3,
    "reviews": [
      {
        "id": "rev_53_1",
        "userName": "Neil P.",
        "rating": 4,
        "date": "2026-05-23",
        "comment": "Extremely clean design. Better quality than designers twice the price."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": false,
    "isFeatured": true,
    "details": [
      "55% Linen, 45% Cotton",
      "Halterneck tie closure",
      "Machine wash cold"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "54",
    "name": "Pleated Wrap Maxi Dress",
    "price": 5499,
    "description": "An elegant wrap maxi dress with micro-pleated skirt panels. Deep V-neckline and tie belt closure.",
    "category": "women",
    "subcategory": "Dresses",
    "images": [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609357605149-c1234a5d8d0f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611085583191-a3b1a1e27d83?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      },
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.4,
    "reviews": [
      {
        "id": "rev_54_1",
        "userName": "Priya R.",
        "rating": 4,
        "date": "2026-05-24",
        "comment": "Absolutely stunning piece. The drape is incredibly flattering."
      },
      {
        "id": "rev_54_2",
        "userName": "Kavita L.",
        "rating": 5,
        "date": "2026-06-12",
        "comment": "Perfect finish, structured form looks extremely clean."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": true,
    "details": [
      "100% Polyester georgette",
      "Fully lined body",
      "Delicate hand wash"
    ]
  },
  {
    "id": "55",
    "name": "Knit Bodycon Dress",
    "price": 3999,
    "description": "Ribbed knit bodycon dress with a mock neck collar. Flattering, body-hugging shape with stretch retention.",
    "category": "women",
    "subcategory": "Dresses",
    "images": [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617354964903-7f28df13b196?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc889?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      },
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.5,
    "reviews": [
      {
        "id": "rev_55_1",
        "userName": "Ananya V.",
        "rating": 4,
        "date": "2026-05-25",
        "comment": "The cut is so chic! Extremely flattering and high quality fabric."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "80% Rayon, 20% Nylon ribbed knit",
      "Mock neck design",
      "Wash cold flat"
    ],
    "badge": "New"
  },
  {
    "id": "56",
    "name": "Minimalist Shift Dress",
    "price": 2999,
    "description": "An easy-wearing, retro shift dress with a clean straight cut and short sleeves. Simple chic daily wear.",
    "category": "women",
    "subcategory": "Dresses",
    "images": [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      },
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.6,
    "reviews": [
      {
        "id": "rev_56_1",
        "userName": "Sophie M.",
        "rating": 4,
        "date": "2026-05-26",
        "comment": "Extremely chic. Drape is incredibly clean and structured."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "65% Polyester, 30% Viscose, 5% Spandex",
      "Back zip closure",
      "Machine wash warm"
    ],
    "badge": "Trending"
  },
  {
    "id": "57",
    "name": "Off-Shoulder A-Line Dress",
    "price": 4999,
    "description": "Elegant off-the-shoulder evening dress with a structured A-line skirt. Premium cotton-poplin blend.",
    "category": "women",
    "subcategory": "Dresses",
    "images": [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      },
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.7,
    "reviews": [
      {
        "id": "rev_57_1",
        "userName": "Kavita L.",
        "rating": 4,
        "date": "2026-05-27",
        "comment": "Perfect finish, structured form looks extremely clean."
      },
      {
        "id": "rev_57_2",
        "userName": "Kabir S.",
        "rating": 5,
        "date": "2026-06-01",
        "comment": "Excellent quality fabric, fits true to size. Perfect for smart-casual wear."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "97% Cotton, 3% Elastane poplin",
      "Elasticated off-shoulder fold",
      "Side seam pockets",
      "Dry clean"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "58",
    "name": "Tiered Cotton Sundress",
    "price": 3299,
    "description": "Relaxed fit tiered sundress in soft organic cotton voile. Lightweight lining and side pockets.",
    "category": "women",
    "subcategory": "Dresses",
    "images": [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      },
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.8,
    "reviews": [
      {
        "id": "rev_58_1",
        "userName": "Aditya V.",
        "rating": 4,
        "date": "2026-05-28",
        "comment": "Bespoke tailoring level fit. Very smart details."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Organic Cotton Voile",
      "Tiered skirt details",
      "Machine wash cold"
    ]
  },
  {
    "id": "59",
    "name": "Oversized Linen Shirt",
    "price": 2799,
    "description": "Breezy and relaxed oversized linen shirt with dropped shoulders and a single pocket. Ideal summer top.",
    "category": "women",
    "subcategory": "Tops",
    "images": [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603252109303-2751441dd158?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620012253295-c05cdee5e0b3?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      },
      {
        "name": "Matte Black",
        "hex": "#111111"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.9,
    "reviews": [
      {
        "id": "rev_59_1",
        "userName": "Armaan K.",
        "rating": 4,
        "date": "2026-05-29",
        "comment": "Clean, elegant, minimal design. Highly recommend."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "100% Premium Flax Linen",
      "Oversized silhouette",
      "Machine wash cold"
    ],
    "badge": "New"
  },
  {
    "id": "60",
    "name": "Silk Blend Blouse",
    "price": 3999,
    "description": "Luxurious drape blouse in silk blend fabric. Clean-cut band collar and elegant shell button cuffs.",
    "category": "women",
    "subcategory": "Blouses",
    "images": [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550412931-4355a5b51d2f?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      },
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.0,
    "reviews": [
      {
        "id": "rev_60_1",
        "userName": "Kabir S.",
        "rating": 4,
        "date": "2026-05-10",
        "comment": "Excellent quality fabric, fits true to size. Perfect for smart-casual wear."
      },
      {
        "id": "rev_60_2",
        "userName": "Neil P.",
        "rating": 5,
        "date": "2026-06-04",
        "comment": "Extremely clean design. Better quality than designers twice the price."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "75% Combed Cotton, 25% Silk",
      "Real mother-of-pearl buttons",
      "Dry clean only"
    ],
    "badge": "Trending"
  },
  {
    "id": "61",
    "name": "Ribbed Knit Top",
    "price": 1999,
    "description": "Textured ribbed knit top in a cotton-nylon blend. High crew neckline and clean sleeveless profile.",
    "category": "women",
    "subcategory": "Tops",
    "images": [
      "https://images.unsplash.com/photo-1524250502761-136f9002274b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf8?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      },
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.1,
    "reviews": [
      {
        "id": "rev_61_1",
        "userName": "Dev K.",
        "rating": 4,
        "date": "2026-05-11",
        "comment": "Pure luxury. Butter soft fabric. Fits beautifully."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": false,
    "isFeatured": true,
    "details": [
      "70% Cotton, 30% Nylon fine ribbed knit",
      "Machine wash cold, dry flat"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "62",
    "name": "Puff Sleeve Cotton Blouse",
    "price": 2499,
    "description": "Crisp white cotton blouse with voluminous statement puff sleeves and a delicate tie-neck details.",
    "category": "women",
    "subcategory": "Blouses",
    "images": [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      },
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.2,
    "reviews": [
      {
        "id": "rev_62_1",
        "userName": "Rohan M.",
        "rating": 4,
        "date": "2026-05-12",
        "comment": "Exceptional drape and fit. Looks very high-end."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": true,
    "details": [
      "100% Cotton Poplin",
      "Puff cuffs with elastic",
      "Tie neck detail",
      "Machine wash cold"
    ]
  },
  {
    "id": "63",
    "name": "Asymmetrical Drape Top",
    "price": 2299,
    "description": "Elegant jersey top with an asymmetrical draped shoulder cowl. Fluid, modern styling.",
    "category": "women",
    "subcategory": "Tops",
    "images": [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603252109303-2751441dd158?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620012253295-c05cdee5e0b3?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#111111"
      },
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.3,
    "reviews": [
      {
        "id": "rev_63_1",
        "userName": "Neil P.",
        "rating": 4,
        "date": "2026-05-13",
        "comment": "Extremely clean design. Better quality than designers twice the price."
      },
      {
        "id": "rev_63_2",
        "userName": "Sophie M.",
        "rating": 5,
        "date": "2026-06-07",
        "comment": "Extremely chic. Drape is incredibly clean and structured."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "95% Modal, 5% Spandex jersey",
      "Draped cowl neckline",
      "Machine wash cold"
    ],
    "badge": "New"
  },
  {
    "id": "64",
    "name": "Satin V-Neck Camisole",
    "price": 1699,
    "description": "Lustrous satin camisole with a deep v-neckline and lace trims. Perfect piece for chic layering.",
    "category": "women",
    "subcategory": "Tops",
    "images": [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550412931-4355a5b51d2f?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      },
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.4,
    "reviews": [
      {
        "id": "rev_64_1",
        "userName": "Priya R.",
        "rating": 4,
        "date": "2026-05-14",
        "comment": "Absolutely stunning piece. The drape is incredibly flattering."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Polyester satin",
      "Lace trim neck",
      "Adjustable straps",
      "Delicate wash"
    ],
    "badge": "Trending"
  },
  {
    "id": "65",
    "name": "Cropped Poplin Top",
    "price": 1999,
    "description": "Cropped length blouse in structured cotton poplin. Features an elastic hem and keyhole back.",
    "category": "women",
    "subcategory": "Tops",
    "images": [
      "https://images.unsplash.com/photo-1524250502761-136f9002274b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf8?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      },
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.5,
    "reviews": [
      {
        "id": "rev_65_1",
        "userName": "Ananya V.",
        "rating": 4,
        "date": "2026-05-15",
        "comment": "The cut is so chic! Extremely flattering and high quality fabric."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Cotton Poplin",
      "Elastic hem waist",
      "Machine wash cold"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "66",
    "name": "Chiffon Pleated Blouse",
    "price": 2799,
    "description": "Elegant sheer chiffon blouse with pleated front details and long balloon sleeves. Includes matching camisole liner.",
    "category": "women",
    "subcategory": "Blouses",
    "images": [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      },
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.6,
    "reviews": [
      {
        "id": "rev_66_1",
        "userName": "Sophie M.",
        "rating": 4,
        "date": "2026-05-16",
        "comment": "Extremely chic. Drape is incredibly clean and structured."
      },
      {
        "id": "rev_66_2",
        "userName": "Armaan K.",
        "rating": 5,
        "date": "2026-06-10",
        "comment": "Clean, elegant, minimal design. Highly recommend."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Polyester chiffon",
      "Balloon sleeves",
      "Inner camisole liner",
      "Hand wash"
    ]
  },
  {
    "id": "67",
    "name": "Pleated Midi Skirt",
    "price": 3499,
    "description": "Sophisticated pleated midi skirt in fluid georgette fabric. Elasticated waist for pull-on comfort.",
    "category": "women",
    "subcategory": "Skirts",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551854838-212c50b4c184?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      },
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.7,
    "reviews": [
      {
        "id": "rev_67_1",
        "userName": "Kavita L.",
        "rating": 4,
        "date": "2026-05-17",
        "comment": "Perfect finish, structured form looks extremely clean."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "100% Recycled Polyester georgette",
      "Sunray pleats",
      "Elastic waistband",
      "Hand wash"
    ],
    "badge": "New"
  },
  {
    "id": "68",
    "name": "Satin Bias Cut Skirt",
    "price": 2999,
    "description": "Flowing midi skirt cut on the bias in heavy viscose satin. Flat waist with side concealed zipper.",
    "category": "women",
    "subcategory": "Skirts",
    "images": [
      "https://images.unsplash.com/photo-1583848762493-5d3c89d716af?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268903-e83c278e94fa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268923-d83c278e94fb?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      },
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.8,
    "reviews": [
      {
        "id": "rev_68_1",
        "userName": "Aditya V.",
        "rating": 4,
        "date": "2026-05-18",
        "comment": "Bespoke tailoring level fit. Very smart details."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Viscose Satin",
      "Bias cut for natural stretch",
      "Dry clean recommended"
    ],
    "badge": "Trending"
  },
  {
    "id": "69",
    "name": "A-Line Denim Skirt",
    "price": 2799,
    "description": "A-line denim skirt in mid-wash organic cotton. Features classic five pockets and a front slit.",
    "category": "women",
    "subcategory": "Skirts",
    "images": [
      "https://images.unsplash.com/photo-1583847268943-d83c278e94fc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268953-d83c278e94fd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268963-d83c278e94fe?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      },
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.9,
    "reviews": [
      {
        "id": "rev_69_1",
        "userName": "Armaan K.",
        "rating": 4,
        "date": "2026-05-19",
        "comment": "Clean, elegant, minimal design. Highly recommend."
      },
      {
        "id": "rev_69_2",
        "userName": "Rohan M.",
        "rating": 5,
        "date": "2026-06-13",
        "comment": "Exceptional drape and fit. Looks very high-end."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Organic Cotton denim",
      "Mid-rise fit",
      "Front button closure",
      "Wash inside out"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "70",
    "name": "Linen Wrap Skirt",
    "price": 2699,
    "description": "Lightweight wrap skirt in pure washed linen. Features side ties and a breezy overlapping front.",
    "category": "women",
    "subcategory": "Skirts",
    "images": [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae81?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3248?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8909?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      },
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.0,
    "reviews": [
      {
        "id": "rev_70_1",
        "userName": "Kabir S.",
        "rating": 4,
        "date": "2026-05-20",
        "comment": "Excellent quality fabric, fits true to size. Perfect for smart-casual wear."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Linen",
      "Tie side closure",
      "Machine wash cold, air dry"
    ]
  },
  {
    "id": "71",
    "name": "High-Waist Wide Leg Trousers",
    "price": 3499,
    "description": "Wide-leg formal trousers with a high waist and sharp front creases. Fluid tailoring for a modern drape.",
    "category": "women",
    "subcategory": "Trousers",
    "images": [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae81?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3248?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      },
      {
        "name": "Matte Black",
        "hex": "#111111"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.1,
    "reviews": [
      {
        "id": "rev_71_1",
        "userName": "Dev K.",
        "rating": 4,
        "date": "2026-05-21",
        "comment": "Pure luxury. Butter soft fabric. Fits beautifully."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "75% Polyester, 20% Viscose, 5% Spandex",
      "Hook-and-bar zip fly",
      "Dry clean only"
    ],
    "badge": "New"
  },
  {
    "id": "72",
    "name": "Slim Fit Cropped Trousers",
    "price": 2999,
    "description": "Cropped trousers tailored in double-weave cotton blend fabric. Flat-front clean waist detail.",
    "category": "women",
    "subcategory": "Trousers",
    "images": [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      },
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.2,
    "reviews": [
      {
        "id": "rev_72_1",
        "userName": "Rohan M.",
        "rating": 4,
        "date": "2026-05-22",
        "comment": "Exceptional drape and fit. Looks very high-end."
      },
      {
        "id": "rev_72_2",
        "userName": "Ananya V.",
        "rating": 5,
        "date": "2026-06-02",
        "comment": "The cut is so chic! Extremely flattering and high quality fabric."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "52% Cotton, 43% Polyester, 5% Elastane",
      "Cropped ankle length",
      "Machine wash cold"
    ],
    "badge": "Trending"
  },
  {
    "id": "73",
    "name": "Premium Denim Jeans",
    "price": 3499,
    "description": "Straight leg denim jeans in vintage indigo wash. Mid-weight cotton denim with minimal stretch.",
    "category": "women",
    "subcategory": "Jeans",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2af?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551854838-212c50b4c185?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a904?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      },
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.3,
    "reviews": [
      {
        "id": "rev_73_1",
        "userName": "Neil P.",
        "rating": 4,
        "date": "2026-05-23",
        "comment": "Extremely clean design. Better quality than designers twice the price."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "98% Cotton, 2% Spandex denim",
      "High rise fit",
      "Classic straight leg",
      "Wash cold inside out"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "74",
    "name": "Relaxed Tapered Chinos",
    "price": 2799,
    "description": "Tapered chinos in lightweight cotton twill. Relaxed fit through hip with belt loops and clean cuffs.",
    "category": "women",
    "subcategory": "Trousers",
    "images": [
      "https://images.unsplash.com/photo-1536243298747-ea8874136d64?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      },
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.4,
    "reviews": [
      {
        "id": "rev_74_1",
        "userName": "Priya R.",
        "rating": 4,
        "date": "2026-05-24",
        "comment": "Absolutely stunning piece. The drape is incredibly flattering."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "97% Cotton, 3% Elastane twill",
      "Slanted front pockets",
      "Machine wash warm"
    ]
  },
  {
    "id": "75",
    "name": "High-Rise Straight Jeans",
    "price": 3299,
    "description": "High rise straight fit jeans in raw black denim. Structured denim that ages beautifully with wear.",
    "category": "women",
    "subcategory": "Jeans",
    "images": [
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511130558045-c3328575e4bb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#111111"
      },
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.5,
    "reviews": [
      {
        "id": "rev_75_1",
        "userName": "Ananya V.",
        "rating": 4,
        "date": "2026-05-25",
        "comment": "The cut is so chic! Extremely flattering and high quality fabric."
      },
      {
        "id": "rev_75_2",
        "userName": "Aditya V.",
        "rating": 5,
        "date": "2026-06-05",
        "comment": "Bespoke tailoring level fit. Very smart details."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Rigid Cotton denim",
      "High rise waist",
      "Classic 5 pockets",
      "Do not bleach"
    ],
    "badge": "New"
  },
  {
    "id": "76",
    "name": "Linen Drawstring Pants",
    "price": 2999,
    "description": "Breezy linen trousers with an elastic waistband and drawstring. Slanted pockets and relaxed straight leg.",
    "category": "women",
    "subcategory": "Trousers",
    "images": [
      "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a902?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a903?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      },
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      }
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.6,
    "reviews": [
      {
        "id": "rev_76_1",
        "userName": "Sophie M.",
        "rating": 4,
        "date": "2026-05-26",
        "comment": "Extremely chic. Drape is incredibly clean and structured."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Linen",
      "Elastic waistband",
      "Wash cold, hang dry"
    ],
    "badge": "Trending"
  },
  {
    "id": "77",
    "name": "Cashmere Cardigan",
    "price": 6999,
    "description": "Relaxed fit cardigan sweater knit in butter-soft premium cashmere. Detailed with mother-of-pearl buttons.",
    "category": "women",
    "subcategory": "Knitwear",
    "images": [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      },
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.7,
    "reviews": [
      {
        "id": "rev_77_1",
        "userName": "Kavita L.",
        "rating": 4,
        "date": "2026-05-27",
        "comment": "Perfect finish, structured form looks extremely clean."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Cashmere",
      "V-neck front",
      "Pearl button closure",
      "Dry clean only"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "78",
    "name": "Ribbed Mock-Neck Sweater",
    "price": 3299,
    "description": "Mock-neck sweater in fine ribbed knit wool blend. Fitted silhouette that makes it an ideal layering piece.",
    "category": "women",
    "subcategory": "Knitwear",
    "images": [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      },
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.8,
    "reviews": [
      {
        "id": "rev_78_1",
        "userName": "Aditya V.",
        "rating": 4,
        "date": "2026-05-28",
        "comment": "Bespoke tailoring level fit. Very smart details."
      },
      {
        "id": "rev_78_2",
        "userName": "Dev K.",
        "rating": 5,
        "date": "2026-06-08",
        "comment": "Pure luxury. Butter soft fabric. Fits beautifully."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "50% Merino Wool, 50% Acrylic ribbed knit",
      "Mock neck collar",
      "Hand wash cold"
    ]
  },
  {
    "id": "79",
    "name": "Oversized Chunky-Knit Sweater",
    "price": 3999,
    "description": "Chunky wool-blend knit sweater with dropped shoulders and balloon sleeves. Incredibly warm and cozy.",
    "category": "women",
    "subcategory": "Knitwear",
    "images": [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      },
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.9,
    "reviews": [
      {
        "id": "rev_79_1",
        "userName": "Armaan K.",
        "rating": 4,
        "date": "2026-05-29",
        "comment": "Clean, elegant, minimal design. Highly recommend."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "60% Acrylic, 30% Wool, 10% Alpaca",
      "Chunky knit stitch",
      "Hand wash, dry flat"
    ]
  },
  {
    "id": "80",
    "name": "Fine-Gauge Merino Crewneck",
    "price": 3499,
    "description": "Seamless fine-gauge crewneck sweater knit from lightweight extra-fine merino wool. Pure minimalist luxury.",
    "category": "women",
    "subcategory": "Knitwear",
    "images": [
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511130558045-c3328575e4bb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8909?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      },
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.0,
    "reviews": [
      {
        "id": "rev_80_1",
        "userName": "Kabir S.",
        "rating": 4,
        "date": "2026-05-10",
        "comment": "Excellent quality fabric, fits true to size. Perfect for smart-casual wear."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Extra-Fine Merino Wool",
      "Superfine knit weight",
      "Dry clean recommended"
    ],
    "badge": "New"
  },
  {
    "id": "81",
    "name": "Classic Double-Breasted Trench",
    "price": 7999,
    "description": "Water-resistant double-breasted trench coat with shoulder epaulettes and a belt. Clean camel tan.",
    "category": "women",
    "subcategory": "Outerwear",
    "images": [
      "https://images.unsplash.com/photo-1611601679655-7c8bc197f0c6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611601679949-74d115fa016c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3614a?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      },
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.1,
    "reviews": [
      {
        "id": "rev_81_1",
        "userName": "Dev K.",
        "rating": 4,
        "date": "2026-05-11",
        "comment": "Pure luxury. Butter soft fabric. Fits beautifully."
      },
      {
        "id": "rev_81_2",
        "userName": "Priya R.",
        "rating": 5,
        "date": "2026-06-11",
        "comment": "Absolutely stunning piece. The drape is incredibly flattering."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "60% Cotton, 40% Polyester shell",
      "Viscose lining",
      "Storm flap design",
      "Dry clean only"
    ],
    "badge": "Trending"
  },
  {
    "id": "82",
    "name": "Tailored Wool Blend Coat",
    "price": 8999,
    "description": "Structured longline coat in heavyweight wool blend. Features notch lapels and back center vent.",
    "category": "women",
    "subcategory": "Outerwear",
    "images": [
      "https://images.unsplash.com/photo-1620012253000-880c5cefac5d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621072156002-e2fcc10d7875?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622445229267-be086d061c56?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      },
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.2,
    "reviews": [
      {
        "id": "rev_82_1",
        "userName": "Rohan M.",
        "rating": 4,
        "date": "2026-05-12",
        "comment": "Exceptional drape and fit. Looks very high-end."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "60% Virgin Wool, 40% Polyester",
      "Fully lined satin body",
      "Double welt front pockets",
      "Dry clean"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "83",
    "name": "Cropped Tweed Jacket",
    "price": 5999,
    "description": "Textured boucl\u00e9 tweed jacket with a collarless neck and ornate gold buttons. Sophisticated luxury.",
    "category": "women",
    "subcategory": "Outerwear",
    "images": [
      "https://images.unsplash.com/photo-1623164973347-bf843b0d2685?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625413156686-27bc89d2d854?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627225925345-552d49cf47ae?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      },
      {
        "name": "Matte Black",
        "hex": "#111111"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.3,
    "reviews": [
      {
        "id": "rev_83_1",
        "userName": "Neil P.",
        "rating": 4,
        "date": "2026-05-13",
        "comment": "Extremely clean design. Better quality than designers twice the price."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "70% Polyester, 30% Wool boucl\u00e9",
      "Satin inner lining",
      "Gold crest button closures",
      "Dry clean"
    ]
  },
  {
    "id": "84",
    "name": "Suede Shearling Jacket",
    "price": 9999,
    "description": "Premium aviator-style jacket with lamb suede shell and soft faux shearling interior linings. Extremely warm.",
    "category": "women",
    "subcategory": "Outerwear",
    "images": [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548624149-f7b2e65922b1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      },
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.4,
    "reviews": [
      {
        "id": "rev_84_1",
        "userName": "Priya R.",
        "rating": 4,
        "date": "2026-05-14",
        "comment": "Absolutely stunning piece. The drape is incredibly flattering."
      },
      {
        "id": "rev_84_2",
        "userName": "Kavita L.",
        "rating": 5,
        "date": "2026-06-00",
        "comment": "Perfect finish, structured form looks extremely clean."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Goat Suede upper",
      "100% Faux shearling lining",
      "Zipper cuffs",
      "Dry clean only"
    ]
  },
  {
    "id": "85",
    "name": "Lightweight Duster Coat",
    "price": 4999,
    "description": "Unlined longline duster coat in drapey lyocell blend. Fluid movement and storm cuffs.",
    "category": "women",
    "subcategory": "Outerwear",
    "images": [
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      },
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.5,
    "reviews": [
      {
        "id": "rev_85_1",
        "userName": "Ananya V.",
        "rating": 4,
        "date": "2026-05-15",
        "comment": "The cut is so chic! Extremely flattering and high quality fabric."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "85% Lyocell, 15% Polyester",
      "Soft open front drape",
      "Machine wash cold"
    ]
  },
  {
    "id": "86",
    "name": "Elegant Wide-Leg Jumpsuit",
    "price": 4999,
    "description": "Fluid wide-leg jumpsuit with a wrap-style bodice and a tie belt. Sleeveless silhouette.",
    "category": "women",
    "subcategory": "Jumpsuits",
    "images": [
      "https://images.unsplash.com/photo-1549298916-b41d501d3773?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533867617858-e7b97e06050a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27fa?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      },
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.6,
    "reviews": [
      {
        "id": "rev_86_1",
        "userName": "Sophie M.",
        "rating": 4,
        "date": "2026-05-16",
        "comment": "Extremely chic. Drape is incredibly clean and structured."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "100% Recycled Crepe Viscose",
      "Concealed back zipper",
      "Removable waist belt",
      "Dry clean"
    ]
  },
  {
    "id": "87",
    "name": "Utility Linen Boiler Suit",
    "price": 4499,
    "description": "A relaxed utility boiler suit in premium washed linen-cotton blend. Front button zip fly and patch pockets.",
    "category": "women",
    "subcategory": "Jumpsuits",
    "images": [
      "https://images.unsplash.com/photo-1583848762493-5d3c89d716ag?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268903-e83c278e94fe?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268923-d83c278e94ff?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#111111"
      },
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.7,
    "reviews": [
      {
        "id": "rev_87_1",
        "userName": "Kavita L.",
        "rating": 4,
        "date": "2026-05-17",
        "comment": "Perfect finish, structured form looks extremely clean."
      },
      {
        "id": "rev_87_2",
        "userName": "Kabir S.",
        "rating": 5,
        "date": "2026-06-03",
        "comment": "Excellent quality fabric, fits true to size. Perfect for smart-casual wear."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "60% Linen, 40% Cotton",
      "Front button closure",
      "Elastic back waist",
      "Machine wash cold"
    ]
  },
  {
    "id": "88",
    "name": "Satin Halterneck Jumpsuit",
    "price": 5499,
    "description": "Sophisticated halter neck jumpsuit in heavy drape satin. Open back detail and wide leg pants.",
    "category": "women",
    "subcategory": "Jumpsuits",
    "images": [
      "https://images.unsplash.com/photo-1583847268943-d83c278e94fg?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268953-d83c278e94fh?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268963-d83c278e94fi?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      },
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.8,
    "reviews": [
      {
        "id": "rev_88_1",
        "userName": "Aditya V.",
        "rating": 4,
        "date": "2026-05-18",
        "comment": "Bespoke tailoring level fit. Very smart details."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Polyester satin",
      "Halterneck button closure",
      "Dry clean only"
    ]
  },
  {
    "id": "89",
    "name": "White Leather Court Sneakers",
    "price": 4999,
    "description": "Minimalist tennis sneakers handcrafted in premium nappa leather with memory foam insoles.",
    "category": "women",
    "subcategory": "Footwear",
    "images": [
      "https://images.unsplash.com/photo-1622560480654-d96214fdc888?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627225925001-880c5cefac5e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      },
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      }
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "rating": 4.9,
    "reviews": [
      {
        "id": "rev_89_1",
        "userName": "Armaan K.",
        "rating": 4,
        "date": "2026-05-19",
        "comment": "Clean, elegant, minimal design. Highly recommend."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": true,
    "details": [
      "100% Nappa Leather upper",
      "Rubber cupsole",
      "Calfskin lining",
      "Wipe clean"
    ]
  },
  {
    "id": "90",
    "name": "Strappy Leather Heels",
    "price": 5499,
    "description": "Elegant open-toe heels with delicate leather ankle straps and a leather stacked block heel.",
    "category": "women",
    "subcategory": "Footwear",
    "images": [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      },
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      }
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "rating": 4.0,
    "reviews": [
      {
        "id": "rev_90_1",
        "userName": "Kabir S.",
        "rating": 4,
        "date": "2026-05-20",
        "comment": "Excellent quality fabric, fits true to size. Perfect for smart-casual wear."
      },
      {
        "id": "rev_90_2",
        "userName": "Neil P.",
        "rating": 5,
        "date": "2026-06-06",
        "comment": "Extremely clean design. Better quality than designers twice the price."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": true,
    "details": [
      "100% Calfskin leather straps",
      "Leather wrapped block heel",
      "Heel height: 2.5 inches",
      "Handmade"
    ]
  },
  {
    "id": "91",
    "name": "Pointed-Toe Suede Flats",
    "price": 3999,
    "description": "Classic pointed toe ballet flats in soft water-resistant goat suede. Cushioned insoles for all-day comfort.",
    "category": "women",
    "subcategory": "Footwear",
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070aa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      },
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "rating": 4.1,
    "reviews": [
      {
        "id": "rev_91_1",
        "userName": "Dev K.",
        "rating": 4,
        "date": "2026-05-21",
        "comment": "Pure luxury. Butter soft fabric. Fits beautifully."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Goat Suede upper",
      "Leather sole",
      "Padded leather footbed"
    ]
  },
  {
    "id": "92",
    "name": "Leather Ankle Boots",
    "price": 6499,
    "description": "Handcrafted ankle boots in polished black calf leather. Elastic side gussets and wood block heel.",
    "category": "women",
    "subcategory": "Footwear",
    "images": [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518049360754-af0119f7cbe8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43a?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      },
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      }
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "rating": 4.2,
    "reviews": [
      {
        "id": "rev_92_1",
        "userName": "Rohan M.",
        "rating": 4,
        "date": "2026-05-22",
        "comment": "Exceptional drape and fit. Looks very high-end."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Calf leather upper",
      "Blake stitched leather sole",
      "Heel height: 2 inches",
      "Leather clean"
    ]
  },
  {
    "id": "93",
    "name": "Minimalist Leather Slides",
    "price": 2999,
    "description": "Premium slip-on summer slides with double leather straps and an ergonomic cork footbed.",
    "category": "women",
    "subcategory": "Footwear",
    "images": [
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Heather Gray",
        "hex": "#B2B2B2"
      },
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      }
    ],
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "rating": 4.3,
    "reviews": [
      {
        "id": "rev_93_1",
        "userName": "Neil P.",
        "rating": 4,
        "date": "2026-05-23",
        "comment": "Extremely clean design. Better quality than designers twice the price."
      },
      {
        "id": "rev_93_2",
        "userName": "Sophie M.",
        "rating": 5,
        "date": "2026-06-09",
        "comment": "Extremely chic. Drape is incredibly clean and structured."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Vegetable tanned leather",
      "Molded cork footbed",
      "Rubber sole"
    ]
  },
  {
    "id": "94",
    "name": "Structured Leather Tote",
    "price": 5999,
    "description": "Spacious laptop tote bag in premium structured pebbled cowhide leather. Holds up to a 13-inch laptop.",
    "category": "women",
    "subcategory": "Bags",
    "images": [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524513688864-aee2f35d119b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509319117193-57bab727e09b?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Vintage Indigo",
        "hex": "#5E81AC"
      },
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.4,
    "reviews": [
      {
        "id": "rev_94_1",
        "userName": "Priya R.",
        "rating": 4,
        "date": "2026-05-24",
        "comment": "Absolutely stunning piece. The drape is incredibly flattering."
      }
    ],
    "inStock": true,
    "isNewArrival": true,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Genuine Pebbled Cowhide Leather",
      "Inner zip partition pocket",
      "Fits 13-inch laptop",
      "Clean with leather cream"
    ],
    "badge": "New"
  },
  {
    "id": "95",
    "name": "Pebbled Leather Crossbody",
    "price": 3499,
    "description": "Compact crossbody camera bag with adjustable shoulder strap and gold metallic zip pulls.",
    "category": "women",
    "subcategory": "Bags",
    "images": [
      "https://images.unsplash.com/photo-1611085583191-a3b1a1e27d8b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5fb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617354964903-7f28df13b19b?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Champagne Gold",
        "hex": "#C5A880"
      },
      {
        "name": "Matte Black",
        "hex": "#111111"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.5,
    "reviews": [
      {
        "id": "rev_95_1",
        "userName": "Ananya V.",
        "rating": 4,
        "date": "2026-05-25",
        "comment": "The cut is so chic! Extremely flattering and high quality fabric."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": true,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Genuine Leather",
      "Polyester lining",
      "Gold hardware closures",
      "Spot clean"
    ],
    "badge": "Trending"
  },
  {
    "id": "96",
    "name": "Minimalist Shoulder Bag",
    "price": 3999,
    "description": "90s-inspired crescent shape shoulder bag in smooth box-leather finish. Zip top closure.",
    "category": "women",
    "subcategory": "Bags",
    "images": [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Pure White",
        "hex": "#FFFFFF"
      },
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.6,
    "reviews": [
      {
        "id": "rev_96_1",
        "userName": "Sophie M.",
        "rating": 4,
        "date": "2026-05-26",
        "comment": "Extremely chic. Drape is incredibly clean and structured."
      },
      {
        "id": "rev_96_2",
        "userName": "Armaan K.",
        "rating": 5,
        "date": "2026-06-12",
        "comment": "Clean, elegant, minimal design. Highly recommend."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": true,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Cow box leather",
      "Crescent silhouette",
      "YKK metal zipper",
      "Spot clean"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "97",
    "name": "Suede Clutch Bag",
    "price": 2999,
    "description": "Foldover clutch bag in soft water-resistant split suede. Magnetic button closure and removable chain strap.",
    "category": "women",
    "subcategory": "Bags",
    "images": [
      "https://images.unsplash.com/photo-1626497764746-6dc36446955a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bca?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdfa?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Off-White",
        "hex": "#FAF9F6"
      },
      {
        "name": "Oatmeal Beige",
        "hex": "#DFD7C8"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.7,
    "reviews": [
      {
        "id": "rev_97_1",
        "userName": "Kavita L.",
        "rating": 4,
        "date": "2026-05-27",
        "comment": "Perfect finish, structured form looks extremely clean."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": true,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Split Suede Upper",
      "Removable brass chain link strap",
      "Magnetic flap"
    ]
  },
  {
    "id": "98",
    "name": "Gold-Tone Pendant Necklace",
    "price": 1999,
    "description": "Minimalist chain necklace featuring a organic coin pendant. Plated in 18k yellow gold.",
    "category": "women",
    "subcategory": "Accessories",
    "images": [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560243563-062bff001d68?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Charcoal Black",
        "hex": "#2B2B2B"
      },
      {
        "name": "Navy Blue",
        "hex": "#1C2E4A"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.8,
    "reviews": [
      {
        "id": "rev_98_1",
        "userName": "Aditya V.",
        "rating": 4,
        "date": "2026-05-28",
        "comment": "Bespoke tailoring level fit. Very smart details."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": true,
    "isFeatured": false,
    "details": [
      "18k Gold Plated Brass",
      "Hypoallergenic, Nickel-free",
      "Chain length: 18 inches",
      "Avoid contact with water"
    ]
  },
  {
    "id": "99",
    "name": "Signature Analog Gold Watch",
    "price": 6999,
    "description": "Elegant women's dress watch with a slim champagne gold case and mesh bracelet. Japan movement.",
    "category": "women",
    "subcategory": "Accessories",
    "images": [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#111111"
      },
      {
        "name": "Sage Green",
        "hex": "#8A9A86"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.9,
    "reviews": [
      {
        "id": "rev_99_1",
        "userName": "Armaan K.",
        "rating": 4,
        "date": "2026-05-29",
        "comment": "Clean, elegant, minimal design. Highly recommend."
      },
      {
        "id": "rev_99_2",
        "userName": "Rohan M.",
        "rating": 5,
        "date": "2026-06-01",
        "comment": "Exceptional drape and fit. Looks very high-end."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "Champagne gold plated steel case",
      "Mesh stainless steel strap",
      "3 ATM water resistance",
      "Japan Quartz movement"
    ]
  },
  {
    "id": "100",
    "name": "Wide Brim Straw Hat",
    "price": 1499,
    "description": "Hand-woven paper straw hat with a black grosgrain ribbon trim. Perfect for summer sun protection.",
    "category": "women",
    "subcategory": "Accessories",
    "images": [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
    ],
    "colors": [
      {
        "name": "Camel Tan",
        "hex": "#C5A880"
      },
      {
        "name": "Emerald Green",
        "hex": "#1B4D3E"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.0,
    "reviews": [
      {
        "id": "rev_100_1",
        "userName": "Kabir S.",
        "rating": 4,
        "date": "2026-05-10",
        "comment": "Excellent quality fabric, fits true to size. Perfect for smart-casual wear."
      }
    ],
    "inStock": true,
    "isNewArrival": false,
    "isTrending": false,
    "isEditorsPick": false,
    "isBestSeller": false,
    "isSeasonal": false,
    "isFeatured": false,
    "details": [
      "100% Hand-woven paper straw",
      "Grosgrain band detail",
      "Adjustable inner sweatband",
      "Do not wash"
    ]
  }
];
