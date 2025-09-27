import { Post } from "@/app/types/posts";

export default function Posts({ title, dateTime, content }: Post) {
  return (
    <div className="w-full px-10  py-5 rounded-3xl bg-lightGray">
      <div className="flex  text-gray-400">
        <span className="w-[30%]">Titme</span>
        <span className="w-[30%]">DateTime</span>
        <span className="w-[30%]">Content</span>
      </div>
      <div className="border border-gray-300" />
      <div className="flex">
        <span className="w-[30%]">{title}</span>
        <span className="w-[30%]">{dateTime}</span>
        <span className="w-[30%]">{content}</span>
      </div>
    </div>
  );
}
