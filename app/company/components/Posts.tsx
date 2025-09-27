import { Post } from "@/app/types/posts";

export default function Posts({ title, dateTime, content }: Post) {
  return (
    <div className="w-full rounded-3xl bg-lightGray">
      <div className="flex">
        <span className="w-[30%]">{title}</span>
        <span className="w-[30%]">{dateTime}</span>
        <span className="w-[30%]">{content}</span>
      </div>
    </div>
  );
}
