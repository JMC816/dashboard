import { title } from "../constants/title";
import { NavItems } from "./NavItems";

export const NavigationDrawer = () => {
  return (
    <div className="w-full h-full bg-white rounded-2xl pt-5 min-w-[120px]">
      <div className="p-5 flex flex-col gap-5">
        {title.map(({ text, link, img }, idx) => (
          <NavItems key={idx} text={text} link={link} img={img} />
        ))}
      </div>
    </div>
  );
};
