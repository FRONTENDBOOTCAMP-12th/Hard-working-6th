function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      {/* <Title>404 Not Found 페이지 못찾음</Title> */}
      <h1 className="text-4xl font-bold">404 Not Found</h1>
      <p role="alert" className="text-xl text-gray-500">
        페이지가 존재하지 않습니다!
      </p>
    </section>
  );
}

export default NotFound;
