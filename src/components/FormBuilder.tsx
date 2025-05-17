import { useState, type ChangeEvent } from "react";
import { useFormStore } from "../store/store";
import FormField from "./FormField";

interface FormFields {
  label: string;
  type: "text" | "number" | "password" | "textarea" | "date" | "file";
  value: string;
}

// interface FormStoreState {
//   formFields: FormFields[];

//   addField: (field: FormFields) => void;

//   removeField: (index: number) => void;

//   updateField: (index: number, updatedField: FormFields) => void;

//   resetForm: () => void;
// }

const FormBuilder = () => {
  const { formFields, addField, removeField, updateField, resetForm } =
    useFormStore();

  const [newField, setNewField] = useState<FormFields>({
    label: "",
    type: "text",
    value: "",
  });

  //   functions

  function handleAddField() {
    addField(newField);
    setNewField({
      label: "",
      type: "text",
      value: "",
    });
  }

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNewField((prev) => ({ ...prev, [name]: value }));
  };

  function handleFieldUpdate(index: number, updatedField: FormFields) {
    updateField(index, updatedField);
  }

  function handleFieldRemove(index: number) {
    removeField(index);
  }

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-4 text-2xl font-bold text-center ">Form Builder</h1>

      <div className="flex flex-col mb-6">
        <input
          type="text"
          name="label"
          placeholder="Label"
          value={newField.label}
          onChange={handleFieldChange}
          className="p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="type"
          value={newField.type}
          onChange={handleFieldChange}
          className="p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="textarea">Textarea</option>
          <option value="date">Date</option>
          <option value="field">Field</option>
        </select>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddField}
            className="px-4 py-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Field
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 text-white transition duration-200 bg-red-500 rounded hover:bg-red-600"
          >
            Reset Form
          </button>
        </div>
      </div>

      <form>
        {formFields.map((field:FormFields, index:number) => (
          <FormField
            key={index}
            field={field}
            index={index}
            onUpdate={handleFieldUpdate}
            onRemove={handleFieldRemove}
          />
        ))}
      </form>
    </div>
  );
};

export default FormBuilder;
