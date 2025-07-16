"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axiosInstance from "@/lib/axiosInstance";

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const img = e.target.files[0];
      setFile(img);
      setPreview(URL.createObjectURL(img));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axiosInstance.post("/api/upload/single", formData);
    console.log("CDN URL →", data.url); // চাইলে DB‑তে সেইভ করো
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {preview && <img src={preview} className="w-32 h-32 rounded-full" />}
      <input type="file" accept="image/*" onChange={handleChange} />
      <button className="btn btn-primary" disabled={!file}>
        Upload
      </button>
    </form>
  );
}
