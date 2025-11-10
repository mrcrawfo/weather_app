export const ApplicationFooter = () => {
    return (
        <footer className="bg-white border-t py-4">
        <div className="max-w-7xl mx-auto px-4 lg:px-32 text-sm text-gray-500 text-center min-w-full">
          © {new Date().getFullYear()}{' '}
          <a
            href="https://www.linkedin.com/in/max-crawford-00459b324/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:underline"
          >
            Max Crawford
          </a>{' '}
          on behalf of{' '}
          <a
            href="https://www.infotrack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:underline"
          >
            InfoTrack US
          </a>
        </div>
      </footer>
    );
};

export default ApplicationFooter;
