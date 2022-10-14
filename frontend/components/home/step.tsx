export const Step = () => {
  return (
    <div className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
      <div className="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl">
        <div>
          <p className="bg-teal-accent-400 mb-4 inline-block rounded-full px-3 py-px text-xs font-semibold tracking-wider text-teal-900">
            dNFT
          </p>
        </div>
        <h2 className="mb-6 max-w-none  font-sans text-2xl font-bold leading-none  text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="text-blue-gray-100 absolute top-0 left-0 z-0 -mt-8 -ml-20 hidden w-32 sm:block lg:-ml-28 lg:-mt-10 lg:w-32"
            >
              <defs>
                <pattern
                  id="f51618fb-0edb-4bcb-b35a-ffc770941286"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#f51618fb-0edb-4bcb-b35a-ffc770941286)"
                width="52"
                height="24"
              />
            </svg>
          </span>{" "}
          Get NEAR-USD price, dynamic change token metadata(title, media)
          depends on time or preset conditions
        </h2>
        <p className="text-base text-black md:text-lg">

        </p>
      </div>
      <div className="row-gap-0 grid gap-8 lg:grid-cols-3">
        <div className="relative text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 sm:h-20 sm:w-20">
            <svg
              className="text-deep-purple-accent-400 h-12 w-12 sm:h-16 sm:w-16"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="mb-2 text-2xl font-extrabold">Step 1</h6>
          {/* <p className="mb-3 max-w-md text-lg text-gray-900 sm:mx-auto">
            Mint
          </p> */}
          <a
            href="/mint"
            aria-label=""
            className="text-deep-purple-accent-400 text-6xl hover:text-deep-purple-800 inline-flex items-center font-semibold transition-colors duration-200"
          >
            Mint (egg)
          </a>
          <div className="top-0 right-0 flex h-24 items-center justify-center lg:absolute lg:-mr-8">
            <svg
              className="w-8 rotate-90 transform text-gray-700 lg:rotate-0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line
                fill="none"
                strokeMiterlimit="10"
                x1="2"
                y1="12"
                x2="22"
                y2="12"
              />
              <polyline
                fill="none"
                strokeMiterlimit="10"
                points="15,5 22,12 15,19 "
              />
            </svg>
          </div>
        </div>
        <div className="relative text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 sm:h-20 sm:w-20">
            <svg
              className="text-deep-purple-accent-400 h-12 w-12 sm:h-16 sm:w-16"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="mb-2 text-2xl font-extrabold">Step 2</h6>
          {/* <p className="mb-3 max-w-md text-sm text-gray-900 sm:mx-auto">
update 
          </p> */}
          <a
            href="/nft"
            aria-label=""
            className="text-deep-purple-accent-400 text-6xl hover:text-deep-purple-800 inline-flex items-center font-semibold transition-colors duration-200"
          >
            update (chick)
          </a>
          <div className="top-0 right-0 flex h-24 items-center justify-center lg:absolute lg:-mr-8">
            <svg
              className="w-8 rotate-90 transform text-gray-700 lg:rotate-0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line
                fill="none"
                strokeMiterlimit="10"
                x1="2"
                y1="12"
                x2="22"
                y2="12"
              />
              <polyline
                fill="none"
                strokeMiterlimit="10"
                points="15,5 22,12 15,19 "
              />
            </svg>
          </div>
        </div>
        <div className="relative text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 sm:h-20 sm:w-20">
            <svg
              className="text-deep-purple-accent-400 h-12 w-12 sm:h-16 sm:w-16"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="mb-2 text-2xl font-extrabold">Step 3</h6>
          {/* <p className="mb-3 max-w-md text-sm text-gray-900 sm:mx-auto">
stake
          </p> */}
          <a
            href="/nft"
            aria-label=""
            className="text-deep-purple-accent-400 text-6xl hover:text-deep-purple-800 inline-flex items-center font-semibold transition-colors duration-200"
          >
            stake (rooster)
          </a>
        </div>
      </div>
    </div>
  );
};
