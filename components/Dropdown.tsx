import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { ICategory } from "@/lib/database/models/category.model"
  import { startTransition, useEffect, useState } from "react"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { createCategory, getAllCategories } from "@/lib/actions/category.actions"
  
  type DropdownProps = {
    value: string
    onChangeHandler?: () => void
  }
  
  const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [newCategory, setNewCategory] = useState('');

    // Generating slug 
    function slugify(str: string) {
      return str.toLowerCase()
        .replace(/[^a-z0-9-]+/g, '-') // Remove non-alphanumeric characters
        .replace(/-+/g, '-')         // Replace multiple hyphens with single
        .trim();                  // Trim leading/trailing hyphens
    }
    
  
    const handleAddCategory = () => {
      createCategory({
        name: newCategory,
        slug: slugify(newCategory),
      })
        .then((category:any) => {
          setCategories((prevState) => [...prevState, category])
        })
    }
  
    useEffect(() => {
      const getCategories = async () => {
        const categoryList = await getAllCategories();
  
        categoryList && setCategories(categoryList as ICategory[])
      }
  
      getCategories();
    }, [])
  
    return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="flex items-center h-[54px] overflow-hidden rounded-full bg-gray-50 px-4 py-2">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.length > 0 && categories.map((category) => (
            <SelectItem key={category._id} value={category._id} className="">
              {category.name}
            </SelectItem>
          ))}
  
          <AlertDialog>
            <AlertDialogTrigger className="p-14 flex w-full rounded-sm py-3 pl-8">Add new category</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    )
  }
  
  export default Dropdown