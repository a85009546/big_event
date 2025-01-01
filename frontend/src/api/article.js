import request from '@/utils/request.js'

// 文章分類列表查詢
export const articleCategoryListService = () => {
  return request.get('/category')
}