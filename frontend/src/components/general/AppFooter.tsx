const AppFooter = () => {
  return (
    <>
      <div className="h-[2px] w-screen bg-gradient-to-r from-black via-blue-700 shadow-md" />
      <footer className="w-full bg-gradient-to-r from-slate-100 via-blue-100 to-slate-200">
        <div className="max-w-[1200px] w-full mx-auto px-4 py-4 text-sm text-gray-700 flex justify-center items-center text-center">
          <p>
            © {new Date().getFullYear()} Keenan's Weather App. Built with React, AWS Lambda, and WeatherAPI.
          </p>
        </div>
      </footer>
    </>
  );
};

export default AppFooter;
