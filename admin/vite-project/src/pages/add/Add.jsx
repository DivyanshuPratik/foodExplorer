import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const Add = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        desc: "",
        price: "",
        category: "Salad",
    });
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", data.name);
            formData.append("desc", data.desc);
            formData.append("price", Number(data.price));
            formData.append("category", data.category);
            const response = await axios.post(
                "http://localhost:3000/api/food/add",
                formData
            );
            if (response.data.success) {
                setData({
                    name: "",
                    desc: "",
                    price: "",
                    category: "Salad",
                });
                setImage(false);
                toast.success("Dish Successfully Added", {
                    position: "top-right",
                });
            } else {
                toast.error(res.data.message, {
                    position: "top-right",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpload = (e) => {
        setImage(e.target.files[0]);
    };
    return (
        <div className="add">
            <form className="flex-col" onSubmit={handleSubmit}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt=""
                        />
                    </label>
                    <input
                        onChange={handleUpload}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Dish Name</p>
                    <input
                        value={data.name}
                        onChange={(e) =>
                            setData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        type="text"
                        name="name"
                        placeholder="Enter Dish Name"
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Dish Description</p>
                    <textarea
                        value={data.desc}
                        onChange={(e) =>
                            setData((prev) => ({ ...prev, desc: e.target.value }))
                        }
                        name="desc"
                        rows="6"
                        placeholder="Enter Dish Description"
                    ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Dish Category</p>
                        <select
                            value={data.category}
                            name="category"
                            onChange={(e) =>
                                setData((prev) => ({ ...prev, category: e.target.value }))
                            }
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Dish Price</p>
                        <input
                            value={data.price}
                            type="Number"
                            name="price"
                            placeholder="$20"
                            onChange={(e) =>
                                setData((prev) => ({ ...prev, price: e.target.value }))
                            }
                        />
                    </div>
                </div>
                <button type="submit" className="add-btn">
                    ADD
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Add;
