interface InputProps {
  label: string;
  type: string;
  id: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ label, type, id, name }) => {
  return (
    <div>
      <label className="font-medium">{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        required
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
      />
    </div>
  );
};

export default Input;
