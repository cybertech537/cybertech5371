export default function InputField({ name, label, placeholder, register, validation = {}, errors, type = 'text', options = [], classname='' }) {
   return (
      <div className={classname}>
         <label htmlFor={name} className='block mb-2 text-lg font-semibold'>
            {label}
            {validation.required && <span className="text-red-600 inline-block ml-1">*</span>}
         </label>
         {/* input or select-option */}
         {type === 'select' ? (
            <select
               id={name}
               {...register(name, validation)}
               className='w-full px-4 py-2.5 rounded border border-gray-200 bg-white'
            >
               <option value="">Select {label}</option>
               {options?.map((option, index) => (
                  <option key={index} value={option.value}>
                     {option.label}
                  </option>
               ))}
            </select>
         ) : type === 'textarea' ? (
            <textarea
               id={name}
               {...register(name, validation)}
               placeholder={placeholder}
               className='w-full px-4 py-2.5 rounded border border-gray-200'
               rows="6"
            ></textarea>
         ) : (
            <input id={name} {...register(name, validation)} placeholder={placeholder} type={type ? type : `text`} className='w-full px-4 py-2.5 rounded border border-gray-200' />

         )}
         {errors[name] && (
            <p className='text-red-600'>{errors[name].message}</p>
         )}

      </div>
   )
}
