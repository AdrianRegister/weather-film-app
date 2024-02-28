const Search = ({
  labelText,
  buttonText,
  state,
  SetState,
  handleSubmit,
  placeholder,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cityInput">{labelText}</label>
        <br />
        <input
          type="text"
          id="search-city"
          name="search-city"
          placeholder={placeholder}
          onChange={(e) => SetState(e.target.value)}
          value={state}
        />
        <br />
        <button
          className="bg-sky-600 rounded-md text-white p-1 hover:bg-sky-800 active:bg-sky-950 mt-2"
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default Search;
