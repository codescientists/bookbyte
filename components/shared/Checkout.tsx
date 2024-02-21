import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';

import { Button } from '../ui/button';
import { IEbook } from '@/lib/database/models/ebook.model';
import { checkoutOrder } from '@/lib/actions/order.actions';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ ebook, userId }: { ebook: IEbook, userId: string }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      ebookTitle: ebook.title,
      ebookId: ebook._id,
      price: ebook.price,
      isFree: ebook.isFree,
      buyerId: userId,
      imageUrl: ebook.imageUrl
    }

    await checkoutOrder(order);
  }

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        Buy now
      </Button>
    </form>
  )
}

export default Checkout