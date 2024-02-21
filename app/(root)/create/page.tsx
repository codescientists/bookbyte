'use client'

import EbookForm from "@/components/EbookForm";

const CreateEvent = () => {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-2 md:py-10">
        <h3 className="font-semibold text-xl text-center sm:text-left">Create Ebook</h3>
      </section>

      <div>
        <EbookForm type="Create" />
      </div>
    </>
  )
}

export default CreateEvent