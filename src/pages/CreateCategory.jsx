import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useDispatch} from 'react-redux';
import * as Yup from "yup"
import { createCategoryData, updateCategoryData } from '../store/slices/categorySlice';
import { ToastContainer, toast } from 'react-toastify';

const CreateCategory = ({ baseData }) => {
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
    };

    const categoryUrl = "https://online-shop-db-i7by.onrender.com/categories"

    function categoryUpdated(categoryUrl, id, updateData) {
        dispatch(updateCategoryData({ categoryUrl, id, updateData }))
        toast.success('Category Updated', {
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

    function categoryCreated(categoryUrl, categoryData) {
        dispatch(createCategoryData({ categoryUrl, categoryData }))
        toast.success('Category Created', {
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

    const validationSchema = Yup.object({
        title: Yup.string().max(50, "Max character 50").required('Category name is required'),
        image: Yup.string().url('Invalid image url').required("Image is required")
    })
    return (
        <div>
            <Formik initialValues={baseData ?
                {
                    title: baseData.title,
                    image: baseData.image
                }
                : {
                    title: "",
                    image: ""
                }}
                onSubmit={(values, actions) => {
                    const newValues = { ...values, slug: slug(values.title) }
                    baseData ?
                        categoryUpdated(categoryUrl, baseData.id, newValues)
                        :
                        categoryCreated(categoryUrl, newValues)

                    actions.resetForm()
                }}
                validationSchema={validationSchema}>

                <Form className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="title">Category Name:</label>
                        <Field className="bg-gray-700 px-[20px] py-[8px] outline-none border-[2px] border-gray-700 rounded-sm focus:border-indigo-500" type="text" id="title" name="title" placeholder="Enter the category name" />
                        <span className='text-[12px] text-red-500 font-medium'><ErrorMessage name='title' /></span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="image">Image Url:</label>
                        <Field className=" bg-gray-700 px-[20px] py-[8px] outline-none border-[2px] border-gray-700 rounded-sm focus:border-indigo-500" type="text" id="image" name="image" placeholder="Enter the image url" />
                        <span className='text-[12px] text-red-500 font-medium'><ErrorMessage name='image' /></span>
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

export default CreateCategory