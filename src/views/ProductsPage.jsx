'use client'

import { useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useForm, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useI18n } from '../i18n/I18nProvider'
import { setFilterSpecification, setFilterType } from '../store/productsSlice'

const ProductsFilterForm = dynamic(
  () => import('../components/products/ProductsFilterForm'),
  {
    loading: () => <div>Loading filters...</div>,
  },
)

const ProductsTable = dynamic(
  () => import('../components/products/ProductsTable'),
  {
    loading: () => <div>Loading table...</div>,
  },
)

const ProductsPage = () => {
  const dispatch = useDispatch()
  const { t } = useI18n()
  const products = useSelector((state) => state.products.items)
  const orders = useSelector((state) => state.orders.items)
  const filterType = useSelector((state) => state.products.filterType)
  const filterSpecification = useSelector((state) => state.products.filterSpecification)
  const searchQuery = useSelector((state) => state.ui.searchQuery)
  const {
    register,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: filterType,
      specification: filterSpecification,
    },
  })

  const selectedType = useWatch({ control, name: 'type' })
  const selectedSpecification = useWatch({ control, name: 'specification' })

  const productTypes = useMemo(
    () => ['All', ...new Set(products.map((item) => item.type))],
    [products],
  )

  const specificationOptions = useMemo(() => {
    const scopedProducts =
      selectedType === 'All'
        ? products
        : products.filter((item) => item.type === selectedType)
    return [
      'All',
      ...new Set(scopedProducts.map((item) => item.specification).filter(Boolean)),
    ]
  }, [products, selectedType])

  useEffect(() => {
    dispatch(setFilterType(selectedType))
  }, [dispatch, selectedType])

  useEffect(() => {
    dispatch(setFilterSpecification(selectedSpecification))
  }, [dispatch, selectedSpecification])

  const validateSpecification = (value, currentType) =>
    value === 'All' ||
    products.some(
      (item) =>
        item.specification === value &&
        (currentType === 'All' || item.type === currentType),
    ) ||
    t('specificationValidation')

  const handleTypeChange = (event) => {
    const nextType = event.target.value
    setValue('type', nextType, { shouldDirty: true })
    const validationResult = validateSpecification(selectedSpecification, nextType)
    if (validationResult !== true) {
      setError('specification', {
        type: 'validate',
        message: validationResult,
      })
      setValue('specification', 'All', {
        shouldValidate: true,
        shouldDirty: true,
      })
      return
    }
    clearErrors('specification')
  }

  const handleSpecificationChange = (event) => {
    const nextSpecification = event.target.value
    const validationResult = validateSpecification(nextSpecification, selectedType)
    if (validationResult === true) {
      clearErrors('specification')
      return
    }
    setError('specification', {
      type: 'validate',
      message: validationResult,
    })
  }

  const visibleProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    return products.filter((item) => {
      const matchesType = selectedType === 'All' || item.type === selectedType
      if (!matchesType) return false
      const matchesSpecification =
        selectedSpecification === 'All' || item.specification === selectedSpecification
      if (!matchesSpecification) return false
      if (!normalizedQuery) return true
      return `${item.title} ${item.serialNumber} ${item.type} ${item.specification || ""}`
        .toLowerCase()
        .includes(normalizedQuery)
    })
  }, [products, searchQuery, selectedSpecification, selectedType])

  return (
    <section className="products-page">
      <div className="products-page__head">
        <h2>{t('products')} / {visibleProducts.length}</h2>
        <ProductsFilterForm
          register={register}
          errors={errors}
          productTypes={productTypes}
          specificationOptions={specificationOptions}
          onTypeChange={handleTypeChange}
          onSpecificationChange={handleSpecificationChange}
          labels={{ type: t('type'), specification: t('specification') }}
        />
      </div>
      <ProductsTable
        products={visibleProducts}
        orders={orders}
        labels={{
          title: t('title'),
          type: t('type'),
          warranty: t('warranty'),
          price: t('price'),
          order: t('order'),
        }}
      />
    </section>
  )
}

export default ProductsPage
