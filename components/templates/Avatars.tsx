import Image from "next/image";

const avatarData = [
  {
    id: 1,
    imgUrl: "https://randomuser.me/api/portraits/men/43.jpg",
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
    imgUrl: "https://randomuser.me/api/portraits/women/79.jpg",
  },
];
export const Avatars = () => (
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

    {/* <span className="text-sm pl-3">Loved by 50+ users</span> */}
  </div>
);
