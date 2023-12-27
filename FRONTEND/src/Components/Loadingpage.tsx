import React from 'react';

const LoadingPage = () => {
  return (
    <div className='flex justify-center h-[60vh]'>
      <div className="relative">
        <section className="bg-white relative place-items-center grid h-screen w-screen gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
              margin: 'auto',
              background: 'rgb(241, 242, 243)',
              display: 'block',
              shapeRendering: 'auto',
            }}
            width="117px"
            height="117px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <rect x="16.5" y="30" width="17" height="40" fill="#870e4d">
              <animate attributeName="y" repeatCount="indefinite" dur="1.0204081632653061s" calcMode="spline" keyTimes="0;0.5;1" values="18;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.20408163265306123s"></animate>
              <animate attributeName="height" repeatCount="indefinite" dur="1.0204081632653061s" calcMode="spline" keyTimes="0;0.5;1" values="64;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.20408163265306123s"></animate>
            </rect>
            <rect x="41.5" y="30" width="17" height="40" fill="#b1bac2">
              <animate attributeName="y" repeatCount="indefinite" dur="1.0204081632653061s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.10204081632653061s"></animate>
              <animate attributeName="height" repeatCount="indefinite" dur="1.0204081632653061s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.10204081632653061s"></animate>
            </rect>
            <rect x="66.5" y="30" width="17" height="40" fill="#390b79">
              <animate attributeName="y" repeatCount="indefinite" dur="1.0204081632653061s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
              <animate attributeName="height" repeatCount="indefinite" dur="1.0204081632653061s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>
            </rect>
          </svg>
        </section>
      </div>
    </div>
  );
};

export default LoadingPage;
