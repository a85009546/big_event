import request from '@/utils/request.js'

// 文章分類列表查詢
export const articleCategoryListService = () => {
  return request.get('/category')
}

// 文章分類添加
export const articleCategoryAddService = (categoryData) => {
  return request.post('/category', categoryData)
}

// 編輯文章分類
export const articleCategoryUpdateService = (categoryData) => {
  return request.put('/category', categoryData)
}

// 刪除文章分類
export const articleCategoryDeleteService = (categoryId) => {
  return request.delete('/category?id=' + categoryId)
}