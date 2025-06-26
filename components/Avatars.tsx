import Image from "next/image";
import User1 from "@/assets/images/user1.jpg";
import User4 from "@/assets/images/User4.jpg";

const avatarData = [
  {
    id: 1,
    imgUrl: User1,
  },
  {
    id: 2,
    imgUrl: "https://mighty.tools/mockmind-api/content/human/128.jpg",
  },
  {
    id: 3,
    imgUrl: "https://mighty.tools/mockmind-api/content/human/102.jpg",
  },
  {
    id: 4,
    imgUrl: User4,
  },
];

const Avatars: React.FC = () => (
  <div className="flex items-center justify-center -space-x-2">
    {avatarData.map((img) => {
      return (
        <div
          key={img.id}
          className="flex items-center justify-center overflow-hidden rounded-full"
        >
          <Image
            src={img.imgUrl}
            className="w-6 h-6 rounded-full border-1 border-white"
            alt="avatar"
            width={10}
            height={10}
          />
        </div>
      );
    })}
  </div>
);

export default Avatars;
