import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuImages, LuX } from "react-icons/lu";
import axios from "../api/axios";
import { useAppcontext } from "../contaxt/Appcontext";

const ProfileBar = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState(false);
  const [preview, setPreview] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [formdata, setFormData] = useState({
    description: "",
  });

  const { user, token } = useAppcontext();
  const User = typeof user === "string" ? JSON.parse(user) : user;

  const fileInputRef = useRef(null);

  const profile_image =
    localStorage.getItem("profile_image") || "/default-profile.png";

  // Open file picker
  const handleImage = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/"),
    );

    if (imageFiles.length === 0) {
      setError("Please select valid image files");
      return;
    }

    if (imageFiles.length > 4) {
      setError("You can only upload up to 4 images");
      return;
    }

    setFiles(imageFiles);
    setError("");

    const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
    setPreview(imageUrls);
    setActive(true);
  };

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      preview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [preview]);

  // Handle textarea input
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  // Remove image from preview
  const removeImage = (index) => {
    const newPreview = preview.filter((_, i) => i !== index);
    const newFiles = files.filter((_, i) => i !== index);
    setPreview(newPreview);
    setFiles(newFiles);

    // Revoke the removed URL
    URL.revokeObjectURL(preview[index]);
  };

  // Upload post
  const postHandller = async () => {
    if (!formdata.description.trim() && files.length === 0) {
      setError("Please add a description or select images");
      return;
    }

    try {
      setUploading(true);
      const form = new FormData();

      files.forEach((file) => {
        form.append("post_image", file);
      });

      form.append("description", formdata.description);

      const response = await axios.post("/api/post/upload", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success:", response.data);

      // Reset after upload
      setFiles([]);
      setPreview([]);
      setFormData({ description: "" });
      setActive(false);
      setError("");

      // Optionally refresh the page or update state to show new post
      window.location.reload();
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.response?.data?.message || "Failed to upload post");
    } finally {
      setUploading(false);
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && active) {
        setActive(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [active]);

  return (
    <>
      <div className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={profile_image}
              alt="profile"
              onClick={handleProfile}
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 cursor-pointer object-cover hover:ring-2 hover:ring-blue-400 transition-all"
            />

            <div className="flex-1">
              <input
                type="text"
                onClick={() => setActive(true)}
                readOnly
                className="w-full text-gray-700 p-2 sm:p-3 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors placeholder-gray-500"
                placeholder={`What's on your mind, ${User?.name || ""}?`}
              />
            </div>

            <button
              onClick={handleImage}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Add photos"
            >
              <LuImages className="text-2xl sm:text-3xl text-gray-600" />
            </button>

            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <img
                  src={profile_image}
                  className="rounded-full w-10 h-10 object-cover"
                  alt="profile"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {User?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">Create post</p>
                </div>
              </div>

              <button
                onClick={() => setActive(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <LuX className="text-xl" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <textarea
                rows={4}
                name="description"
                value={formdata.description}
                onChange={handlechange}
                placeholder="What's on your mind?"
                className="w-full p-3 border-none outline-none resize-none text-lg placeholder-gray-400"
                autoFocus
              />

              {/* Error message */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              {/* Preview images */}
              {preview.length > 0 && (
                <div
                  className={`mt-4 grid gap-2 ${
                    preview.length === 1
                      ? "grid-cols-1"
                      : preview.length === 2
                        ? "grid-cols-2"
                        : "grid-cols-2"
                  }`}
                >
                  {preview.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-48 sm:h-64 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <LuX className="text-lg" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={handleImage}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LuImages className="text-xl" />
                  <span className="text-sm font-medium">Add Photos</span>
                </button>

                {files.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {files.length} {files.length === 1 ? "photo" : "photos"}{" "}
                    selected
                  </span>
                )}
              </div>

              <button
                onClick={postHandller}
                disabled={uploading}
                className={`w-full py-2.5 rounded-lg font-semibold transition-all ${
                  uploading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {uploading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileBar;
