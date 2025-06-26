import { CONTENT_FEATURES } from "@/constants/data";
import React from "react";

const ContentSection: React.FC = () => {
  return (
    <section>
      <div className="bg-gray-100/50 py-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
              Smart Editor
            </span>
            <h2 className="lg:text-4xl md:text-3xl text-2xl font-semibold tracking-tight text-gray-900">
              Edit, Organize, and Create with Ease
            </h2>
            <p className="text-base lg:text-lg font-normal text-gray-600 leading-7 lg:leading-8 mb-4 mt-4 max-w-prose mx-auto">
              Quikmemo&apos;s editor lets you do more than just write.
              Effortlessly format, embed, and organize your notes with powerful
              tools built for productivity.
            </p>
          </div>

          <div className="border-gray-200 space-y-10 sm:space-y-0 sm:divide-y sm:divide-gray-200">
            {CONTENT_FEATURES.map((feature, index) => {
              const IconComponent = feature.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={feature.title}
                  className="grid sm:grid-cols-5 sm:divide-x sm:divide-gray-200 items-center pt-10"
                >
                  {isEven ? (
                    <>
                      <div className="sm:col-span-2 flex justify-center items-center py-8">
                        <IconComponent className="w-16 h-16 text-blue-600" />
                      </div>
                      <div className="mt-6 sm:col-span-3 sm:mt-0 sm:border-l sm:border-gray-200 sm:pl-12">
                        <h3 className="text-gray-900 text-xl font-semibold">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 my-4 md:text-base text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="sm:col-span-3 sm:border-r sm:border-gray-200 sm:pr-12">
                        <h3 className="text-gray-900 text-xl font-semibold">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 my-4 md:text-base text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      <div className="row-start-1 py-8 flex justify-center items-center sm:col-span-2 sm:row-start-auto">
                        <IconComponent className="w-16 h-16 text-blue-600" />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
