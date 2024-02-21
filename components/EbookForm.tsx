"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ebookFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"

import { useRouter } from "next/navigation"
import { IndianRupeeIcon, Link2Icon } from "lucide-react"
import { useUploadThing } from "@/lib/uploadthing"
import Dropdown from "./Dropdown"
import { createEbook, updateEbook } from "@/lib/actions/ebook.actions"
import { useUser } from "@clerk/nextjs"


const ebookDefaultValues = {
    title: '',
    description: '',
    imageUrl: '',
    categoryId: '',
    price: '',
    pdfUrl: '',
}

type EbookFormProps = {
  type: "Create" | "Update"
  ebook?: any,
  ebookId?: string
}

const EbookForm = ({ type, ebook, ebookId }: EbookFormProps) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const [files, setFiles] = useState<File[]>([])
  const initialValues = ebook && type === 'Update' 
    ? { 
      ...ebook
    }
    : ebookDefaultValues;

  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader')

  const form = useForm<z.infer<typeof ebookFormSchema>>({
    resolver: zodResolver(ebookFormSchema),
    defaultValues: initialValues
  })
 
  async function onSubmit(values: z.infer<typeof ebookFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if(files.length > 0) {
      const uploadedImages = await startUpload(files)

      if(!uploadedImages) {
        return
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if(type === 'Create') {
      try {
        const newEbook = await createEbook({
          title: values.title,
          description: values.description,
          price: values.price,
          imageUrl: uploadedImageUrl,
          pdfUrl: values.pdfUrl,
          category: values.category,
          publisher: userId,
          path: '/create'
        })

        if(newEbook) {
          form.reset();
          router.push(`/ebooks/${newEbook._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }

    if(type === 'Update') {
      if(!ebookId) {
        router.back()
        return;
      }

      try {
        const updatedEbook = await updateEbook({
          ebookId: ebookId,
          title: values.title,
          description: values.description,
          price: values.price,
          imageUrl: uploadedImageUrl,
          pdfUrl: values.pdfUrl,
          category: values.category,
          publisher: userId,
          path: `/ebooks/${ebookId}`
        })

        if(updatedEbook) {
          form.reset();
          router.push(`/ebooks/${updatedEbook._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Ebook title" {...field} className="input-field bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-[54px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-4">
                    <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <FileUploader 
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <IndianRupeeIcon />
                      <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
            <FormField
              control={form.control}
              name="pdfUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Link2Icon />
                      <Input type="text" placeholder="Enter your PDF url (Drive URL)" {...field} className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
        </div>

        <Button 
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? (
            'Submitting...'
          ): `${type} Ebook `}</Button>
      </form>
    </Form>
  )
}

export default EbookForm