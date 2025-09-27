"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import down from "../../public/images/down.png";
import up from "../../public/images/up.png";
import { Company } from "@/app/types/companies";
import { Post } from "@/app/types/posts";
import { createOrUpdatePost, fetchCompanies, fetchPosts } from "@/app/lib/api";
import Posts from "@/app/company/components/Posts";

export default function PostClient() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [post, setPost] = useState<Post[]>([]);
  const [show, setShow] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");

  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newPost = await createOrUpdatePost({
        title,
        dateTime,
        content,
        resourceUid: selectedCompanyId,
      });

      setPost((prev) => [...prev, newPost]);

      setTitle("");
      setDateTime("");
      setContent("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCompanies().then((data) => {
      setCompanies(data);
      if (data.length > 0) {
        // 초기 선택
        setSelectedCompanyId(data[0].id);
      }
    });
  }, []);

  useEffect(() => {
    fetchPosts().then((data) => setPost(data));
  }, []);

  if (!companies.length) return <div className="w-full h-full">Loading...</div>;

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId)!;
  const selectPost = post.filter(
    (item) => item.resourceUid === selectedCompanyId
  );
  return (
    <div className="flex flex-col gap-5 p-5 w-full">
      <div className="w-full h-20 bg-white rounded-2xl flex justify-center items-center text-2xl font-bold text-blue">
        Company
      </div>
      <div className="w-full flex items-end flex-col relative">
        <div
          onClick={() => setShow((prev) => !prev)}
          className="h-10 py-5 w-[200px] pl-10 pr-5 bg-white flex items-center justify-between rounded-xl"
        >
          <span>{selectedCompany.country}</span>
          <Image src={show ? up : down} width={25} height={25} alt="down" />
        </div>
        <div
          className={`${
            show ? "flex" : "hidden"
          } flex-col gap-5 bg-white rounded-xl mt-[10px] w-[200px] p-5 absolute top-10`}
        >
          {companies.map(({ country, id }) => (
            <span
              key={id}
              className="text-center hover:bg-lightGray hover:cursor-pointer hover:rounded-xl p-2"
              onClick={() => {
                setSelectedCompanyId(id);
                setShow(false);
              }}
            >
              {country}
            </span>
          ))}
        </div>
      </div>
      <div className="w-[full] p-5 bg-white rounded-3xl flex flex-col gap-5">
        <span className="text-xl">Post</span>
        <div className="w-full p-5  rounded-3xl  bg-lightGray flex flex-col ">
          <form
            onSubmit={(e: FormEvent) => handleSubmit(e)}
            className="flex gap-5 items-center w-full "
          >
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              value={title}
              type="text"
              className="px-5 py-2 w-[30%] rounded-xl"
              placeholder="Title"
            />
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDateTime(e.target.value)
              }
              value={dateTime}
              type="text"
              className="px-5 py-2 w-[30%] rounded-xl"
              placeholder="DateTime"
            />
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setContent(e.target.value)
              }
              value={content}
              type="text"
              className="px-5 py-2 w-[30%] rounded-xl"
              placeholder="content"
            />
            <button className="bg-gray-400 p-2 rounded-xl">Submit</button>
          </form>
        </div>
        {selectPost.length > 0 ? (
          selectPost.map(
            ({ title, dateTime, content, id, resourceUid }, idx) => (
              <Posts
                key={idx}
                id={id}
                resourceUid={resourceUid}
                title={title}
                dateTime={dateTime}
                content={content}
              />
            )
          )
        ) : (
          <div className="w-full  px-10  py-5 rounded-3xl bg-lightGray">
            No Post
          </div>
        )}
      </div>
    </div>
  );
}
