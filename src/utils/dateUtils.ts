export const getMarkedDateKey = (date: string): string => {
  const dateObj = new Date(date);

  dateObj.setHours(dateObj.getHours() + 15);

  return dateObj.toLocaleDateString('en-CA');
};

// export const getMarkedDateKey = (date: string): string => {
//   const dateObj = new Date(date);

//   // 한국 시간 (UTC+9)으로 변환
//   const koreaOffset = 9 * 60; // KST는 UTC+9
//   const utcOffset = dateObj.getUTCMinutes(); // UTC 기준으로 분 단위 오프셋을 가져옵니다
//   const koreaTime = new Date(dateObj.getTime() + (koreaOffset - utcOffset) * 60000);

//   // 15시간을 더합니다.
//   koreaTime.setHours(koreaTime.getHours() + 15);

//   // 'en-CA' 형식으로 출력합니다 (ISO 8601: YYYY-MM-DD)
//   return koreaTime.toLocaleDateString('en-CA');
// };
