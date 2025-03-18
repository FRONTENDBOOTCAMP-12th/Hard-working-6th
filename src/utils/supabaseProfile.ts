import supabaseClient from './SupabaseClient';

const DB_NAME = 'profiles';

// 행(rows) 데이터 읽기
export const getProfile = async ({
  // 특정 열(columns) 읽기
  columns = '*',
  // 페이지네이션
  page = 0,
  perPage = 10,
  // 정렬
  orderBy = 'created_at',
  isAscending = false,
} = {}) => {
  const fromIndex = page > 0 ? page + perPage - 1 : 0;
  const toIndex = perPage > 1 ? page + perPage - 1 : fromIndex;

  return supabaseClient
    .from(DB_NAME)
    .select(columns)
    .range(fromIndex, toIndex)
    .order(orderBy, { ascending: isAscending })
    .returns<MemoListItem[]>();
};

// 행(row) 데이터 쓰기
export const addProfile = async (newItem: RequiredMemoListItem) => {
  return supabaseClient.from(DB_NAME).insert([newItem]).select();
};

// 행(row) 데이터 수정
export const editProfile = async (editItem: MemoListItem) => {
  return supabaseClient
    .from(DB_NAME)
    .update(editItem)
    .eq('id', editItem.id)
    .select();
};

// 행(row) 데이터 삭제
export const deleteProfile = async (deleteItem: MemoListItem) => {
  return supabaseClient.from(DB_NAME).delete().eq('id', deleteItem.id);
};
