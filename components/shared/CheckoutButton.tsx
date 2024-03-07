"use client"

import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'
import { IEbook } from '@/lib/database/models/ebook.model'

const CheckoutButton = ({ ebook }: { ebook: IEbook }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  return (
    <div className="flex items-center gap-3">
        <SignedOut>
          <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">
              Get Tickets
              </Link>
          </Button>
        </SignedOut>

        <SignedIn>
            <Checkout ebook={ebook} userId={userId} />
        </SignedIn>
    </div>
  )
}

export default CheckoutButton