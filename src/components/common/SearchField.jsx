import { FiSearch } from 'react-icons/fi'

const SearchField = ({ value, onChange, placeholder = 'Search...' }) => (
  <label className="relative block">
    <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
    <input
      type="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field pl-11"
    />
  </label>
)

export default SearchField
