import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from "yup"
import 'boxicons'
import { createProductData, updateProductData } from '../store/slices/productSlice';

const CreateProduct = ({ baseData}) => {
  const { categories } = useSelector(state => state.category)
  const dispatch = useDispatch()
  const slug = function (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  const productUrl = "http://localhost:3000/products"

  function productUpdated(productUrl, id, updateData) {
    dispatch(updateProductData({ productUrl, id, updateData }))
    toast.success('Product Updated', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  function productCreated(productUrl, productData) {
    dispatch(createProductData({ productUrl, productData }))
    toast.success('Product Created', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  const imagesInput = useRef(null)
  const [images, setImages] = useState(baseData ? baseData.images : [])
  const imagesContent = useRef()

  function saveImageUrl(element) {
    const value = element.current.value

    if (value.length > 0) {
      if (!images.find(item => item === value)) {
        setImages(prev => {
          const finalValue = [...prev, value]
          return finalValue
        })
        element.current.value = ""
      }
    }
  }

  useEffect(() => {
    imagesContent.current.innerHTML = ""
    images.forEach((url, index) => {
      imagesContent.current.innerHTML +=
        `<div class="p-[2px] flex justify-center text-[14px] mb-[2px] pl-[5px] items-center rounded-md bg-gray-800 hover:bg-gray-900 border-[1px] cursor-pointer">
          <span>image-${index + 1}</span>
          <span data-url = ${url} class="bg-white rounded-md bx-close text-[12px] active:scale-95 cursor-pointer flex justify-center items-center">
          <box-icon name='x'></box-icon>
          </span>
      </div>`
    }
    )
    const bxCloseBtns = document.querySelectorAll(".bx-close")
    bxCloseBtns.forEach(btnClose => {
      btnClose.addEventListener("click", () => {
        const url = btnClose.dataset.url
        setImages(prev => prev.filter(item => item !== url))
      })
    })
  }, [images.length])

  const validationSchema = Yup.object({
    title: Yup.string().max(100, "Max character 100").required('Product name is required'),
    price: Yup.number().required("Price is required"),
    description: Yup.string().min(20, "Min character 20").required("Description is required"),
    categoryId: Yup.string().required("Category Is required")
  })
  return (
    <div>
      <Formik initialValues={baseData ?
        {
          title: baseData.title,
          images: baseData.images,
          price: baseData.price,
          description: baseData.description,
          categoryId: baseData.categoryId
        }
        : {
          title: "",
          images: "",
          price: "",
          description: "",
          categoryId: ""
        }}
        onSubmit={(values, actions) => {
          values.images = images
          const newValues = { ...values, slug: slug(values.title) }
          baseData ?
            productUpdated(productUrl, baseData.id, newValues)
            :
            productCreated(productUrl, newValues)
          setImages([])
          actions.resetForm()
        }}
        validationSchema={validationSchema}
        validate={() => {
          const errors = {};
          if (images.length < 3) {
            errors.images = "Min image 3"
          }
          return errors;
        }}>


        <Form className='flex flex-col gap-2'>
          
          <div className='flex flex-col gap-1'>
            <label htmlFor="title">Products Name:</label>
            <Field className="bg-gray-700 px-[20px] py-[8px] outline-none border-[2px] border-gray-700 rounded-sm focus:border-indigo-500" type="text" id="title" name="title" placeholder="Enter the category name" />
            <span className='text-[12px] text-red-500 font-medium'><ErrorMessage name='title' /></span>
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="images">Images Url:</label>
            <div ref={imagesContent} className='flex justify-start items-center gap-1'>

            </div>

            <div className='relative'>
              <Field name="images" >
                {(field) => (
                  <input ref={imagesInput} {...field} type="url" id="images" placeholder="Enter the image url" className="w-full bg-gray-700 px-[20px] py-[8px] outline-none border-[2px] border-gray-700 rounded-sm focus:border-indigo-500" />
                )}
              </Field>
              <div className='absolute top-0 right-0 bottom-0 p-[5px]'>
                <button onClick={() => saveImageUrl(imagesInput)} type="button" className='h-full px-[15px] bg-gray-800 active:scale-95 hover:bg-gray-900'>
                  Save
                </button>
              </div>
            </div>

            <span className='text-[12px] text-red-500 font-medium'><ErrorMessage name='images' /></span>
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="price">Price:</label>
            <Field className=" bg-gray-700 px-[20px] py-[8px] outline-none border-[2px] border-gray-700 rounded-sm focus:border-indigo-500" type="text" id="price" name="price" placeholder="Enter the price" />
            <span className='text-[12px] text-red-500 font-medium'><ErrorMessage name='price' /></span>
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="description">Description:</label>
            <Field as="textarea" className="resize-none h-[100px] bg-gray-700 px-[20px] py-[8px] outline-none border-[2px] border-gray-700 rounded-sm focus:border-indigo-500" type="text" id="description" name="description" placeholder="Enter the description" />
            <span className='text-[12px] text-red-500 font-medium'><ErrorMessage name='description' /></span>
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="categoryId">Categories:</label>
            <Field as="select" className="bg-gray-700 px-[20px] py-[8px] outline-none border-[2px] border-gray-700 rounded-sm focus:border-indigo-500" type="text" id="categoryId" name="categoryId" placeholder="Select categories">
              <option>Select Category</option>
              {categories.map(item => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </Field>
            <span className='text-[12px] text-red-500 font-medium'><ErrorMessage name='categoryId' /></span>
          </div>

          <div className='flex items-center justify-end mt-[15px]'>
            <button type='submit' className='bg-indigo-600 font-medium px-[25px] py-[7px] rounded-md'>
              {baseData ? "Save" : "Send"}
            </button>
          </div>

        </Form>

      </Formik>
      
      <ToastContainer />
    </div>
  )
}

export default CreateProduct