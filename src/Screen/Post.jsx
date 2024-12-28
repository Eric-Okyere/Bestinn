import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlinePlusCircle, AiOutlineVideoCamera } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import baseURL from "../assets/baseURL";


const Post = ({ item }) => {
  const [picture, setPicture] = useState(null);
  const [picturesec, setPicturesec] = useState(null);
//   const [video, setVideo] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [dimension, setDimension] = useState("");
  const [description, setDescription] = useState("");
  const [camera, setCamera] = useState("");
  const [ram, setRam] = useState("");
  const [memory, setMemory] = useState("");
  const [battery, setBattery] = useState("");
  const [category, setCategory] = useState("");
  const [sim, setSim] = useState("");
  const [resolution, setResolution] = useState("");
  const [discount, setDiscount] = useState("");
  const [sensor, setSensor] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
//   const login = useSelector((state) => state);
  const navigate = useNavigate();


  useEffect(() => {
    if (item) {
      setName(item.name);
      setVideo(item.video);
      setDimension(item.dimension);
      setPrice(item.price);
      setDescription(item.description);
      setRegion(item.region);
      setMemory(item.memory);
      setPicture(item.picture);
      setPicturesec(item.picturesec);
      setCamera(item.camera);
      setBattery(item.battery);
      setSim(item.sim);
      setResolution(item.resolution);
      setDiscount(item.discount);
      setSensor(item.sensor);
    }

    fetch(`${baseURL}categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [item]);

  const handleImageChange = (setImage) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const fetchFile = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = url.split("/").pop();
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error("Error fetching file:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!category) {
      alert("Please category is required.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("dimension", dimension);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("camera", camera);
      formData.append("ram", ram);
      formData.append("memory", memory);
      formData.append("battery", battery);
      formData.append("sim", sim);
      formData.append("resolution", resolution);
      formData.append("discount", discount);
      formData.append("sensor", sensor);
      formData.append("category", category);
    //   formData.append("userId", login.user);
  
      if (picture) formData.append("picture", await fetchFile(picture));
      if (picturesec) formData.append("picturesec", await fetchFile(picturesec));
    //   if (video) formData.append("video", await fetchFile(video));
  
      const response = await fetch(`${baseURL}mainpost`, {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Product submitted successfully!");
        console.log("Submitted product:", result);
        navigate("/");
      } else {
        const errorData = await response.json().catch(() => ({ error: "Unknown server error" }));
        alert(`Error: ${errorData.error || "Something went wrong!"}`);
      }
    } catch (error) {
      alert(`Error: ${error.message || "Something went wrong!"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      
      
     
     
    

    <div className="flex flex-col items-center sm:mx-8 md:mx-8 pt-10">
    <h1 className="text-xl font-bold  ">Make a post here</h1>
     
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-1 md:grid-cols-2 pt-6">
    <div className="relative">
      <img
        src={picture}
        alt=""
        className="w-full max-w-md max-h-60 object-cover rounded-lg border-2 border-gray-300"
      />
      <label htmlFor="primaryImage" className="absolute bottom-0 right-0 cursor-pointer">
        <AiOutlinePlusCircle size={24} className="text-black" />
      </label>
      <input
        type="file"
        id="primaryImage"
        className="hidden"
        onChange={handleImageChange(setPicture)}
      />
    </div>

    <div className="relative">
      <img
        src={picturesec}
        alt=""
        className="w-full max-w-md max-h-60 object-cover rounded-lg border-2 border-gray-300"
      />
      <label htmlFor="secondaryImage" className="absolute bottom-0 right-0 cursor-pointer">
        <AiOutlinePlusCircle size={24} className="text-black" />
      </label>
      <input
        type="file"
        id="secondaryImage"
        className="hidden"
        onChange={handleImageChange(setPicturesec)}
      />
    </div>
  </div>

      <div className="w-80 md:w-1/2 mt-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Add a discount"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          value={dimension}
          onChange={(e) => setDimension(e.target.value)}
          placeholder="Enter dimension "
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
          className="w-full mb-4 p-2 border rounded"
        ></textarea>
        <input
          type="text"
          value={camera}
          onChange={(e) => setCamera(e.target.value)}
          placeholder="Camera quality"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          placeholder="Enter resolution"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          value={memory}
          onChange={(e) => setMemory(e.target.value)}
          placeholder="Memory"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          value={battery}
          onChange={(e) => setBattery(e.target.value)}
          placeholder="Battery capacity"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          value={ram}
          onChange={(e) => setRam(e.target.value)}
          placeholder="Enter RAM"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          value={sensor}
          onChange={(e) => setSensor(e.target.value)}
          placeholder="Enter the sensor"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          value={sim}
          onChange={(e) => setSim(e.target.value)}
          placeholder="Enter sin slot"
          className="w-full mb-4 p-2 border rounded"
        />
     
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full p-2 text-white bg-black rounded mb-10 ${
            isLoading ? "opacity-50" : ""
          }`}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
    </>
  );
};

export default Post;
