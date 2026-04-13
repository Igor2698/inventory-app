'use client'

import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { I18nProvider } from '../i18n/I18nProvider'
import { setAuthToken } from '../services/api'
import { store } from '../store/store'
import { setFilterSpecification, setFilterType } from '../store/productsSlice'
import { bootstrapApp } from '../store/thunks'
import { setSearchQuery } from '../store/uiSlice'

const STORAGE_KEYS = {
  searchQuery: 'inventory.searchQuery',
  filterType: 'inventory.filterType',
  filterSpecification: 'inventory.filterSpecification',
  authToken: 'inventory.authToken',
}

const AppProviders = ({ children }) => {
  useEffect(() => {
    const savedSearch = localStorage.getItem(STORAGE_KEYS.searchQuery)
    const savedType = localStorage.getItem(STORAGE_KEYS.filterType)
    const savedSpecification = localStorage.getItem(STORAGE_KEYS.filterSpecification)
    const savedToken = localStorage.getItem(STORAGE_KEYS.authToken)

    if (savedToken !== null) setAuthToken(savedToken)

    if (savedSearch !== null) store.dispatch(setSearchQuery(savedSearch))
    if (savedType !== null) store.dispatch(setFilterType(savedType))
    if (savedSpecification !== null) store.dispatch(setFilterSpecification(savedSpecification))

    store.dispatch(bootstrapApp())

    const unsubscribe = store.subscribe(() => {
      const state = store.getState()
      localStorage.setItem(STORAGE_KEYS.searchQuery, state.ui.searchQuery)
      localStorage.setItem(STORAGE_KEYS.filterType, state.products.filterType)
      localStorage.setItem(STORAGE_KEYS.filterSpecification, state.products.filterSpecification)
    })

    return unsubscribe
  }, [])

  return (
    <Provider store={store}>
      <I18nProvider>{children}</I18nProvider>
    </Provider>
  )
}

export default AppProviders
