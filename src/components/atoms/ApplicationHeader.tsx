export const ApplicationHeader = () => {
    return (
        <header className="sticky top-0 z-10 bg-white shadow-sm min-w-screen">
            <img src="/weather_app_icon.png" alt="Weather App Icon" className="h-16 xl:h-24 left-0 absolute" />
            <div className="max-w-7xl mx-auto px-4 lg:px-32 py-4 flex items-center justify-center">
                <div className="flex items-center space-x-4">
                    <h1 className="font-semibold">Weather App</h1>
                </div>
            </div>
        </header>
    );
};

export default ApplicationHeader;
