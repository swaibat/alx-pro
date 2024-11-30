import { useState, useCallback } from 'react'

const useInfiniteScroll = ({ fetchData, hasNextPage, initialPage = 1 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState([])

  const loadMore = useCallback(async () => {
    if (isFetching || !hasNextPage) return

    setIsFetching(true)
    const newPage = currentPage + 1

    try {
      const newData = await fetchData(newPage)
      setData(prevData => [...prevData, ...newData])
      setCurrentPage(newPage)
    } catch (error) {
      console.error('Error fetching more data:', error)
    } finally {
      setIsFetching(false)
    }
  }, [currentPage, fetchData, hasNextPage, isFetching])

  return { data, isFetching, loadMore }
}

export default useInfiniteScroll
