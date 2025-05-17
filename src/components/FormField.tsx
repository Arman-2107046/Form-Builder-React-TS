import React from "react";

interface FormFieldProps {
  field: {
    label: string;
    type: "text" | "number" | "password" | "textarea" | "date" | "file";
    value: string;
  };

  index: number;

  onUpdate: (
    index: number,

    updatedField: {
      label: string;
      type: "text" | "number" | "password" | "textarea" | "date" | "file";
      value: string;
    }
  ) => void;

  onRemove: (index: number) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  index,
  onUpdate,
  onRemove,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onUpdate(index, { ...field, value: e.target.value });
  };

  // const handleFileChange(e:React.ChangeEvent<HTMLInputElement>)=>{
  //   onUpdate(index,{...field, value:e.target.files?Array.from(e.target.files).map((file)=>file.name).join(', '):''})
  // }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // onUpdate(index, {
    //   field,
    //   value: Array.from(e.target.files)
    //     .map((file) => file.name)
    //     .join(", "),
    // });

    onUpdate(index, {...
      field,
      value: Array.from(e.target.files)
        .map((file) => file.name)
        .join(", "),
    });
  };

  return (
    <div className="p-4 mb-4 rounded-lg shadow-md borarouder-gray-300">
      <label className="block mb-2 text-lg font-medium text-gray-700">
        {field.label}
      </label>

      {field.type === "textarea" ? (
        <textarea
          value={field.value}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      ) : field.type === "file" ? (
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-lg"
        />
      ) : (
        // <input
        //   type={field.type}
        //   value={field.type === "file" ? "" : field.value}
        // />
        <input
          type={field.type}
          value={field.value}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg"
        />
        
      )
      
      }

      <button
        type="button"
        onClick={() => onRemove(index)}
        className="block px-4 py-1 mt-2 text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
};

export default FormField;
