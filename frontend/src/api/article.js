import request from '@/utils/request.js'

// 文章分類列表查詢
export const articleCategoryListService = () => {
  return request.get('/category')
}

// 文章分類添加
export const articleCategoryAddService = (categoryData) => {
  return request.post('/category', categoryData)
}