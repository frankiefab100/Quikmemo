import { TESTIMONIALS } from "@/constants/data";
import Image from "next/image";

const Testimonials: React.FC = () => {
  return (
    <div className="py-14 max-w-screen-xl mx-auto sm:px-6 md:px-8 lg:px-12">
      <div className="sm:text-center md:mx-auto">
        <div className="text-center space-y-2 mb-12">
          <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold tracking-tight text-gray-900">
            See What Our Community is Saying
          </h3>
          <p className="text-base lg:text-lg font-normal text-gray-600 leading-7 lg:leading-8">
            Don&apos;t just take our word for it
          </p>
        </div>
      </div>
      <div className="mt-12">
        <ul className="p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item, idx) => (
            <li key={idx} className="bg-gray-50 p-4 rounded-xl">
              <Image
                src="/icons/quotation-right-mark.svg"
                className="mb-4"
                width={25}
                height={25}
                alt="quotation mark"
              />
              <figure>
                <blockquote>
                  <p className="text-gray-700">{item.quote}</p>
                </blockquote>
                <div className="mt-6 flex items-center gap-x-3">
                  <Image
                    src={item.avatar}
                    className="w-8 h-8 rounded-full"
                    width={10}
                    height={10}
                    alt="customer avatars"
                  />
                  <div>
                    <span className="block text-gray-800 text-sm font-semibold">
                      {item.name}
                    </span>
                    <span className="block text-gray-600 text-xs mt-0.5">
                      {item.title}
                    </span>
                  </div>
                </div>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Testimonials;
