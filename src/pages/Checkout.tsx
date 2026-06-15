import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle, Truck, CreditCard, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartQuery, useRemoveFromCartMutation } from '../hooks/useCart';
import { useUserStore } from '../store/useUserStore';
import type { ShippingAddress, Order } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

// Zod schema with conditional validations based on payment method
const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number (min 10 digits)'),
  address: z.string().min(5, 'Address is too short'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(5, 'Invalid zip code (min 5 digits)'),
  country: z.string().min(2, 'Country is required'),
  deliveryMethod: z.string(),
  paymentMethod: z.string(),
  // Card
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
  // UPI
  upiId: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === 'card') {
    if (!data.cardName || data.cardName.trim().length < 3) {
      ctx.addIssue({ code: 'custom', path: ['cardName'], message: 'Name on card is required' });
    }
    const cleanNum = data.cardNumber?.replace(/\s+/g, '') || '';
    if (!/^\d{16}$/.test(cleanNum)) {
      ctx.addIssue({ code: 'custom', path: ['cardNumber'], message: '16-digit card number is required' });
    }
    if (!data.cardExpiry || !/^\d{2}\/\d{2}$/.test(data.cardExpiry)) {
      ctx.addIssue({ code: 'custom', path: ['cardExpiry'], message: 'Expiry in MM/YY is required' });
    }
    if (!data.cardCvv || !/^\d{3}$/.test(data.cardCvv)) {
      ctx.addIssue({ code: 'custom', path: ['cardCvv'], message: '3-digit CVV is required' });
    }
  } else if (data.paymentMethod === 'upi') {
    if (!data.upiId || !data.upiId.includes('@')) {
      ctx.addIssue({ code: 'custom', path: ['upiId'], message: 'Valid UPI ID (e.g. user@okhdfc) is required' });
    }
  }
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const Checkout = () => {
  const { data: cartData, isLoading: isCartLoading } = useCartQuery();
  const cartItems = cartData?.data || [];
  const cartTotals = {
    subtotal: cartData?.subtotal || 0,
    shippingFee: cartData?.shipping || 0,
    estimatedTax: cartData?.estimatedTax || 0,
    discount: cartData?.discount || 0,
    total: cartData?.total || 0,
  };

  const removeFromCartMutation = useRemoveFromCartMutation();
  const clearCart = async () => {
    for (const item of cartItems) {
      await removeFromCartMutation.mutateAsync(item._id);
    }
  };

  const addOrder = useUserStore((state) => state.addOrder);
  const user = useUserStore((state) => state.user);

  // Checkout Success Overlay State
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);

  // Prepopulate form if user profile has saved address
  const defaultAddress = user?.addresses?.[0];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: defaultAddress?.firstName || '',
      lastName: defaultAddress?.lastName || '',
      email: defaultAddress?.email || '',
      phone: defaultAddress?.phone || '',
      address: defaultAddress?.address || '',
      city: defaultAddress?.city || '',
      postalCode: defaultAddress?.postalCode || '',
      country: defaultAddress?.country || 'France',
      deliveryMethod: 'courier',
      paymentMethod: 'card',
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      upiId: '',
    },
  });

  const selectedPaymentMethod = watch('paymentMethod');
  const selectedDelivery = watch('deliveryMethod');

  // Adjust totals based on selected delivery method
  const getSelectedDeliveryFee = () => {
    if (selectedDelivery === 'express') return 250;
    if (selectedDelivery === 'boutique') return 0;
    // Standard courier uses cart totals rules (free over 5000, else 150)
    return cartTotals.shippingFee;
  };

  const sessionDiscount = Number(sessionStorage.getItem('appliedDiscount') || '0');
  const discount = cartTotals.discount || sessionDiscount;

  const deliveryFee = getSelectedDeliveryFee();
  const taxes = cartTotals.estimatedTax;
  const totalAmount = Math.max(0, cartTotals.subtotal + deliveryFee + taxes - discount);

  const onSubmitForm = (data: CheckoutFormValues) => {
    // Simulate order placement
    const shippingInfo: ShippingAddress = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
      deliveryMethod:
        data.deliveryMethod === 'express'
          ? 'Express Overnight Courier'
          : data.deliveryMethod === 'boutique'
          ? 'Boutique Collection'
          : 'Standard Delivery Courier',
    };

    const newOrder: Order = {
      id: `JV-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: cartItems,
      subtotal: cartTotals.subtotal,
      shippingFee: deliveryFee,
      totalAmount,
      shippingAddress: shippingInfo,
      paymentMethod:
        data.paymentMethod === 'card'
          ? `Credit Card (${data.cardNumber?.slice(-4) || '•••• 4321'})`
          : data.paymentMethod === 'upi'
          ? `UPI (${data.upiId})`
          : 'Cash on Delivery (COD)',
      status: 'Processing',
    };

    // Save order & Clear cart
    addOrder(newOrder);
    setSuccessOrder(newOrder);
    clearCart();
  };

  if (isCartLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-44 pb-24 text-center">
        <span className="text-xs uppercase tracking-widest text-primary-muted font-bold font-sans animate-pulse">
          Loading Checkout Summary...
        </span>
      </div>
    );
  }

  if (cartItems.length === 0 && !successOrder) {
    return (
      <div className="pt-28 pb-20">
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 max-w-md mx-auto">
          <div className="mb-6 p-6 bg-luxury-cream flex items-center justify-center rounded-full">
            <ShoppingBag className="w-12 h-12 stroke-[1] text-accent" />
          </div>
          <h3 className="text-xl uppercase tracking-widest text-primary mb-2 font-serif font-medium">Your checkout bag is empty</h3>
          <p className="text-sm text-primary-muted mb-8 font-sans max-w-xs leading-relaxed">Please add products to your cart before proceeding to checkout.</p>
          <Link to="/women" className="bg-primary text-white hover:bg-transparent hover:text-primary py-3.5 px-8 text-xs uppercase tracking-widest font-sans font-bold border border-primary transition-all duration-300">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-24 page-transition-container relative">
      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {successOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white flex items-center justify-center px-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', damping: 25 }}
              className="max-w-xl w-full text-center py-10"
            >
              <div className="mb-6 flex justify-center">
                <CheckCircle className="w-16 h-16 text-accent stroke-[1]" />
              </div>
              
              <span className="text-[10px] uppercase tracking-mega text-accent font-bold mb-2 block">
                THANK YOU FOR YOUR ORDER
              </span>
              <h1 className="text-3xl font-serif tracking-widest text-primary mb-4 uppercase">
                Order Placed
              </h1>
              <p className="text-sm text-primary-muted font-sans mb-8 leading-relaxed max-w-md mx-auto">
                Your order <strong className="text-primary">{successOrder.id}</strong> has been successfully placed. We've sent a confirmation email to <strong className="text-primary">{successOrder.shippingAddress.email}</strong>.
              </p>

              {/* Order Info Cards */}
              <div className="bg-luxury-cream border border-luxury-border p-6 text-left mb-8 flex flex-col gap-4">
                <h4 className="text-xs uppercase tracking-widest font-bold border-b border-luxury-border pb-3">Order Details</h4>
                <div className="grid grid-cols-2 text-xs font-sans gap-y-3">
                  <span className="text-primary-muted">Order Date:</span>
                  <span className="font-semibold text-right">{successOrder.date}</span>

                  <span className="text-primary-muted">Payment Method:</span>
                  <span className="font-semibold text-right">{successOrder.paymentMethod}</span>

                  <span className="text-primary-muted">Shipping Destination:</span>
                  <span className="font-semibold text-right truncate">
                    {successOrder.shippingAddress.address}, {successOrder.shippingAddress.city}
                  </span>

                  <span className="text-primary-muted">Total Paid:</span>
                  <span className="font-bold text-base text-accent text-right">₹{successOrder.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/profile"
                  className="bg-primary text-white border border-primary hover:bg-transparent hover:text-primary py-3.5 px-8 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300"
                >
                  View Order Log
                </Link>
                <Link
                  to="/women"
                  className="border border-luxury-border bg-white text-primary hover:border-primary py-3.5 px-8 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-10 text-center md:text-left">
        <span className="text-[10px] uppercase tracking-mega text-accent font-bold">SECURE CHECKOUT</span>
        <h1 className="text-3xl uppercase font-serif tracking-widest mt-1">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Form Inputs (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          {/* Section 1: Customer Info */}
          <div>
            <h3 className="text-sm uppercase tracking-widest font-bold mb-6 flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-sans font-bold">1</span>
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="first-name" className="premium-label">First Name</label>
                <input
                  id="first-name"
                  type="text"
                  placeholder="Jean"
                  {...register('firstName')}
                  className="premium-input"
                />
                {errors.firstName && <span className="text-xs text-rose-500 font-sans mt-1 block">{errors.firstName.message}</span>}
              </div>
              
              <div>
                <label htmlFor="last-name" className="premium-label">Last Name</label>
                <input
                  id="last-name"
                  type="text"
                  placeholder="Dupont"
                  {...register('lastName')}
                  className="premium-input"
                />
                {errors.lastName && <span className="text-xs text-rose-500 font-sans mt-1 block">{errors.lastName.message}</span>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="premium-label">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="jean.dupont@atelier.com"
                  {...register('email')}
                  className="premium-input"
                />
                {errors.email && <span className="text-xs text-rose-500 font-sans mt-1 block">{errors.email.message}</span>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="phone" className="premium-label">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+33 6 1234 5678"
                  {...register('phone')}
                  className="premium-input"
                />
                {errors.phone && <span className="text-xs text-rose-500 font-sans mt-1 block">{errors.phone.message}</span>}
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Destination */}
          <div>
            <h3 className="text-sm uppercase tracking-widest font-bold mb-6 flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-sans font-bold">2</span>
              Shipping Destination
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label htmlFor="address" className="premium-label">Street Address</label>
                <input
                  id="address"
                  type="text"
                  placeholder="14 Rue du Faubourg Saint-Honoré"
                  {...register('address')}
                  className="premium-input"
                />
                {errors.address && <span className="text-xs text-rose-500 font-sans mt-1 block">{errors.address.message}</span>}
              </div>

              <div>
                <label htmlFor="city" className="premium-label">City</label>
                <input
                  id="city"
                  type="text"
                  placeholder="Paris"
                  {...register('city')}
                  className="premium-input"
                />
                {errors.city && <span className="text-xs text-rose-500 font-sans mt-1 block">{errors.city.message}</span>}
              </div>

              <div>
                <label htmlFor="postal-code" className="premium-label">Postal Code</label>
                <input
                  id="postal-code"
                  type="text"
                  placeholder="75008"
                  {...register('postalCode')}
                  className="premium-input"
                />
                {errors.postalCode && <span className="text-xs text-rose-500 font-sans mt-1 block">{errors.postalCode.message}</span>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="country" className="premium-label">Country</label>
                <select
                  id="country"
                  {...register('country')}
                  className="w-full bg-transparent border-b border-luxury-border py-3 px-1 text-sm focus:border-primary focus:outline-none transition-colors duration-300 font-sans cursor-pointer"
                >
                  <option value="France">France</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Italy">Italy</option>
                  <option value="Japan">Japan</option>
                </select>
                {errors.country && <span className="text-xs text-rose-500 font-sans mt-1 block">{errors.country.message}</span>}
              </div>
            </div>
          </div>

          {/* Section 3: Delivery Options */}
          <div>
            <h3 className="text-sm uppercase tracking-widest font-bold mb-6 flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-sans font-bold">3</span>
              Delivery Options
            </h3>

            <div className="flex flex-col gap-4">
              <label className="flex items-center justify-between p-4 border border-luxury-border hover:border-primary cursor-pointer transition-colors bg-white/50">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="courier"
                    {...register('deliveryMethod')}
                    className="accent-primary w-4 h-4"
                  />
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold block">Standard Courier</span>
                    <span className="text-[10px] text-primary-muted font-sans font-medium">3-5 Business Days</span>
                  </div>
                </div>
                <span className="text-xs font-semibold font-sans">
                  {cartTotals.subtotal > 5000 ? 'FREE' : `₹${cartTotals.shippingFee.toLocaleString('en-IN')}`}
                </span>
              </label>

              <label className="flex items-center justify-between p-4 border border-luxury-border hover:border-primary cursor-pointer transition-colors bg-white/50">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="express"
                    {...register('deliveryMethod')}
                    className="accent-primary w-4 h-4"
                  />
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold block">Express Overnight</span>
                    <span className="text-[10px] text-primary-muted font-sans font-medium">Next Business Day</span>
                  </div>
                </div>
                <span className="text-xs font-semibold font-sans">₹250</span>
              </label>

              <label className="flex items-center justify-between p-4 border border-luxury-border hover:border-primary cursor-pointer transition-colors bg-white/50">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="boutique"
                    {...register('deliveryMethod')}
                    className="accent-primary w-4 h-4"
                  />
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold block">Boutique Collection</span>
                    <span className="text-[10px] text-primary-muted font-sans font-medium">In-store pickup (JOVA Paris)</span>
                  </div>
                </div>
                <span className="text-xs font-semibold font-sans text-emerald-600">FREE</span>
              </label>
            </div>
          </div>

          {/* Section 4: Payment Panel */}
          <div>
            <h3 className="text-sm uppercase tracking-widest font-bold mb-6 flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-sans font-bold">4</span>
              Payment Details
            </h3>

            {/* Payment Method Selectors */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <label className={`border p-4 text-center cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 ${
                selectedPaymentMethod === 'card' ? 'border-primary bg-primary text-white' : 'border-luxury-border bg-white text-primary hover:border-primary'
              }`}>
                <input
                  type="radio"
                  value="card"
                  {...register('paymentMethod')}
                  className="sr-only"
                />
                <CreditCard className="w-4 h-4" />
                <span className="text-[9px] uppercase tracking-widest font-sans font-bold">Credit Card</span>
              </label>

              <label className={`border p-4 text-center cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 ${
                selectedPaymentMethod === 'upi' ? 'border-primary bg-primary text-white' : 'border-luxury-border bg-white text-primary hover:border-primary'
              }`}>
                <input
                  type="radio"
                  value="upi"
                  {...register('paymentMethod')}
                  className="sr-only"
                />
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[9px] uppercase tracking-widest font-sans font-bold">UPI</span>
              </label>

              <label className={`border p-4 text-center cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 ${
                selectedPaymentMethod === 'cod' ? 'border-primary bg-primary text-white' : 'border-luxury-border bg-white text-primary hover:border-primary'
              }`}>
                <input
                  type="radio"
                  value="cod"
                  {...register('paymentMethod')}
                  className="sr-only"
                />
                <Truck className="w-4 h-4" />
                <span className="text-[9px] uppercase tracking-widest font-sans font-bold">Cash Delivery</span>
              </label>
            </div>

            {/* Sub-Forms for payment options */}
            <div className="bg-luxury-cream/45 p-6 border border-luxury-border/80">
              
              {/* Option A: Card Form */}
              {selectedPaymentMethod === 'card' && (
                <div className="flex flex-col gap-4 animate-fade-in">
                  <div>
                    <label htmlFor="card-name" className="premium-label">Name on Card</label>
                    <input
                      id="card-name"
                      type="text"
                      placeholder="JEAN DUPONT"
                      {...register('cardName')}
                      className="premium-input bg-white/40 px-2"
                    />
                    {errors.cardName && <span className="text-xs text-rose-500 font-sans mt-1 block">{errors.cardName.message}</span>}
                  </div>

                  <div>
                    <label htmlFor="card-number" className="premium-label">Card Number</label>
                    <input
                      id="card-number"
                      type="text"
                      placeholder="1234 5678 9876 5432"
                      maxLength={19}
                      {...register('cardNumber')}
                      className="premium-input bg-white/40 px-2"
                    />
                    {errors.cardNumber && <span className="text-xs text-rose-500 font-sans mt-1 block">{errors.cardNumber.message}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="card-expiry" className="premium-label">Expiration Date</label>
                      <input
                        id="card-expiry"
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        {...register('cardExpiry')}
                        className="premium-input bg-white/40 px-2"
                      />
                      {errors.cardExpiry && <span className="text-xs text-rose-500 font-sans mt-1 block">{errors.cardExpiry.message}</span>}
                    </div>

                    <div>
                      <label htmlFor="card-cvv" className="premium-label">CVV Code</label>
                      <input
                        id="card-cvv"
                        type="password"
                        placeholder="123"
                        maxLength={3}
                        {...register('cardCvv')}
                        className="premium-input bg-white/40 px-2"
                      />
                      {errors.cardCvv && <span className="text-xs text-rose-500 font-sans mt-1 block">{errors.cardCvv.message}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* Option B: UPI ID */}
              {selectedPaymentMethod === 'upi' && (
                <div className="animate-fade-in">
                  <label htmlFor="upi-id" className="premium-label">UPI ID</label>
                  <input
                    id="upi-id"
                    type="text"
                    placeholder="jean.dupont@okhdfc"
                    {...register('upiId')}
                    className="premium-input bg-white/40 px-2"
                  />
                  {errors.upiId && <span className="text-xs text-rose-500 font-sans mt-1 block">{errors.upiId.message}</span>}
                  <span className="text-[10px] text-primary-muted font-sans mt-2 block">
                    You will receive a payment request notification on your UPI app to complete payment.
                  </span>
                </div>
              )}

              {/* Option C: Cash on Delivery (COD) */}
              {selectedPaymentMethod === 'cod' && (
                <div className="text-xs text-primary-muted font-sans leading-relaxed animate-fade-in">
                  <p className="font-semibold text-primary mb-1">Cash on Delivery selected.</p>
                  <p>You will pay for your luxury apparel package in cash upon courier package drop-off at your shipping destination.</p>
                  <p className="mt-2 text-[10px] text-accent font-bold">Please note: An additional $5 processing fee may apply.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary Right Panel (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="bg-luxury-cream border border-luxury-border p-6 md:p-8 flex flex-col gap-6 sticky top-24">
            <h3 className="text-xs uppercase tracking-mega font-bold text-accent">Summary of Pieces</h3>

            {/* Cart Items listing */}
            <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto no-scrollbar border-b border-luxury-border pb-6">
              {cartItems.map((item: any) => (
                <div key={item._id} className="flex gap-4 items-center">
                  <div className="w-12 aspect-[3/4] overflow-hidden bg-white border border-luxury-border/50">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow text-xs font-sans">
                    <h4 className="font-semibold text-primary uppercase truncate max-w-[160px]">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-primary-muted uppercase mt-0.5">
                      QTY: {item.quantity} &bull; Size: {item.size}
                    </p>
                  </div>
                  <span className="text-xs font-semibold font-sans text-right">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="flex flex-col gap-4 border-b border-luxury-border pb-6 text-xs font-sans text-primary">
              <div className="flex justify-between">
                <span className="text-primary-muted uppercase tracking-wider">Subtotal</span>
                <span className="font-semibold">₹{cartTotals.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-muted uppercase tracking-wider">Shipping Fee</span>
                <span className="font-semibold uppercase text-emerald-600">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="flex justify-between text-primary-muted">
                <span className="uppercase tracking-wider">Taxes (5%)</span>
                <span className="font-medium">₹{taxes.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span className="uppercase tracking-wider">Promo Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Grand Total */}
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-widest font-bold">Grand Total</span>
              <span className="text-xl font-bold font-sans text-accent">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white text-center py-4 text-xs uppercase tracking-widest font-sans font-bold border border-primary hover:bg-transparent hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              {isSubmitting ? 'Processing Securely...' : 'Place Secure Order'} <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[9px] text-primary-muted font-sans text-center mt-2 flex flex-col gap-1">
              <span>JOVA uses 256-bit SSL encryption. Your connection is secure.</span>
              <span className="underline cursor-pointer hover:text-primary">View Purchase Terms</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
