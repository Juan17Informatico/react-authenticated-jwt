import PropTypes from 'prop-types';

export const InputLabel = ({ label, name, type = "text", placeholder, id, errorMessage, onChange, value = ""}) => {
    return (
        <div>
            <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                { label }
            </label>
            <input
                type={ type }
                name={name}
                id={ id }
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={ placeholder }
                onChange={onChange}
                value={value}
            />
            {
                errorMessage && <small className="text-red-500">{ errorMessage }</small>
            }
        </div>
    );
};

// PropTypes
InputLabel.propTypes = {
    label: PropTypes.string.isRequired,          // label es un string requerido
    name: PropTypes.string.isRequired,           // name es un string requerido
    id: PropTypes.string,             // id es un string requerido
    type: PropTypes.string,
    placeholder: PropTypes.string,               // placeholder es opcional
    errorMessage: PropTypes.string,              // errorMessage es opcional
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
};

