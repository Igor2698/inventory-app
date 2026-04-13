const ProductsFilterForm = ({
  register,
  errors,
  productTypes,
  specificationOptions,
  onTypeChange,
  onSpecificationChange,
  labels,
}) => (
  <form className="products-page__filters" onSubmit={(event) => event.preventDefault()}>
    <div className="products-page__filter-field">
      <label htmlFor="typeFilter" className="form-label">
        {labels.type}
      </label>
      <select
        id="typeFilter"
        className="form-select products-page__filter"
        {...register('type', {
          onChange: onTypeChange,
        })}
      >
        {productTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
    <div className="products-page__filter-field">
      <label htmlFor="specificationFilter" className="form-label">
        {labels.specification}
      </label>
      <select
        id="specificationFilter"
        className={`form-select products-page__filter ${errors.specification ? 'is-invalid' : ''}`}
        {...register('specification', {
          onChange: onSpecificationChange,
        })}
      >
        {specificationOptions.map((specification) => (
          <option key={specification} value={specification}>
            {specification}
          </option>
        ))}
      </select>
      {errors.specification && (
        <div className="invalid-feedback d-block">{errors.specification.message}</div>
      )}
    </div>
  </form>
)

export default ProductsFilterForm
