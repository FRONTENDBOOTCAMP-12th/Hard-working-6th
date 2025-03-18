export const getMarkedDateKey = (date: string): string => {
  const dateObj = new Date(date);

  // 예를 들어 KST(한국시간 UTC+9)로 변환
  dateObj.setHours(dateObj.getHours() - 9);

  // 변환된 날짜를 "YYYY-MM-DD" 형식으로 반환
  return dateObj.toLocaleDateString('en-CA');
};
