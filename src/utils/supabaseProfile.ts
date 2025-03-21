import supabaseClient from './SupabaseClient';

const DB_NAME = 'profiles';

// 행(rows) 데이터 읽기
export const getProfile = async ({
  // 특정 열(columns) 읽기
  columns = '*',
  // 정렬
  orderBy = 'updated_at',
  isAscending = false,
} = {}) => {
  

  return supabaseClient
    .from(DB_NAME)
    .select(columns)
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
