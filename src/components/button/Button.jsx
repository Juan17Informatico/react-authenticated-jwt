import propTypes from "prop-types"; 

export const Button = ({ value, type = "submit" }) => {
  return (
    <button
        type={type}
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
        { value }
    </button>
  )
}


Button.propTypes = {
    value: propTypes.string.isRequired,
    type: propTypes.string,
}