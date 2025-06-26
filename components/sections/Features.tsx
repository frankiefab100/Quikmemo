import { FEATURES } from "@/constants/data";
import React from "react";

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-14">
          <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Powerful Features
          </span>
          <h2 className="lg:text-4xl md:text-3xl text-2xl font-semibold tracking-tight text-gray-900 mb-4">
            Everything You Need to Take Better Notes
          </h2>
          <p className="text-base lg:text-lg font-normal text-gray-600 leading-7 lg:leading-8">
            Quikmemo is packed with features to help you capture, organize, and
            share your ideas.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-start hover:shadow-md transition"
            >
              <feature.icon className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 md:text-base text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
