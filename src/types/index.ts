export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'men' | 'women';
  subcategory: string;
  images: string[];
  colors: ColorOption[];
  sizes: string[];
  rating: number;
  reviews: Review[];
  inStock: boolean;
  isNewArrival: boolean;
  isTrending: boolean;
  isEditorsPick?: boolean;
  isBestSeller?: boolean;
  isSeasonal?: boolean;
  isFeatured?: boolean;
  badge?: 'New' | 'Trending' | 'Best Seller' | 'Limited Edition';
  details: string[];
}

export interface CartItem {
  id: string; // Combined product.id + size + color.name to uniquely identify items in cart
  product: Product;
  selectedColor: ColorOption;
  selectedSize: string;
  quantity: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryMethod: string;
}

export interface PaymentDetails {
  method: 'card' | 'upi' | 'cod';
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  upiId?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  subtotal: number;
  shippingFee: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  addresses: ShippingAddress[];
  savedCards: {
    id: string;
    cardHolder: string;
    cardNumber: string;
    expiry: string;
    brand: string;
  }[];
}
