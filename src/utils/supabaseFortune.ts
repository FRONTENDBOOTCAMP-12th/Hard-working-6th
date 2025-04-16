import supabaseClient from './SupabaseClient';

const DB_NAME = 'user_fortune';

// 행(rows) 데이터 읽기
export const getFortune = async ({
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
export const addFortune = async (newItem: RequiredMemoListItem) => {
  return supabaseClient.from(DB_NAME).insert([newItem]).select();
};

// 행(row) 데이터 수정
export const editFortune = async (editItem: MemoListItem) => {
  return supabaseClient
    .from(DB_NAME)
    .update(editItem)
    .eq('user_id', editItem.user_id)
    .select();
};

// 행(row) 데이터 쓰기와 업데이트
export const upsertFortune = async (upsertItem: MemoListItem) => {
  // today_fortune은 문자열로 저장
  const payload = {
    ...upsertItem,
    today_fortune: JSON.stringify(upsertItem.today_fortune),
  };

  const { data, error } = await supabaseClient
    .from(DB_NAME)
    .upsert(payload, {
      onConflict: ['user_id', 'today_fortune_date'],
    })
    .select();

  if (error) {
    console.error('오늘의 운세 저장 실패:', error);
    throw error;
  }

  return data;
};

// 행(row) 데이터 삭제
export const deleteFortune = async (deleteItem: MemoListItem) => {
  return supabaseClient
    .from(DB_NAME)
    .delete()
    .eq('user_id', deleteItem.user_id);
};
