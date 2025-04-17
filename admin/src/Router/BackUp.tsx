import Wrapper from "../components/Wrapper";

const BackUp = () => {
  const handleDownload = async (type?: "recruiter" | "seeker") => {
    try {
      const response = await fetch(`http://localhost:5000/backup?type=${type}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.blob();
      const blob = new Blob([data], { type: "application/json" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${type ? type : "backup"}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading backup:", error);
    }
  };

  return (
    <Wrapper value="backup">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl text-gray-600 font-medium">Back Up</h1>
          <div className="flex gap-2 text-gray-600 font-semibold">
            <p className="text-blue-500 font-semibold">Home</p>
            <p>/</p>
            <p className="text-black font-semibold">Backup</p>
          </div>
        </div>
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => handleDownload("recruiter")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ml-2"
          >
            RECRUITER
          </button>
          <button
            onClick={() => handleDownload("seeker")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ml-2"
          >
            SEEKER
          </button>
          <button
            onClick={() => handleDownload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ml-2"
          >
            SYSTEM
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default BackUp;
