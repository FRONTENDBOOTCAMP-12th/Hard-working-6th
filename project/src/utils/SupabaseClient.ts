import { createClient } from '@supabase/supabase-js';
import { Database } from '../../database.types';

const { VITE_SB_URL, VITE_SB_KEY } = import.meta.env;
console.log(VITE_SB_URL, VITE_SB_KEY);

// Supabase 데이터베이스와 상호 작용할 싱글 Supabase 클라이언트 생성
const supabaseClient = createClient<Database>(VITE_SB_URL, VITE_SB_KEY);

export default supabaseClient;
