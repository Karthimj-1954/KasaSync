'use client';

import React from 'react';

export default function FeatureCard({ icon: Icon, title, description, className = '' }) {
  return (
    <div
      className={`group bg-white p-6 rounded-[16px] border border-[#EAF3FA] hover:border-[#D6E4F2] shadow-sm hover:shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-all duration-200 ease-in-out flex flex-col items-start text-left ${className}`}
    >
      {/* Icon Container: 52px x 52px, 12px border-radius, soft tint bg, subtle border & shadow */}
      <div className="w-[52px] h-[52px] rounded-[12px] bg-[#EAF3FA] border border-[#D6E4F2] shadow-[0_2px_8px_rgba(15,23,42,0.05)] flex items-center justify-center mb-[20px] transition-all duration-200 ease-in-out group-hover:scale-[1.05] group-hover:bg-[#E2EDF7] group-hover:border-[#C7D7EA]">
        {Icon && (
          <Icon
            className="w-[22px] h-[22px] text-[#2B5F9E] group-hover:text-[#183153] transition-colors duration-200 ease-in-out"
            strokeWidth={1.75}
          />
        )}
      </div>

      {/* Title */}
      <h3 className="text-base md:text-lg font-semibold text-[#183153] font-poppins mb-[12px] leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs md:text-sm text-[#60758C] leading-relaxed font-normal">
        {description}
      </p>
    </div>
  );
}
